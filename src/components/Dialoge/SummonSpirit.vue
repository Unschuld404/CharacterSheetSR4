<script setup lang="ts">

import { useDialogeStore } from "@/stores/dialoge";

const dialogeStore = useDialogeStore();

</script>/

<template>

  <div class="modal-overlay">
    <div class="modal-content">

      <div class="column">
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
          <i class='bx bxs-minus-square'></i>
          <div class="value">3</div>
          <i class='bx bxs-plus-square'></i>
        </div>

        <div class="row">
          <div class="services">Dienste</div>
          <i class='bx bxs-minus-square'></i>
          <div class="value">3</div>
          <i class='bx bxs-plus-square'></i>
        </div>

      </div>

      <button class="confirm" @click="dialogeStore.hide">Beschwören</button>

    </div>
  </div>

</template>

<style scoped>

.modal-content {
  width: 50vh;
  height: 40vh;
}

.column {
  height: 30vh;
  justify-content: space-around;
}

select {
  background-color: transparent;
  border: none;
  color: var(--accent-color);
}

option {
  background-color: var(--primary-color);
  align-items: center;
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