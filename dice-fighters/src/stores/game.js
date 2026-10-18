import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {ZONES} from "@/data/zones.js";
import {MAX_LOG, BASE, BOSS_EVERY, MAX_INVENTORY} from "@/data/constants.js";
import {ITEMS} from "@/data/items.js";

let playerTimer = 0;
let enemyTimer = 0;

export const useGame = defineStore('game', {
    state: () => ({
        level: 1,
        exp: 0,
        hp: 50,
        gold: 0,
        inventory: [],
        nextUid: 0,
        equipped: {weapon: null, armor: null, ring: null},
        kills: 0,
        zone: 'forest',
        enemy: null,
        log: [],
        isPaused: false,
        logId: 0,
    }),

    getters: {
        /**
         * Takes an object with a value level and returns the players current stats with that level and current equipment
         * @param state Player's current state
         */
        stats(state) {
            // Make sure all stats are present
            let out = {... BASE}

            // Set Base Attack
            out.atk += (state.level - 1) * 1.5

            // Apply Equipment Stats
            for(let slot of Object.values(state.equipped)) {
                if(!slot) {
                    // Item doesn't exist
                    continue;
                }

                for (let [stat, value] of Object.entries(slot.stats)) {
                    out[stat] = (out[stat] || 0) + value;
                }
            }

            return out;
        },
        expToNext() {
            return Math.floor(20 * 1.35 ** (this.level - 1));
        },
        maxHp () {
            return Math.max(BASE.maxHp, this.stats.maxHp + (this.level - 1) * 8)
        }
    },

    actions: {
        getSellMult(rarity){
            switch(rarity) {
                case "common":
                    return 1;
                case "uncommon":
                    return 5;
                case "rare":
                    return 10;
                case "epic":
                    return 20;
                default:
                    return 1;
            }
        },
        sellItem(itemId) {
            let i = this.inventory.findIndex(it => it.uid === itemId)

            if (i < 0) return

            this.gold += this.inventory[i].item.sell * this.getSellMult(this.inventory[i].item.rarity);
            this.inventory.splice(i, 1)
        },
        equipItem(itemId) {
            let i = this.inventory.findIndex(it => it.uid === itemId)

            if (i < 0) return

            let slot = this.inventory[i]
            let newGear = slot.item;
            let oldGear = null;

            if(this.equipped[newGear.slot] !== null) {
                oldGear = this.equipped[newGear.slot]
            }

            this.equipped[newGear.slot] = newGear;

            this.inventory.splice(i, 1)

            if(oldGear) {
                this.addItem(oldGear)
            }
        },

        addItem(item) {
            if(this.inventory.length >= MAX_INVENTORY) {
                this.writeLog("Inventory Full!", "common")
                return;
            }
            this.inventory.push({item: item, uid: this.nextUid})

            this.nextUid++;
        },
        tick(dt) {

            if(!this.enemy) {
                this.spawnEnemy();
            }

            if(this.isPaused) {
                return;
            }

            playerTimer += dt * this.stats.speed;
            enemyTimer += dt * this.enemy.speed;

            while (playerTimer >= 1) {
                playerTimer -= 1;
                this.playerAttack();
            }

            while (enemyTimer >= 1) {
                enemyTimer -= 1;
                this.enemyAttack();
            }
        },
        spawnEnemy() {
            playerTimer = 0;
            enemyTimer = 0;

            let zone = ZONES[this.zone];

            if(this.kills !== 0 && this.kills % BOSS_EVERY === 0) {
                this.enemy = { ... zone.boss, maxHp: zone.boss.hp};
                this.kills = 0;

                this.writeLog(`${this.enemy.name} appeared!`, 'spawn boss')
            } else {
                let guy = zone.enemies[this.randint(0, zone.enemies.length - 1)]

                this.enemy = { ... guy, maxHp: guy.hp};

                this.writeLog(`${this.enemy.name} appeared!`, 'spawn')
            }
        },
        randint(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        playerAttack() {
            let base = this.stats.atk;

            if(this.randint(0, 100) < this.stats.crit * 100) {
                this.writeLog(`CRITICAL HIT!!!`, "crit");
                base *= 1.5;
            }

            base -= this.enemy.def;

            base = Math.max(1, Math.round(base))

            this.enemy.hp -= base;



            if(this.enemy.hp <= 0) {
                this.writeLog(`You hit for ${base}!`, "playerHit fatal")
                this.onEnemyDeath();
            } else {
                this.writeLog(`You hit for ${base}!`, "playerHit")
            }
        },
        enemyAttack() {
            let base = this.enemy.atk;

            base -= this.stats.def;

            base = Math.max(1, Math.round(base))

            this.hp -= base;

            if(this.hp <= 0) {
                this.writeLog(`${this.enemy.name} hit for ${base}!`, "enemyHit fatal")
                this.onPlayerDeath();
            } else {
                this.writeLog(`${this.enemy.name} hit for ${base}!`, "enemyHit")
            }
        },
        writeLog(text, type = "basic") {
            if(this.log.length >= MAX_LOG) {
                this.log.shift();
            }

            this.log.push({text: text, type: type, id: this.logId})

            this.logId += 1;
        },
        onEnemyDeath() {
            this.writeLog(`${this.enemy.name} defeated!`, "basic")
            this.writeLog(`You got: ${this.enemy.exp} exp and ${this.enemy.gold} gold!`, "basic")

            this.exp += this.enemy.exp;
            this.gold += this.enemy.gold;

            while(this.expToNext <= this.exp) {
                this.doLevelUp();
            }

            this.rollLoot();

            this.kills += 1;

            this.spawnEnemy();
        },
        onPlayerDeath() {
            this.writeLog(`You died, womp womp.`, "playerDeath")
            this.writeLog(`You lost ${Math.floor(this.gold / 2)} gold, and your kills were reset.`, "basic")

            this.gold = Math.floor(this.gold / 2);
            this.kills = 0;
            this.hp = this.maxHp;

            this.spawnEnemy();
        },
        doLevelUp() {
            this.writeLog(`DING! Level Up! Lvl. ${this.level} -> Lvl. ${this.level + 1}`, "levelUp")

            this.exp -= this.expToNext;

            this.level += 1;
        },
        rollLoot() {
            let loot = ZONES[this.zone].drops.sort((a, b) => { return a[1] - b[1] });
            let total = 0;

            for(let [, rarity] of loot) {
                total += rarity;
            }

            let lootRoll = Math.random() * total

            for(let [name, weight] of loot) {
                lootRoll -= weight;

                if(lootRoll < 0) {
                    let item = ITEMS[name];
                    this.writeLog(`${this.enemy.name} dropped ${item.name}!`, "drop " + item.rarity)
                    this.addItem(item);

                    return;
                }
            }
        }
    },
})