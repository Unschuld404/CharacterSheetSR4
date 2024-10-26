<script setup lang="ts">
import {getAttributeValueByName} from "@/composables/data";

</script>

<template>

  <div class="box">

    <div class="edg">{{ getAttributeValueByName('EDG') }}</div>
    <div class="lower-header">Edge</div>

  </div>

</template>

<style scoped>

.edg {
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