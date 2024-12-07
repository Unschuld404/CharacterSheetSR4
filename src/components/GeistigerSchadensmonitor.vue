<script setup lang="ts">

import {char} from "@/composables/char";

</script>

<template>

  <div class="box">
    <div v-for="row in 6" :key="row" class="row">
      <input v-for="col in 3" :key="col" type="checkbox" :class="{'damage-box': true, 'disabled': (row -1) * 3 + col > char.maxStunDamage }">
      <div class="malus">{{ row * -1 }}</div>
    </div>
    <div class="upper-header">Geistiger Zustand</div>
  </div>

</template>

<style scoped>

.box {
  width: 50%;
  padding-top: 9vh;
}

.row {
  height: 9vw;
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

.malus {
  height: 7vw;
  width: 4vw;
  line-height: 4vh;
}

.disabled
{
  background-color: var(--primary-color);
  cursor: default;
  border: transparent;
}

</style>