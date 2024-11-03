<script setup lang="ts">
import {ref} from "vue";
import {Spirit} from "@/composables/spirits";

const maxDamage = ref(10);

</script>

<template>

  <div class="box">
    <div v-for="row in 5" :key="row" class="row">
      <input v-for="col in 3" :key="col" type="checkbox" :class="{'damage-box': true, 'disabled': (row -1) * 3 + col > maxDamage }">
      <div class="malus">{{ row * -1 }}</div>
    </div>
  </div>

</template>

<style scoped>

.box {
  padding: 0;
  background-color: transparent;
  border: none;
}

.damage-box {
  width: 6vh;
  height: 6vh;
}

.row {
  height: 8vh;
  align-items: center;
  justify-content: space-around;
  padding-left: 1vh;
}

.disabled
{
  background-color: var(--primary-color);
  cursor: default;
  border: transparent;
}

.malus {
  height: 4vh;
  width: 2vh;
  line-height: 4vh;
}

</style>