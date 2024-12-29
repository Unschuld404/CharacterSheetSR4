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
  reason.value = '';
}

function spend()
{
  char.spendNuyen(toInt(nuyen.value), reason.value);
  DialogChangeNuyen.hide();
  nuyen.value = '';
  reason.value = '';
}

</script>/

<template>

  <div v-if="DialogChangeNuyen.visible" class="overlay" @click="DialogChangeNuyen.hide">
    <div class="popup dialog-box" @click.stop>
      <div class="upper-header">Nuyen</div>
        <input v-model="nuyen" type="number" placeholder="Summe ¥" autofocus style="-moz-appearance: textfield">
        <input v-model="reason" type="text" placeholder="Grund">
      <div class="row">
        <button class="confirm" @click="spend()">Ausgeben</button>
        <button class="confirm" @click="add()">Einnahmen</button>
      </div>

    </div>
  </div>

</template>

<style scoped>

.row {
  width: 100%;
  justify-content: space-between;
}

.confirm {
  width: 50%;
}


</style>/