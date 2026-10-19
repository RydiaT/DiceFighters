<template>
    <v-app>
      <v-main>
        <v-container max-width="1500" class="strip">
          <v-row justify="end">
            <v-btn @click="game.isPaused = !game.isPaused">Pause</v-btn>
            <v-btn variant="outlined" @click="game.reset()" color="#c9302c">RESET</v-btn>
          </v-row>
          <v-row>
            <v-col>
              <div class="sectionTitle">You</div>
              <v-progress-linear height="20" :model-value="(game.hp / game.maxHp) * 100" class="health" color="#70b035">{{game.hp}} / {{game.maxHp}} ({{ ((game.hp / game.maxHp) * 100).toFixed(2) }}%)</v-progress-linear>
              <v-progress-linear height="20" :model-value="(game.exp / game.expToNext) * 100" class="health" color="#ffea4d">{{game.exp}} / {{game.expToNext}} / ({{ ((game.exp / game.expToNext) * 100).toFixed(2) }}%)</v-progress-linear>
              <zone-switch />
            </v-col>
            <v-col v-if="game.enemy">
              <div class="sectionTitle" :style="isBoss ? 'font-weight: bold; font-style: italic; color: #fffadb;' : ''">{{ game.enemy.name }} {{ isBoss ? "(BOSS)" : ""}}</div>
              <enemy-art :src="assetURL + game.enemy.art"></enemy-art>
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
import {computed, onMounted, ref} from "vue";
import {ITEMS} from "@/data/items.js";
import {useGameLoop} from "@/composables/useGameLoop.js";
import Log from "@/components/Log.vue";
import Stats from "@/components/Stats.vue";
import EnemyArt from "@/components/EnemyArt.vue";
import ZoneSwitch from "@/components/ZoneSwitch.vue";
import {ZONES} from "@/data/zones.js";

useGameLoop();

let game = useGame()
let assetURL = ref("../src/assets/enemies")

let isBoss = computed(() => {
  return game.enemy.name === ZONES[game.zone].boss.name;
})
</script>

<style scoped>

</style>
