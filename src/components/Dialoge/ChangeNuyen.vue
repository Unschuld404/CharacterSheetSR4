<script setup lang="ts">
import { DialogChangeNuyen } from "@/composables/dialogs";
import {char} from "@/composables/char";
import {toInt} from "@/composables/utils";
import {ref} from "vue";

const nuyen = ref('');
const reason = ref('');

function add()
{
  char.addNuyen(toInt(nuyen.value), reason.value);
  DialogChangeNuyen.hide();
  nuyen.value = '';
}

function spend()
{
  char.spendNuyen(toInt(nuyen.value), reason.value);
  DialogChangeNuyen.hide();
  nuyen.value = '';
}

</script>/

<template>

  <div v-if="DialogChangeNuyen.visible" class="modal-overlay" @click="DialogChangeNuyen.hide">
    <div class="modal-content" @click.stop>

      <h1>Nuyen</h1>
      <div class="row">
        <input v-model="nuyen" type="number" placeholder="Summe" autofocus style="-moz-appearance: textfield">
        <p>¥</p>
      </div>
      <div class="row">
        <input v-model="reason" type="text" placeholder="Grund">
      </div>
      <div class="row">
        <button @click="spend()">Ausgeben</button>
        <button @click="add()">Einnahmen</button>
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
  background-color: var(--background-color);
  width: 90%;
  height: 8vh;
  font-size: 4vh;
  color: var(--accent-color);
  position: relative;
}

.row {
  justify-content: space-evenly;
  gap: 2.5vh;
  position: relative;
}

</style>/