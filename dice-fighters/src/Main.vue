<template>
  <div>
    <inventory-list></inventory-list>
  </div>
</template>

<script setup>
import InventoryList from "@/components/InventoryList.vue";
import {useGame} from "@/stores/game.js";
import {onMounted} from "vue";
import {ITEMS} from "@/data/items.js";

let game = useGame()

onMounted(() => {
  game.addItem
})
</script>

<style scoped>

</style>
