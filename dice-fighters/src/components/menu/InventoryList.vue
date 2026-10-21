<template>
  <div class="section orangeSection">
    <div class="sectionTitle orangeTitle">Inventory</div>
    <v-data-table :headers="headers" :items="game.inventory" density="compact" hide-default-footer class="elevation-2" :items-per-page="-1" disable-sort>
      <template v-slot:item.name="{ item }">
        <div :class="item.item.rarity">
          {{ item.item.name }}
        </div>
      </template>
      <template v-slot:item.value="{ item }">
        <div>
          {{ parseInt(item.item.sell) * game.getSellMult(item.item.rarity) }}
        </div>
      </template>
      <template v-slot:item.stats="{ item }">
        <div>
          <div v-if="item.item.stats.atk">Attack +{{item.item.stats.atk}}</div>
          <div v-if="item.item.stats.crit">Crit Rate +{{item.item.stats.crit * 100}}%</div>
          <div v-if="item.item.stats.maxHp">Max HP +{{item.item.stats.maxHp}}</div>
          <div v-if="item.item.stats.def">Defense +{{item.item.stats.def}}</div>
          <div v-if="item.item.stats.speed">Attack Speed +{{item.item.stats.speed}}</div>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div>
          <v-btn style="margin-right: 5px" color="#2f1d7f" density="compact" @click="game.equipItem(item.uid)">Equip</v-btn>
          <v-btn color="#1d697f" density="compact" @click="game.sellItem(item.uid)">Sell</v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import {useGame} from "@/stores/game.js";
import { ref } from "vue";

let game = useGame();

let headers = ref([
  {"title": "Name", "value": "name"},
  {"title": "Value", "value": "value"},
  {"title": "Stats", "value": "stats"},
  {"title": "", "value": "actions", "align": "end"}
])
</script>

<style scoped>

</style>