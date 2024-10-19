<script setup lang="ts">

import { data, getTotalValueByName } from '@/scripts/Data';

</script>

<template>

  <div class="box">

    <div v-if="data" class="edge-dice">{{ getTotalValueByName('EDG') }}</div>
    <div class="lower-header">Edge</div>

  </div>

</template>

<style scoped>

.edge-dice {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 5vh;
  color: var(--accent-color);
}

.box {
  width: 8vh;
}

</style>