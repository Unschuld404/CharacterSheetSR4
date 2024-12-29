<script setup lang="ts">
import {char} from "@/composables/char";
import {toInt} from "@/composables/utils";
import {ref} from "vue";
import {DialogChangeKarma} from "@/composables/dialogs";

const karma = ref('');
const reason = ref('');

function add()
{
  char.addKarma(toInt(karma.value), reason.value);
  DialogChangeKarma.hide();
  karma.value = '';
}

</script>/

<template>

  <div v-if="DialogChangeKarma.visible" class="overlay" @click="DialogChangeKarma.hide">
    <div class="dialog-box column" @click.stop>
      <div class="upper-header">Karma</div>
      <input v-model="karma" type="number" placeholder="Summe" autofocus>
      <input v-model="reason" type="text" placeholder="Grund">
      <button class="confirm" @click="add()">Bestätigen</button>
    </div>
  </div>

</template>

<style scoped>
.column {

  align-items: center;
}

</style>/