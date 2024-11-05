<script setup lang="ts">

import {char} from "@/composables/char";

</script>

<template>

  <div class="box">
      <div v-for="row in 6" :key="row" class="row">
      <input v-for="col in 3" :key="col" type="checkbox" :class="{'damage-box': true, 'disabled': (row -1) * 3 + col > char.maxPhysicalDamage }">
      <div class="malus">{{ row * -1 }}</div>
    </div>
    <div class="lower-header">Körperlicher Zustand</div>
  </div>

</template>

<style scoped>

  .box {
    height: 100%;
    width: 50%;
    padding-top: 1vh;
  }

  .row {
    height: 5vh;
    line-height: 5vh;
    align-items: center;
    justify-content: space-around;
    padding-left: 1vh;
  }

  .disabled
  {
    background-color: var(--primary-color);
    border: 1px solid var(--background-color);
  }
  .disabled:checked
  {
    background-color: var(--font-color);
  }

  .malus {
    height: 4vh;
    width: 2vh;
    line-height: 4vh;
  }

</style>