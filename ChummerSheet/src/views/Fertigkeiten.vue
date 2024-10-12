<script setup lang="ts">
import AktionsFertigkeiten from "@/components/AktionsFertigkeiten.vue";
import Wissensfertigkeiten from "@/components/Wissensfertigkeiten.vue";

import { useRouter } from "vue-router";


const router = useRouter();

const navigateLeft = () => {
  router.push({ name: 'Magie' });
};

const navigateRight = () => {
  router.push({ name: 'Hub' });
};

</script>


<template>

  <div v-touch:swipe.left="navigateLeft"
       v-touch:swipe.right="navigateRight">

    <div class="collection">
      <AktionsFertigkeiten />
      <Wissensfertigkeiten />
    </div>

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
