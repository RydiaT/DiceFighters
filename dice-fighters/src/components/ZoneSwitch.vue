<template>
  <div>
    <div class="sectionTitle">Zone Select</div>
    <p style="color: #6e6e6e; font-style: italic; font-size: 12px">Beat Bosses to Unlock More Zones!</p>
    <v-btn @click="zoneSwitch('forest')" variant="outlined" :disabled="game.zone === 'forest'" class="zoneSwitch forest">Mossy Forrest</v-btn>
    <v-btn v-if="game.zonesCleared.indexOf('forest') !== -1" @click="zoneSwitch('crypt')" variant="outlined" :disabled="game.zone === 'crypt'" class="zoneSwitch crypt">Sunken Crypt</v-btn>
  </div>
</template>

<script setup>
import {useGame} from "@/stores/game.js";
import {ZONES} from "@/data/zones.js";

let game = useGame();

function zoneSwitch(zone) {
  game.zone = zone;
  game.kills = 0;
  game.spawnEnemy();
  game.writeLog(`You traveled to the ${ZONES[zone].name}!`, zone)
}
</script>

<style scoped>

</style>