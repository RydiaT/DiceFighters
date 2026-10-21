<template>
  <div>
    <div class="sectionTitle">TOWN QUEST BOARD</div>
    <v-data-table :items="availableQuests" :headers="headers" density="compact" hide-default-footer class="shop elevation-2" :items-per-page="-1">
      <template v-slot:item.reward="{ item }">
        <div>
          <div v-if="item.reward.exp">{{item.reward.exp}} EXP</div>
          <div v-if="item.reward.gold">{{item.reward.gold}} Gold</div>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div>
          <v-btn style="margin-right: 5px" color="#70b035" density="compact" @click="accept(item)" :disabled="game.activeQuests.some(q => q[0] === item.id)">Accept</v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import {useGame} from "@/stores/game.js";
import {computed, ref} from "vue";
import {QUESTS, SHOP} from "@/data/town.js";
import {ITEMS} from "@/data/items.js";
import _ from "lodash"
import {MAX_INVENTORY} from "@/data/constants.js";
import {ZONES} from "@/data/zones.js";

let game = useGame()

let headers = ref([
  {title: 'Name', value: 'name'},
  {title: '', value: 'flavorText'},
  {title: 'Task', value: 'task'},
  {title: 'Location', value: 'location'},
  {title: 'Reward', value: 'reward'},
  {title: '', value: 'actions'}
])

let availableQuests = computed(() => {
  let quests = Object.entries(QUESTS)

  let out = []

  _.forEach(quests, function([key, value]){
    if(game.zonesCleared.includes(value.unlockAt) && !game.finishedQuests.includes(key) && !game.activeQuests.some(q => q[0] === key)) {
      out.push({
        id: key,
        name: value.label,
        flavorText: value.flavorText,
        task: getTaskLabel(value.type) + " " + scaleCount(value.count) + " " + value.thing.split(" ")[1] + "!",
        count: value.count,
        location: ZONES[value.thing.split(" ")[0]].name,
        reward: scaleReward(value.reward)
      })
    }
  })

  return out
})

function accept(item) {
  game.activeQuests.push([item.id, 0, scaleCount(item.count), item.reward])
  game.writeLog(`Quest "${item.name}" Accepted!`, 'basic')
}

function scaleCount(val) {
  if(game.zonesCleared.includes('crypt')) {
    return val * 2
  } else if (game.zonesCleared.includes('forest')) {
    return val
  }
}

// important for later non-number rewards, i think
function scaleReward(val) {
  let out = {};

  if(val.exp) {
    out.exp = scaleCount(val.exp)
  }

  if(val.gold) {
    out.gold = scaleCount(val.gold)
  }

  return out;
}

function getTaskLabel(taskType) {
  switch(taskType) {
    case "kill":
      return "Kill"
    default:
      return "¯\\_(ツ)_/¯"
  }
}
</script>

<style scoped>

</style>