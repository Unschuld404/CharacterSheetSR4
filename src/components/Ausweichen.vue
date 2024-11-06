<script setup lang="ts">
import {ref} from "vue";
import {char} from "../composables/char";

const isActive = ref(false);

function fullDefense() {
  isActive.value = !isActive.value;
}
</script>

<template>

  <div class="box row">

    <div class="column">
      <div>Fernkampf</div>
      <div class="dice">??</div>
    </div>

    <div class="column">
      <div :class="{'active': isActive}" class="dice defense" @click="fullDefense">Volle Abwehr</div>
    </div>

    <div class="column">
      <div>Nahkampf</div>
      <div class="dice">??</div>
    </div>

  <div class="lower-header">
    Ausweichen
  </div>

  </div>

</template>

<style scoped>

.box {
  height: 100%;
  padding-top: 2vh;
}

.column {
  text-align: center;
  align-items: center;
}

.row{
  justify-content: space-evenly;
}

.dice {
  margin-top: 1vh;
}

.defense {
  width: 15vh;
  margin-top: 3.5vh;
  font-weight: normal;
  font-size: 2vh;
}

.defense.active {
  background-color: var(--accent-color);
  color: var(--background-color);
  font-weight: bold;
}

</style>