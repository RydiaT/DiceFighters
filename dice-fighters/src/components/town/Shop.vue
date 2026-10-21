<template>
  <div>
    <div class="sectionTitle">Welcome! Take your pick of my wares.</div>
    <v-data-table :items="shopStock" :headers="headers" density="compact" hide-default-footer class="shop elevation-2" :items-per-page="-1">
      <template v-slot:item.name="{ item }">
        <div :class="ITEMS[item[0]].rarity">
          {{ ITEMS[item[0]].name }}
        </div>
      </template>
      <template v-slot:item.stats="{ item }">
        <div>
          <div v-if="ITEMS[item[0]].stats.atk">Attack +{{ITEMS[item[0]].stats.atk}}</div>
          <div v-if="ITEMS[item[0]].stats.crit">Crit Rate +{{ITEMS[item[0]].stats.crit * 100}}%</div>
          <div v-if="ITEMS[item[0]].stats.maxHp">Max HP +{{ITEMS[item[0]].stats.maxHp}}</div>
          <div v-if="ITEMS[item[0]].stats.def">Defense +{{ITEMS[item[0]].stats.def}}</div>
          <div v-if="ITEMS[item[0]].stats.speed">Attack Speed +{{ITEMS[item[0]].stats.speed}}</div>
        </div>
      </template>
      <template v-slot:item.value="{ item }">
        <div>
          {{ parseInt(item[1]) }} Gold
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div>
          <v-btn style="margin-right: 5px" color="#70b035" density="compact" @click="buy(item)" :disabled="game.inventory.length >= MAX_INVENTORY || item[1] > game.gold">Buy</v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import {useGame} from "@/stores/game.js";
import {computed, ref} from "vue";
import {SHOP} from "@/data/town.js";
import {ITEMS} from "@/data/items.js";
import _ from "lodash"
import {MAX_INVENTORY} from "@/data/constants.js";

let game = useGame()

let headers = ref([
  {title: 'Name', value: 'name'},
  {title: 'Stats', value: 'stats'},
  {title: 'Asking Price', value: 'value'},
  {title: '', value: 'actions'}
])

let shopStock = computed(() => {
  let zones = Object.entries(SHOP)

  let unlockedItems = []

  _.forEach(zones, function([key, value]){
    if(game.zonesCleared.includes(key)) {
      _.forEach(value.items, function(item){
        unlockedItems.push([item, ITEMS[item].sell * game.getSellMult(ITEMS[item].rarity) * value.priceMult])
      })
    }
  })

  unlockedItems.sort((a, b) => {return a[1] - b[1]})

  return unlockedItems
})

function buy(item) {
  if(game.addItem(ITEMS[item[0]]) !== -1) {
    game.gold -= item[1];
    game.writeLog(`You bought ${ITEMS[item[0]].name} for ${item[1]} gold!`, ITEMS[item[0]].rarity)
  } else {
    game.writeLog(`Sorry Link, I can't give credit. Come back when you're a little, mmmmm, richer!`, 'danger')
  }

}
</script>

<style scoped>

</style>