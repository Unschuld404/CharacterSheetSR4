<script setup lang="ts">

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

function confirm(): void
{
  emit('confirm');
}

function cancel(): void
{
  emit('cancel');
}

</script>/

<template>

  <div class="overlay" @click.self="cancel()">
    <div class="modal-content" @click.stop>
      <h1>Geist entfernen</h1>
      <p>Löst diesen Geist von dir.</p>
      <p>Alle noch vorhandenen Dienste verschwinden und der Geist wird aus deiner Liste entfernt.</p>
      <button class="confirm" @click="confirm()">Verbindung trennen</button>
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


.modal-content{
  width: 50vh;
  height: 25vh;
  z-index: 6001;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6000;
}

</style>/