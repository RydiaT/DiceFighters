<template>
  <v-col cols="12">
    <div class="sectionTitle">Welcome to {{ townName }}</div>
  </v-col>
  <v-col>
    <shop />
  </v-col>
  <v-col>
    <quest-board />
  </v-col>
</template>

<script setup>
import Shop from "@/components/town/Shop.vue";
import {computed} from "vue";
import {useGame} from "@/stores/game.js";
import QuestBoard from "@/components/town/QuestBoard.vue";

let game = useGame();

let townName = computed(() => {
  let names = ["Texas", "Lodown", "Murder", "Hell", "Walmart", "Russia", "Klingon", "Ville", "County", "Istan", "Probably", "Not", "Whensoever", "Wheresoever", "West", "Loathing", "City", "Gods", "Ancients", "Fields", "Roma", "Tostitos", "Middle", "Nowhere"];
  let endings = ["", "", "", "", "", "", "", "", "", "'nt", "?", "~", "?!", ", please leave.", "!", ", stay a while.", ". Give us your money!"]

  return names[game.randint(0, names.length - 1)] + " " + names[game.randint(0, names.length - 1)] + "" + endings[game.randint(0, endings.length - 1)]
})
</script>

<style scoped>

</style>