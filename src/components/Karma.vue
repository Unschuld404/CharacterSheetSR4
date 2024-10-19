<script setup lang="ts">

import { data } from "@/scripts/Data";
import { useModalStore } from "@/stores/modalStore";
import WertBearbeiten from "@/components/Dialoge/WertBearbeiten.vue";

const modalStore = useModalStore();

</script>

<template>

  <div v-if="modalStore.showModal">

    <WertBearbeiten />

  </div>

  <div class="box">

    <div v-if="data" class="karma">{{ data.karma }}</div>
    <div class="lower-header">Karma</div>

  </div>

</template>

<style scoped>

.karma {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 3vh;
  color: var(--accent-color);
}

.box {
  height: 12vh;
}

</style>