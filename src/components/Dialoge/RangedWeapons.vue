<script setup lang="ts">
import {DialogRangedWeapons} from "@/composables/dialogs";
</script>/

<template>

  <div v-if="DialogRangedWeapons.visible" class="modal-overlay" @click="DialogRangedWeapons.hide">
    <div class="modal-content" @click.stop>

      <div>Hi :)</div>

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