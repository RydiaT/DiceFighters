<template>
  <div>
    <v-data-table :headers="headers" :items="game.inventory" density="compact" hide-default-footer class="elevation-2" :items-per-page="-1" disable-sort>

    </v-data-table>
  </div>
</template>

<script setup>
import {useGame} from "@/stores/game.js";
import { ref } from "vue";

let game = useGame();

let headers = ref([
  {"title": "Name", "value": "name"},
  {"title": "Value", "value": "sell"}
])
</script>

<style scoped>

</style>