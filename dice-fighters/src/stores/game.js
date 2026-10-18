import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {ZONES} from "@/data/zones.js";
import {MAX_LOG, BASE, BOSS_EVERY} from "@/data/constants.js";

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
            for(let item of Object.values(state.equipped)) {
                if(!item) {
                    // Item doesn't exist
                    continue;
                }

                for (let [stat, value] of Object.entries(item.stats)) {
                    out[stat] = (out[stat] || 0) + value;
                }
            }

            return out;
        },
        expToNext() {
            return (20 * 1.35 ** this.level - 1);
        },
        maxHp () {
            return Math.floor((BASE.maxHp * (this.level * 1.5)) + BASE.maxHp);
        }
    },

    actions: {
        sellItem(itemId) {
            let i = this.inventory.findIndex(it => it.uid === itemId)

            if (i < 0) return

            this.gold += 2
            this.inventory.splice(i, 1)
        },

        addItem(item) {
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
                this.enemy = zone.boss;
                this.kills = 0;

                this.writeLog(`${this.enemy.name} appeared!`, 'spawn boss')
            } else {
                this.enemy = zone.enemies[this.randint(0, zone.enemies.length - 1)]

                this.writeLog(`${this.enemy.name} appeared!`, 'spawn')
            }

            this.enemy.maxHp = this.enemy.hp;
        },
        randint(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        playerAttack() {
            let base = this.stats.atk;

            if(this.randint(0, 100) < this.stats.crit) {
                this.writeLog(`CRITICAL HIT!!!`, "crit");
                base *= 1.5;
            }

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

            this.hp -= base;

            if(this.hp <= 0) {
                this.writeLog(`${this.enemy.name} hit for ${base}!`, "enemyHit fatal")
                this.onPlayerDeath();
            } else {
                this.writeLog(`${this.enemy.name} hit for ${base}!`, "enemyHit")
            }
        },
        writeLog(text, type = "basic") {
            if(this.log.length === MAX_LOG) {
                this.log.slice(0, 1);
            }

            this.log.push({text: text, type: type})
        },
        onEnemyDeath() {
            this.writeLog(`${this.enemy.name} defeated!`, "basic")

            this.exp += this.enemy.exp;
            this.gold += this.enemy.gold;

            if(this.expToNext <= this.exp) {
                this.doLevelUp();
            }

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

            this.level += 1;
        }
    },
})