<script setup lang="ts">

import { useDialogeStore } from "@/stores/dialoge";

const dialogeStore = useDialogeStore();

</script>/

<template>

  <div class="modal-overlay">
    <div class="modal-content">

      <div class="row">
        <div class="critter-name bob">Watcher</div>
        <div class="kraft bob total-value">1</div>
      </div>
      <div class="attributes">Körperliche Attribute</div>

      <button class="confirm" @click="dialogeStore.hide"><i class='bx bx-chevron-down'></i></button>
    </div>
  </div>

</template>

<style scoped>

  .modal-content {
    height: 80vh;
    width: 80vw;
  }

  .bx-chevron-down {
    color: var(--background-color);
    font-size: 5vh;
  }

</style>/