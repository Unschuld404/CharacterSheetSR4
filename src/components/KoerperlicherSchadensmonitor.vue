<script setup lang="ts">

import {getMaxPhysicalDamage} from "@/composables/data";

</script>

<template>

  <div class="box">
    <div v-for="row in 6" :key="row" class="row">
      <input v-for="col in 3" :key="col" type="checkbox" :class="{'favourite': true, 'disabled': (row -1) * 3 + col > getMaxPhysicalDamage() }">
      <div class="malus">{{ row * -1 }}</div>
    </div>
    <div class="lower-header">Körperlicher Zustand</div>
  </div>

</template>

<style scoped>

  .box {
    height: 36vh;
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

  .favourite {
    height: 4vh;
    width: 4vh;
    position: relative;
    bottom: 2vh;
  }

  .disabled
  {
    background-color: darkgrey;
  }
  .disabled:checked
  {
    background-color: darkred;
  }

  .malus {
    height: 4vh;
    width: 2vh;
    line-height: 4vh;
  }

</style>