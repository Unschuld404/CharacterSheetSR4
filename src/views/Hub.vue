<script setup lang="ts">
import Initiative from "@/components/Initiative.vue";
import FavFertigkeiten from "@/components/FavFertigkeiten.vue";
import FavAktionen from "@/components/FavAktionen.vue";
import KoerperlicherSchadensmonitor from "@/components/KoerperlicherSchadensmonitor.vue";
import GeistigerSchadensmonitor from "@/components/GeistigerSchadensmonitor.vue";
import Specials from "@/components/Specials.vue";
import Widerstand from "@/components/Widerstand.vue";
import Edge from "@/components/Edge.vue";

</script>

<template>

  <div class="collection">

    <div class="column">

      <div class="row">
        <div class="edg"><Edge/></div>
        <div class="initiative-box"><Initiative/></div>
      </div>

      <Widerstand/>

      <Specials/>

      <div class="row">
        <KoerperlicherSchadensmonitor/>
        <GeistigerSchadensmonitor/>
      </div>

    </div>

    <div class="column">
      <FavFertigkeiten/>
    </div>

    <div class="column">
      <FavAktionen/>
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

  .edg {
    flex: 1;
  }

  .initiative-box {
    flex: 2;
  }

</style>
