<script setup lang="ts">

import { useDialogeStore } from "@/stores/dialoge";

const dialogeStore = useDialogeStore();

</script>/

<template>

  <div class="modal-overlay">
    <div class="modal-content">

      <h1>Wer bist du, Chummer?</h1>
      <input type="text" autofocus/>
      <button class="confirm" @click="dialogeStore.hide">Weiter</button>

    </div>
  </div>

</template>

<style scoped>

.modal-content {
  width: 60vh;
  height: 30vh;
}

.modal-overlay {
  background-color: black;
}

input {
  text-transform: none;
}

</style>/