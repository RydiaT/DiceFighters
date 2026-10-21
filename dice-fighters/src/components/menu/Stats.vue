<template>
 <div class="section blueSection">
   <div class="sectionTitle blueTitle">Character Sheet</div>
   <v-row>
     Level: {{game.level}}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Gold: {{ game.gold }}
   </v-row>
   <v-row>
     <v-col>
     <div>
       <v-row>
         Max HP: {{game.maxHp}}
       </v-row>
       <v-row>
        Attack: {{game.stats.atk}}
       </v-row>
       <v-row>
         Defense: {{game.stats.def}}
       </v-row>
       <v-row>
         Crit Rate: {{game.stats.crit * 100}}%
       </v-row>
       <v-row>
         Attack Speed: {{(1 / game.stats.speed).toFixed(2)}}s
       </v-row>
     </div>
     </v-col>
     <v-col>
       <template v-for="slot in SLOTS">
         <v-row :class="game.equipped[slot] ? game.equipped[slot].rarity : ''">
           {{ slot.charAt(0).toUpperCase() + slot.slice(1) }}: {{game.equipped[slot] ? game.equipped[slot].name :  "None"}}
         </v-row>
       </template>
     </v-col>
     <v-col>
       <template v-for="slot in SLOTS">
         <v-row>
           <v-btn v-if="game.equipped[slot]" density="compact" @click="game.unequipItem(slot)" :disabled="game.inventory.length >= MAX_INVENTORY">Unequip</v-btn>
           <!--       blank character row to make things line up -->
           <div v-else>
             ⠀
           </div>
         </v-row>
       </template>
     </v-col>
   </v-row>
 </div>
</template>

<script setup>
import {useGame} from "@/stores/game.js";
import {MAX_INVENTORY, SLOTS} from "@/data/constants.js";

let game = useGame()
</script>

<style scoped>

</style>