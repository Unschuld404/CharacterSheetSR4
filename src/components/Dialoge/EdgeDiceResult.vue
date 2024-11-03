<script setup lang="ts">
import {DialogEdgeDiceResult} from "@/composables/dialogs";
</script>/

<template>

  <div v-if="DialogEdgeDiceResult.visible" class="modal-overlay" @click="DialogEdgeDiceResult.hide">
    <div class="modal-content" @click.stop>
      <p><strong>2</strong> Explosionen</p>
      <p>4 Erfolge</p>
      <div class="count">Gesamt: 10 Würfel</div>
      <button class="" @click="DialogEdgeDiceResult.hide">Würfel explodieren</button>
    </div>
  </div>

</template>

<style scoped>

p {
  font-size: 4vh;
}

strong {
  font-size: 5vh;
}

.count {
  margin-bottom: 2vh;
}

.bodge {
  color: var(--accent-color);
}

button {
  background-color: var(--background-color);
  border-radius: 1vh;
  font-size: 3vh;
  font-weight: bold;
  color: var(--accent-color);
  padding: 2vh;
  width: 100%;
  border: none;
}

.modal-overlay {
  z-index: 4000;
}

.modal-content{
  width: 50vh;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 4001;
  font-size: 3vh;
}

</style>/