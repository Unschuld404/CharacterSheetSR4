<script setup lang="ts">

import {DialogRollDice, DialogSpiritSheet} from "@/composables/dialogs";
</script>/

<template>

  <div v-if="DialogSpiritSheet.visible" class="modal-overlay" @click="DialogSpiritSheet.hide">
    <div class="modal-content">

      <div class="row">
        <div class="critter-name bob header">Watcher</div>
        <div class="kraft bob total-value" @click="DialogRollDice.show">1</div>
      </div>
      <div class="attributes">Körperliche Attribute</div>
    </div>
  </div>

</template>

<style scoped>

.modal-overlay {
  z-index: 1000;
}

.modal-content {
  height: 80vh;
  width: 80vw;
  z-index: 1001;
}

</style>/