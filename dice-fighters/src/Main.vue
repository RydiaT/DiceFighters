<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <inventory-list></inventory-list>
</template>

<script setup>
import InventoryList from "@/components/InventoryList.vue";
import {useGame} from "@/stores/game.js";
import {onMounted} from "vue";
import {ITEMS} from "@/data/items.js";

let game = useGame()

onMounted(() => {
  game.inventory.push(ITEMS.rustySword)
})
</script>

<style scoped>

</style>
