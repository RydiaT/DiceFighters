<template>
  <template>
    <v-app>
      <v-main>
        <v-container>
          <inventory-list />
        </v-container>
      </v-main>
    </v-app>
  </template>
</template>

<script setup>
import InventoryList from "@/components/InventoryList.vue";
import {useGame} from "@/stores/game.js";
import {onMounted} from "vue";
import {ITEMS} from "@/data/items.js";

let game = useGame()

onMounted(() => {
  game.addItem(ITEMS.rustySword)
})
</script>

<style scoped>

</style>
