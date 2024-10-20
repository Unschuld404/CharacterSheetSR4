<script setup lang="ts">

import { useDialogeStore } from "@/stores/dialoge";

const dialogeStore = useDialogeStore();

</script>/

<template>

  <div class="modal-overlay">
    <div class="modal-content">

      <button class="confirm" @click="dialogeStore.hide"><i class='bx bx-chevron-down'></i></button>

    </div>
  </div>

</template>

<style scoped>

  .modal-content {
    height: 60vh;
    width: 90vh;
  }

  .bx-chevron-down {
    color: var(--background-color);
    font-size: 5vh;
  }

</style>/