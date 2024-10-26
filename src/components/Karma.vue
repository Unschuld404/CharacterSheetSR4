<script setup lang="ts">
import {data} from "@/composables/data";

</script>

<template>

  <div class="box">

    <div class="karma">{{ data?.karma ?? 0 }}</div>
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