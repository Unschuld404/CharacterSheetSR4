<script setup lang="ts">

import { useDialogeStore } from "@/stores/dialoge";

const dialogeStore = useDialogeStore();

</script>/

<template>

  <div class="modal-overlay">
    <div class="modal-content">

      <h1>Edge</h1>
      <div class="row">
        <i class='bx bxs-minus-square icon'></i>
        <div>3</div>
        <i class='bx bxs-plus-square icon'></i>
      </div>
      <button class="confirm" @click="dialogeStore.hide">OK</button>

    </div>
  </div>

</template>

<style scoped>

.modal-overlay {
  z-index: 3000;
}

.modal-content{
  width: 40vh;
  height: 30vh;
  z-index: 3001;
}

h1 {
  font-weight: normal;
}

.row {
  justify-content: space-around;
  height: 15vh;
  align-items: center;
  font-size: 8vh;
  font-weight: bold;
}

</style>/