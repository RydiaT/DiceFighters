<template>
  <v-data-table :items="quests" :headers="headers" density="compact" hide-default-footer class="shop elevation-2" :items-per-page="-1" v-if="game.activeQuests.length">
  </v-data-table>
</template>

<script setup>
import {computed, ref} from "vue";
import {useGame} from "@/stores/game.js";
import {QUESTS} from "@/data/town.js";
import _ from "lodash"

let game = useGame();

let headers = ref([
  {title: "Name", value: "name"},
  {title: "Progress", value: "progress"}
])

let quests = computed(() => {
  let out = []
  _.forEach(game.activeQuests, function(quest){
    out.push({
      name: QUESTS[quest[0]].label,
      progress: quest[1] + "/" + quest[2] + " " + QUESTS[quest[0]].thing.split(" ")[1]
    })
  })
  return out
})
</script>

<style scoped>

</style>