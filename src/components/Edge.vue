<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogManageEdge} from "@/composables/dialogs";

</script>

<template>

  <div class="box">

    <div class="edg" @click="DialogManageEdge.show">{{ char.attributes.edge.total }}</div>
    <div class="lower-header">Edge</div>

  </div>

</template>

<style scoped>

.edg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  margin-top: 1vh;
  font-size: 1.5rem;
  color: var(--accent-color);
  cursor: pointer;
}

.box {
  height: 50%;
}

</style>