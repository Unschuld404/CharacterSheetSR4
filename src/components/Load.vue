<script setup lang="ts">
import {ref} from "vue";
import {uid} from "@/composables/uid";
import router from "@/router";

const uidInput = ref('');

function setUid(): void {
  if (uidInput.value)
  {
    uid.value = uidInput.value;
    router.push({ name: 'Hub', params: { uid: uidInput.value } });
  }
}

</script>

<template>

  <div class="overlay">
    <div class="popup">
      <h1>Wer bist du, Chummer?</h1>
      <input v-model="uidInput" type="text" @keyup.enter="setUid" autofocus/>
      <button class="confirm" @click="setUid">Weiter</button>
    </div>
  </div>

</template>

<style scoped>

input {
  background-color: transparent;
  border-bottom: 1px solid var(--font-color);
}

</style>