<script setup lang="ts">
import InitiativeEdge from "@/components/Initiative.vue";
import FavFertigkeiten from "@/components/FavFertigkeiten.vue";
import FavAktionen from "@/components/FavAktionen.vue";
import Widerstand from "@/components/Widerstand.vue";
import Nuyen from "@/components/Nuyen.vue";
import Ausweichen from "@/components/Ausweichen.vue";
import Damage from "@/components/Damage.vue";

</script>

<template>
  <div class="content">
    <Nuyen/>
    <Damage/>
    <InitiativeEdge/>
    <Widerstand/>
    <Ausweichen/>
    <FavAktionen/>
    <FavFertigkeiten/>
  </div>
</template>

<style scoped>

</style>
