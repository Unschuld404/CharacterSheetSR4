<script setup lang="ts">

import { useDialogeStore } from "@/stores/dialoge";

const dialogeStore = useDialogeStore();

</script>/

<template>

  <div class="modal-overlay">
    <div class="modal-content">

      <h1>Nuyen</h1>
      <div class="row">
        <input type="number" placeholder="Summe" autofocus>
        <p>¥</p>
      </div>
      <div class="row">
        <input type="text" placeholder="Grund">
      </div>
      <div class="row">
        <button @click="dialogeStore.hide">Ausgeben</button>
        <button @click="dialogeStore.hide">Einnahmen</button>
      </div>

    </div>
  </div>

</template>

<style scoped>

.modal-content{
  width: 60vh;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h1 {
  font-weight: normal;
}

p {
  font-size: 4vh;
  position: absolute;
  top: 1.4vh;
  right: 3vh;
}

input {
  margin-top: 0;
  width: 90%;
  color: var(--font-color);
  caret-color: var(--font-color);
}

input::placeholder {
  font-size: 4vh;
  font-weight: normal;
}

button {
  border: none;
  border-radius: 0.5vh;
  background-color: var(--font-color);
  width: 90%;
  font-size: 4vh;
  color: var(--background-color);
  position: relative;
}

.row {
  justify-content: space-evenly;
  gap: 2.5vh;
  position: relative;
}

i {
  margin-top: 1.5vh;
}

</style>/