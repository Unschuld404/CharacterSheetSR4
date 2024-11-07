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
import EdgeDiceResult from "@/components/Dialoge/EdgeDiceResult.vue";
import {DialogEdgeDiceResult} from "@/composables/dialogs";

</script>

<template>

  <div class="collection">

    <div class="column">

      <div class="row ini-edg-nuy">
        <div class="edg-nuyen column">
          <Edge/>
          <Nuyen/>
        </div>
        <div class="initiative-box"><Initiative/></div>
      </div>

      <div class="resistance">
        <Widerstand/>
      </div>

      <div class="dodge">
        <Ausweichen/>
      </div>

      <div class="row monitors">
        <KoerperlicherSchadensmonitor/>
        <GeistigerSchadensmonitor/>
      </div>

    </div>

    <div class="column">
      <FavFertigkeiten/>
    </div>

    <div class="column">
      <div class="fav-actions">
        <FavAktionen/>
      </div>
      <div class="specials">
        <Specials/>
      </div>
    </div>

  </div>

</template>

<style scoped>

  .collection {
    display: flex;
    gap: 1vh;
  }
  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1vh;
  }
  .row {
    display: flex;
    flex-direction: row;
    gap: 1vh;
  }

  .ini-edg-nuy {
    flex: 1.5;
  }

  .dodge {
    flex: 1.5;
  }

  .resistance {
    flex: 1.5;
  }

  .monitors {
    flex: 4;
  }

  .edg-nuyen {
    flex: 1;
  }

  .initiative-box {
    flex: 1.5;
  }

  .fav-actions {
    flex: 3;
  }

  .specials {
    flex: 1;
  }

</style>
