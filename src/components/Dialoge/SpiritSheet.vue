<script setup lang="ts">

import { useDialogeStore } from "@/stores/dialoge";

const dialogeStore = useDialogeStore();

</script>/

<template>

  <div class="modal-overlay">
    <div class="modal-content">

      <button @click="dialogeStore.hide">OK</button>

    </div>
  </div>

</template>

<style scoped>



</style>/