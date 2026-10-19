<template>
  <div class="art-frame hit" :key="game.hitCount">
    <img v-if="!failed" :src="src" @error="failed = true" alt="Enemy Art">
    <span v-else>Art goes here <br>{{ src }}</span>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import {useGame} from "@/stores/game.js";

let game = useGame();
let props = defineProps(['src'])
let failed = ref(false)

watch(() => props.src, () => (failed.value = false))
</script>

<style scoped>

</style>