<template>
  <div>
    <v-data-table :headers="headers" :items="game.inventory" density="compact" hide-default-footer class="elevation-2" :items-per-page="-1" disable-sort>
      <template v-slot:name="{ item }">
        {{ item.item.name }}
      </template>
      <template v-slot:sell="{ item }">
        {{ item.item.sell }}
      </template>
      <template v-slot:uid="{ item }">
        {{ item.uid }}
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
  {"title": "Value", "value": "sell"},
  {"title": "UID", "value": "uid"}
])
</script>

<style scoped>

</style>