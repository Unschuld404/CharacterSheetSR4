<script setup lang="ts">
import FahrzeugeUndDrohnen from "@/components/FahrzeugeUndDrohnen.vue";

import { useRouter } from "vue-router";


const router = useRouter();

const navigateLeft = () => {
  router.push({ name: 'Waffen' });
};

</script>

<template>

  <div v-touch:swipe.left="navigateLeft">

    <div class="collection">
      <div class="flex-scroll">
        <FahrzeugeUndDrohnen/>
      </div>
    </div>

  </div>

</template>

<style scoped>

</style>
