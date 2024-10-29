<script setup lang="ts">
import {DialogReleaseSpirit, DialogSpiritSheet} from "@/composables/dialogs";

</script>/

<template>

  <div v-if="DialogReleaseSpirit.visible" class="modal-overlay" @click="DialogReleaseSpirit.hide">
    <div class="modal-content" @click.stop>

      <h1>Geist entfernen</h1>
      <p>Löst diesen Geist von dir. Alle noch vorhandenen Dienste verschwinden und der Geist wird aus deiner Liste entfernt.</p>
      <button class="confirm" @click="DialogReleaseSpirit.hide(), DialogSpiritSheet.hide()">Verbindung trennen</button>

    </div>
  </div>

</template>

<style scoped>

h1 {
  margin-bottom: 2vh;
}

p {
  text-align: center;
}

.modal-overlay {
  z-index: 3000;
}

.modal-content{
  width: 45vh;
  height: 28vh;
  z-index: 3001;
}

</style>/