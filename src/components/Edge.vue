<script setup lang="ts">
import {char} from "@/composables/data";
import {DialogManageEdge} from "@/composables/dialogs";

</script>

<template>

  <div class="box">

    <div class="edg" @click="DialogManageEdge.show">{{ char.edge }}</div>
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
  cursor: pointer;
}

.box {
  height: 50%;
}

</style>