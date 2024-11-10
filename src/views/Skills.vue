<script setup lang="ts">
import AktionsFertigkeiten from "@/components/AktionsFertigkeiten.vue";
import Wissensfertigkeiten from "@/components/Wissensfertigkeiten.vue";
import RadioButtons from "@/components/RadioButtons.vue";
import {SpiritPlanes} from "@/composables/spirits";

</script>


<template>

  <div class="collection column">
    <Wissensfertigkeiten />
    <AktionsFertigkeiten />
  </div>

</template>

<style scoped>

.column {
  gap: 10px;
}

</style>
