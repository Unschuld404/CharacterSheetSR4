<script setup lang="ts">

import { useDialogeStore } from "@/stores/dialoge";

const dialogeStore = useDialogeStore();

</script>/

<template>

  <div class="modal-overlay">
    <div class="modal-content">

      <h1>Wer bist du, Chummer?</h1>
      <input type="text"/>
      <button class="confirm" @click="dialogeStore.hide">Weiter</button>

    </div>
  </div>

</template>

<style scoped>

.modal-content {
  width: 60vh;
  height: 30vh;
}

input {
  width: 55vh;
  height: 8vh;
  line-height: 8vh;
  font-size: 4vh;
  font-weight: bold;
  text-align: center;
  color: var(--accent-color);
  margin-top: 4vh;
  border: none;
  border-bottom: 1px solid var(--background-color);
  background-color: var(--primary-color);
  caret-color: var(--accent-color);
}

input:focus {
  outline: none;
}

</style>/