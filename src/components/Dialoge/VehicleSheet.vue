<script setup lang="ts">

import {DialogDroneSheet} from "@/composables/dialogs";
</script>/

<template>

  <div v-if="DialogDroneSheet.visible" class="modal-overlay" @click="DialogDroneSheet.hide">
    <div class="modal-content" @click.stop>

      <button @click="DialogDroneSheet.hide">OK</button>

    </div>
  </div>

</template>

<style scoped>

.modal-overlay {
  z-index: 1000;
}

.modal-content {
  z-index: 1001;
}



</style>/