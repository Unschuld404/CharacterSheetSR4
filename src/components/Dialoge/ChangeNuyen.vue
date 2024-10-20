<script setup lang="ts">

import { useDialogeStore } from "@/stores/dialoge";

const dialogeStore = useDialogeStore();

</script>/

<template>

  <div class="modal-overlay">
    <div class="modal-content">

      <h1>Nuyen</h1>
      <div class="row">
        <input type="number" placeholder="¥" autofocus>
      </div>
      <div class="row">
        <button @click="dialogeStore.hide"><i class='bx bxs-minus-square'></i></button>
        <button @click="dialogeStore.hide"><i class='bx bxs-plus-square'></i></button>
      </div>

    </div>
  </div>

</template>

<style scoped>

.modal-content{
  width: 30vh;
  height: 25vh;
}

h1 {
  font-weight: normal;
}

input {
  margin-top: 0;
  width: 20vh;
  color: var(--font-color);
  caret-color: var(--font-color);
}

button {
  border: none;
  background-color: transparent;
  font-size: 6vh;
}

.row {
  justify-content: space-around;
}

i {
  margin-top: 1.5vh;
}

</style>/