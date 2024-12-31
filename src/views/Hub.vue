<script setup lang="ts">
import Initiative from "@/components/Initiative.vue";
import FavFertigkeiten from "@/components/FavFertigkeiten.vue";
import FavAktionen from "@/components/FavAktionen.vue";
import KoerperlicherSchadensmonitor from "@/components/Archiv für Später/KoerperlicherSchadensmonitor.vue";
import GeistigerSchadensmonitor from "@/components/Archiv für Später/GeistigerSchadensmonitor.vue";
import Specials from "@/components/Specials.vue";
import Widerstand from "@/components/Widerstand.vue";
import Edge from "@/components/Edge.vue";
import Nuyen from "@/components/Nuyen.vue";
import Ausweichen from "@/components/Ausweichen.vue";
import EdgeDiceResult from "@/components/Archiv für Später/EdgeDiceResult.vue";
import {DialogEdgeDiceResult} from "@/composables/dialogs";
import Damage from "@/components/Damage.vue";

</script>

<template>
  <div class="collection">
    <Nuyen/>
    <Damage/>
    <Initiative/>
    <Widerstand/>
    <Ausweichen/>
    <div class="column">
      <FavAktionen/>
      <FavFertigkeiten/>
    </div>
  </div>
</template>

<style scoped>

  .collection {
    display: flex;
    flex-direction: column;
    gap: 2dvw;
  }

  .row {
    gap: 2dvw;
  }

</style>
