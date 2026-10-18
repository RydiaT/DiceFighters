import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { BASE } from "@/data/zones.js";

export const useGame = defineStore('game', {
    state: () => ({
        level: 1,
        gold: 0,
        inventory: [],
        nextUid: 0,
        equipped: {weapon: null, armor: null, ring: null}
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
        }
    },
})