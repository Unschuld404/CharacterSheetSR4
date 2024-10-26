<script setup lang="ts">

import { useDialogeStore } from "@/stores/dialoge";

const dialogeStore = useDialogeStore();

</script>/

<template>

  <div class="modal-overlay">
    <div class="modal-content">

      <div class="column">
        <i class='bx bx-chevron-down icon'></i>
        <select class="row">
          <option>Erdgeist</option>
          <option>Feuergeist</option>
          <option>Luftgeist</option>
          <option>Wassergeist</option>
          <option>Geist des Menschen</option>
          <option>Geist des Tieres</option>
          <option>Watcher</option>
        </select>

        <div class="row">
          <div class="force">Kraft</div>
          <i class='bx bxs-minus-square icon'></i>
          <div class="value">3</div>
          <i class='bx bxs-plus-square icon'></i>
        </div>

        <div class="row">
          <div class="services">Dienste</div>
          <i class='bx bxs-minus-square icon'></i>
          <div class="value">3</div>
          <i class='bx bxs-plus-square icon'></i>
        </div>

      </div>

      <button class="confirm" @click="dialogeStore.hide">Hinzufügen</button>

    </div>
  </div>

</template>

<style scoped>

.modal-overlay {
  z-index: 1000;
}

.modal-content {
  width: 50vh;
  height: 40vh;
  z-index: 1001;
}

.column {
  height: 30vh;
  justify-content: space-around;
}

.bx-chevron-down {
  position: absolute;
  top: 4vh;
  right: 1vh;
  z-index: 1002;
}

select {
  background-color: transparent;
  border: none;
  color: var(--font-color);
  font-weight: bold;
  z-index: 1003;
}

select:focus {
  outline: none;
}

option {
  background-color: var(--primary-color);
}

.row {
  height: 8vh;
  line-height: 8vh;
  font-size: 4vh;
  align-items: center;
  gap: 2vh;
}

i {
  font-size: 6vh;
  width: 10vh;
  text-align: center;
}

.value {
  width: 10vh;
  text-align: center;
  font-weight: bold;
}

.force, .services {
  width: 20vh;
}

</style>/