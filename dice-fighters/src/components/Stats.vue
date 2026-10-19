<template>
 <div class="section panel">
   <div class="sectionTitle">Character Sheet</div>
   <v-row>
     Gold: {{ game.gold }}
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
     </div>
     </v-col>
     <v-col>
       <v-row :class="game.equipped.weapon ? game.equipped.weapon.rarity : ''">
         Weapon: {{game.equipped.weapon ? game.equipped.weapon.name :  "None"}}
       </v-row>
       <v-row :class="game.equipped.armor ? game.equipped.armor.rarity : ''">
         Armour: {{game.equipped.armor ? game.equipped.armor.name :  "None"}}
       </v-row>
       <v-row :class="game.equipped.ring ? game.equipped.ring.rarity : ''">
         Ring: {{game.equipped.ring ? game.equipped.ring.name :  "None"}}
       </v-row>
     </v-col>
   </v-row>
 </div>
</template>

<script setup>
import {useGame} from "@/stores/game.js";

let game = useGame()
</script>

<style scoped>

</style>