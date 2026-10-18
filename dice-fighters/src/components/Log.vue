<template>
  <div class="gameLog">
   <div v-for="(log, index) in game.log" :class="'log ' + log.type" :key="log.id">
     {{ log.text }}
   </div>
    <div class="anchor"></div>
  </div>
</template>

<script setup>
import {useGame} from "@/stores/game.js";
import {onMounted} from "vue";


let game = useGame();
</script>

<style scoped>
.anchor {
  overflow-anchor: auto; /* */
  height: 1px;
}
</style>