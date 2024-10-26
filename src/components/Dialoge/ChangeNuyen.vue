<script setup lang="ts">
import { DialogChangeNuyen } from "@/composables/dialogs";
import {char} from "@/composables/data";
import {toInt} from "@/composables/utils";
import {ref} from "vue";

const nuyen = ref(' ');
const reason = ref('');

function add()
{
  char.value.nuyen = String(toInt(char.value.nuyen) + toInt(nuyen.value));
  DialogChangeNuyen.hide();
  nuyen.value = '';
}

function substract()
{
  char.value.nuyen = String(toInt(char.value.nuyen) - toInt(nuyen.value));
  DialogChangeNuyen.hide();
  nuyen.value = '';
}

</script>/

<template>

  <div v-if="DialogChangeNuyen.visible" class="modal-overlay" @click="DialogChangeNuyen.hide">
    <div class="modal-content">

      <h1>Nuyen</h1>
      <div class="row">
        <input v-model="nuyen" type="number" placeholder="Summe" autofocus>
        <p>¥</p>
      </div>
      <div class="row">
        <input v-model="reason" type="text" placeholder="Grund">
      </div>
      <div class="row">
        <button @click="substract">Ausgeben</button>
        <button @click="add">Einnahmen</button>
      </div>

    </div>
  </div>

</template>

<style scoped>

.modal-overlay {
  z-index: 2000;
}

.modal-content{
  width: 60vh;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2001;
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
  text-transform: none;
}

input::placeholder {
  text-transform: uppercase;
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

</style>/