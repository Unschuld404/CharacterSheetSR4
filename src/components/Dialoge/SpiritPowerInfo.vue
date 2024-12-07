<script setup lang="ts">
import {DialogSpiritPowerInfo} from "@/composables/dialogs";
</script>/

<template>

  <div class="overlay" @click.self="DialogSpiritPowerInfo.hide">

    <div class="column">

      <div class="modal-content" @click.stop>
        <h1>{{ DialogSpiritPowerInfo.spiritPower.name }}</h1>
        <div class="row">
          <div class="value">Art</div>
          <div class="value">{{ DialogSpiritPowerInfo.spiritPower.type }}</div>
        </div>
        <div class="row">
          <div class="value">Handlung</div>
          <div class="value">{{ DialogSpiritPowerInfo.spiritPower.action }}</div>
        </div>
        <div class="row">
          <div class="value">Reichweite</div>
          <div class="value">{{ DialogSpiritPowerInfo.spiritPower.range }}</div>
        </div>
        <div class="row">
          <div class="value">Dauer</div>
          <div class="value">{{ DialogSpiritPowerInfo.spiritPower.duration }}</div>
        </div>
        <p>{{ DialogSpiritPowerInfo.spiritPower.description }}</p>
      </div>

      <i class='bx bx-chevron-down'></i>

    </div>

  </div>

</template>

<style scoped>

.bx-chevron-down {
  color: var(--accent-color);
  font-weight: bold;
  font-size: 5vh;
  position: absolute;
  top: 80vh;
  align-self: center;
}

.value {
  font-size: 2.5vh;
}

.row{
  justify-content: space-between;
  margin-bottom: 1vh;
  border-bottom: 1px solid var(--background-color);
  line-height: 5vh;
}

p {
  margin-top: 2vh;
  margin-bottom: 2vh;
  font-size: 2.5vh;
  text-transform: none;
}


.modal-content{
  width: 100vw;
  height: 70vh;
  overflow: scroll;
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