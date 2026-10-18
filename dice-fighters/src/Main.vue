<template>
    <v-app>
      <v-main>
        <v-container>
          <v-row justify="end">
            <v-btn @click="game.isPaused = !game.isPaused">Pause</v-btn>
            <v-btn variant="outlined" @click="game.reset()" color="#c9302c">RESET</v-btn>
          </v-row>
          <v-row>
            <v-col>
              <div class="sectionTitle">You</div>
              <v-progress-linear height="20" :model-value="(game.hp / game.maxHp) * 100" class="health" color="#70b035">{{game.hp}} / {{game.maxHp}} ({{ ((game.hp / game.maxHp) * 100).toFixed(2) }}%)</v-progress-linear>
              <v-progress-linear height="20" :model-value="(game.exp / game.expToNext) * 100" class="health" color="#ffea4d">{{game.exp}} / {{game.expToNext}} / ({{ ((game.exp / game.expToNext) * 100).toFixed(2) }}%)</v-progress-linear>
            </v-col>
            <v-col v-if="game.enemy">
              <div class="sectionTitle">{{ game.enemy.name }}</div>
              <v-progress-linear height="20" :model-value="(game.enemy.hp / game.enemy.maxHp) * 100" class="health" color="#c9302c">{{game.enemy.hp}} / {{game.enemy.maxHp}} / ({{ ((game.enemy.hp / game.enemy.maxHp) * 100).toFixed(2) }}%)</v-progress-linear>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <stats />
              <log />
            </v-col>
            <v-col>
              <inventory-list />
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
</template>

<script setup>
import InventoryList from "@/components/InventoryList.vue";
import {useGame} from "@/stores/game.js";
import {onMounted} from "vue";
import {ITEMS} from "@/data/items.js";
import {useGameLoop} from "@/composables/useGameLoop.js";
import Log from "@/components/Log.vue";
import Stats from "@/components/Stats.vue";

useGameLoop();

let game = useGame()
</script>

<style scoped>

</style>
