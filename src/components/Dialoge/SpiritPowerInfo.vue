<script setup lang="ts">
import {DialogSpiritPowerInfo} from "@/composables/dialogs";
</script>/

<template>

  <div class="overlay" @click.self="DialogSpiritPowerInfo.hide">
    <div class="modal-content" @click.stop>
      <h1>{{ DialogSpiritPowerInfo.spiritPower.name }}</h1>
      <p>Löst diesen Geist von dir.</p>
      <p>Alle noch vorhandenen Dienste verschwinden und der Geist wird aus deiner Liste entfernt.</p>
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