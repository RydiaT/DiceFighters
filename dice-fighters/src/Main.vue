<template>
    <v-app>
      <v-main>
        <v-container max-width="1500" class="strip">
          <v-row justify="end">
            <v-btn @click="game.isPaused = !game.isPaused">Pause</v-btn>
            <v-btn variant="outlined" @click="game.reset()" color="#c9302c">RESET</v-btn>
          </v-row>
          <v-row v-if="game.location === 'field'">
            <health-bars />
          </v-row>
          <v-row v-else-if="game.location === 'town'">
            <town />
          </v-row>
          <v-row>
            <zone-switch />
          </v-row>
          <v-row>
            <v-col>
              <quest-tracker />
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
import {useGame} from "@/stores/game.js";
import {computed, onMounted, ref} from "vue";
import {ITEMS} from "@/data/items.js";
import {useGameLoop} from "@/composables/useGameLoop.js";
import {ZONES} from "@/data/zones.js";
import HealthBars from "@/components/field/HealthBars.vue";
import InventoryList from "@/components/menu/InventoryList.vue";
import Log from "@/components/menu/Log.vue";
import Stats from "@/components/menu/Stats.vue";
import Town from "@/components/town/Town.vue";
import ZoneSwitch from "@/components/menu/ZoneSwitch.vue";
import QuestTracker from "@/components/menu/QuestTracker.vue";

useGameLoop();

let game = useGame()
</script>

<style scoped>

</style>
