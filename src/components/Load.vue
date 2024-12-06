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

  <div class="modal-overlay">
    <div class="modal-content">

      <h1>Wer bist du, Chummer?</h1>
      <input v-model="uidInput" type="text" @keyup.enter="setUid" autofocus/>
      <button @click="setUid">Weiter</button>

    </div>
  </div>

</template>

<style scoped>

.modal-content {
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-overlay {
  background-color: var(--background-color);
}

input {
  text-transform: none;
  width: 90%;
  margin-top: 2vh;
}

button {
  margin-top: 2vh;
  border: none;
  width: 50%;
  height: 5vh;
  font-size: 4vh;
  font-weight: bold;
}

</style>