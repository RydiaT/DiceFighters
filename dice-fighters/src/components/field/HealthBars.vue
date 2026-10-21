<template>
  <v-col>
    <div class="sectionTitle">You</div>
    <v-progress-linear height="20" :model-value="(game.hp / game.maxHp) * 100" class="health" color="#70b035">{{game.hp}} / {{game.maxHp}} ({{ ((game.hp / game.maxHp) * 100).toFixed(2) }}%)</v-progress-linear>
    <v-progress-linear height="20" :model-value="(game.exp / game.expToNext) * 100" class="health" color="#ffea4d">{{game.exp}} / {{game.expToNext}} / ({{ ((game.exp / game.expToNext) * 100).toFixed(2) }}%)</v-progress-linear>
  </v-col>
  <v-col v-if="game.enemy">
    <div class="sectionTitle" :style="game.enemy.isBoss ? 'font-weight: bold; font-style: italic; color: #fffadb;' : ''">{{ game.enemy.name }} {{ game.enemy.isBoss ? "(BOSS)" : ""}}</div>
    <enemy-art :src="assetURL + game.enemy.art"></enemy-art>
    <v-progress-linear height="20" :model-value="(game.enemy.hp / game.enemy.maxHp) * 100" class="health" color="#c9302c">{{game.enemy.hp}} / {{game.enemy.maxHp}} / ({{ ((game.enemy.hp / game.enemy.maxHp) * 100).toFixed(2) }}%)</v-progress-linear>
  </v-col>
</template>

<script setup>
import {useGame} from "@/stores/game.js";
import ZoneSwitch from "@/components/menu/ZoneSwitch.vue";
import EnemyArt from "@/components/field/EnemyArt.vue";

let game = useGame()
let assetURL = `${import.meta.env.BASE_URL}art/enemies`
</script>

<style scoped>

</style>