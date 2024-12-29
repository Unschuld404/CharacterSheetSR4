<script setup lang="ts">
import Initiative from "@/components/Initiative.vue";
import FavFertigkeiten from "@/components/FavFertigkeiten.vue";
import FavAktionen from "@/components/FavAktionen.vue";
import KoerperlicherSchadensmonitor from "@/components/KoerperlicherSchadensmonitor.vue";
import GeistigerSchadensmonitor from "@/components/GeistigerSchadensmonitor.vue";
import Specials from "@/components/Specials.vue";
import Widerstand from "@/components/Widerstand.vue";
import Edge from "@/components/Edge.vue";
import Nuyen from "@/components/Nuyen.vue";
import Ausweichen from "@/components/Ausweichen.vue";
import EdgeDiceResult from "@/components/Archiv für Später/EdgeDiceResult.vue";
import {DialogEdgeDiceResult} from "@/composables/dialogs";

</script>

<template>

  <div class="collection">

      <div class="row">
        <div class="column">
          <Edge/>
          <Nuyen/>
        </div>
        <Initiative/>
      </div>

      <Widerstand/>
      <Ausweichen/>

      <div class="row">
        <KoerperlicherSchadensmonitor/>
        <GeistigerSchadensmonitor/>
      </div>
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
    gap: 1dvh;
  }

  .row {
    gap: 1vh;
  }

  .column {
    gap: 1vh;
  }

</style>
