<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogManageEdge} from "@/composables/dialogs";

</script>

<template>

  <div class="item">
    <div>Edge</div>
    <button @click="DialogManageEdge.show">{{ char.attributes.edge.total }}</button>
  </div>

</template>

<style scoped>
  button {
    border: none;
  }
</style>