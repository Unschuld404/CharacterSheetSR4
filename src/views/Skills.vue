<script setup lang="ts">
import AktionsFertigkeiten from "@/components/AktionsFertigkeiten.vue";
import Wissensfertigkeiten from "@/components/Wissensfertigkeiten.vue";
</script>


<template>

  <div class="collection">
    <AktionsFertigkeiten />
    <Wissensfertigkeiten />
  </div>

</template>

<style scoped>

  .collection {
    display: flex;
    gap: 1vh;
  }

  .box {
    width: 100%;
  }

</style>
