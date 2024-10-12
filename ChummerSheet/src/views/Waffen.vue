<script setup lang="ts">

import { useRouter } from "vue-router";
import Weapons from "@/components/WaffenListe.vue";

const router = useRouter();

const navigateLeft = () => {
  router.push({ name: 'Hub' });
};

const navigateRight = () => {
  router.push({ name: 'Fahrzeuge' });
};

</script>

<template>

  <div v-touch:swipe.left="navigateLeft"
       v-touch:swipe.right="navigateRight">

    <div class="collection">
      <div class="box">
        <weapons/>
      </div>
    </div>

  </div>

</template>

<style scoped>

.box {
  height: 100%;
}

</style>
