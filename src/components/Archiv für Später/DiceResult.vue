<script setup lang="ts">
import {DialogDiceResult} from "@/composables/dialogs";
</script>/

<template>

  <div v-if="DialogDiceResult.visible" class="modal-overlay" @click="DialogDiceResult.hide">
    <div class="modal-content" @click.stop>
      <p><strong>4</strong> Erfolge</p>
      <div class="count">Gesamt: 10 Würfel</div>
      <div class="count">Fehlschläge: <strong>2</strong></div>
      <div class="count bodge">Patzer / Kritischer Patzer</div>
      <button class="" @click="DialogDiceResult.hide">Edge verwenden</button>
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