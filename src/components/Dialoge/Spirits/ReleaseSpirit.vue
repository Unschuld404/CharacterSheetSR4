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
    <div class="dialog-box" @click.stop>
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

.confirm {
  width: 100%;
  background-color: transparent;
  margin-top: 1rem;
}

.dialog-box {
  padding-top: 2vh;
  width: 90dvw;
}

.overlay {
  z-index: 3000;
}

</style>/