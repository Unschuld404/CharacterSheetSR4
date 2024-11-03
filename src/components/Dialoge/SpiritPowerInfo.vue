<script setup lang="ts">
import {DialogSpiritPowerInfo} from "@/composables/dialogs";
</script>/

<template>

  <div class="overlay" @click.self="DialogSpiritPowerInfo.hide">
    <div class="modal-content" @click.stop>
      <h1>{{ DialogSpiritPowerInfo.spiritPower.name }}</h1>
      <div class="row">
        <div class="value">Art</div>
        <div class="value">Handlung</div>
        <div class="value">Reichweite</div>
        <div class="value">Dauer</div>
      </div>
      <div class="row">
        <div class="value">{{ DialogSpiritPowerInfo.spiritPower.type }}</div>
        <div class="value">{{ DialogSpiritPowerInfo.spiritPower.action }}</div>
        <div class="value">{{ DialogSpiritPowerInfo.spiritPower.range }}</div>
        <div class="value">{{ DialogSpiritPowerInfo.spiritPower.duration }}</div>
      </div>
      <p>{{ DialogSpiritPowerInfo.spiritPower.description }}</p>
    </div>
  </div>

</template>

<style scoped>

h1 {
  margin-bottom: 2vh;
}

.value {
  width: 25%;
  text-align: center;
  font-size: 2.5vh;
}

.row{
  justify-content: space-between;
  margin-bottom: 1vh;
  border-bottom: 1px solid var(--background-color);
  line-height: 5vh;
}

.row:last-of-type{
  border: none;
}

p {
  margin-top: 2vh;
  margin-bottom: 2vh;
  font-size: 2.5vh;
  text-transform: none;
}


.modal-content{
  width: 100vh;
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