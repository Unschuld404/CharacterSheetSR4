<script setup lang="ts">

import { useDialogeStore } from "@/stores/dialoge";

const dialogeStore = useDialogeStore();
</script>/

<template>

  <div class="modal-overlay">
    <div class="modal-content">
    <div class="column">
      <div class="dice">12</div>
      <div class="row">
        <div class="useEdge">Edge</div>
        <i class='bx bxs-minus-square'></i>
        <i class='bx bxs-plus-square'></i>
      </div>
    </div>
      <button class="confirm" @click="dialogeStore.hide">Los</button>

    </div>
  </div>

</template>

<style scoped>

.modal-content{
  width: 50vh;
  height: 30vh;
}

.column {
  height: 25vh;
  justify-content: center;
}

.row {
  justify-content: space-around;
  height: 15vh;
  align-items: center;
  font-size: 8vh;
  font-weight: bold;
}

.dice {
  text-align: center;
  line-height: 8vh;
  font-size: 8vh;
}

.useEdge {
  color: var(--background-color);
}

.useEdge:active {
  color: var(--accent-color);
}

</style>/