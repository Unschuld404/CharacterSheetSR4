<script setup lang="ts">

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