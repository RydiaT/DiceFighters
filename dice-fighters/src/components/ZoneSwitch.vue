<template>
  <div>
    <div class="sectionTitle">Zone Select</div>
    <p style="color: #6e6e6e; font-style: italic; font-size: 12px">Beat Bosses to Unlock More Zones!</p>
    <template v-for="zone in zoneList.filter(z => z.unlocked)" :key="zone.id">
      <v-btn :disabled="game.zone === zone.id" variant="outlined" :class="'zoneSwitch ' + zone.id"  @click="zoneSwitch(zone.id)">{{ zone.dispName }}</v-btn>
    </template>
  </div>
</template>

<script setup>
import {useGame} from "@/stores/game.js";
import {ZONES} from "@/data/zones.js";
import {computed} from "vue";

let game = useGame();

let zoneList = computed(() => {
  let entries = Object.entries(ZONES)

  return entries.map(([id, zone], i) => ({
    id,
    dispName: zone.name,
    unlocked: i === 0 || game.zonesCleared.includes(entries[i - 1][0]),
  }))
})

function zoneSwitch(zone) {
  game.zone = zone;
  game.kills = 0;
  game.writeLog(`You traveled to the ${ZONES[zone].name}!`, zone)
  game.spawnEnemy();
}
</script>

<style scoped>

</style>