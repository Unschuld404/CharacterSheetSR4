<script setup lang="ts">
import {DialogSpiritPowerInfo} from "@/composables/dialogs";
</script>/

<template>

  <div class="overlay" @click.self="DialogSpiritPowerInfo.hide">

    <div class="column">

      <div class="dialog-box" @click.stop>
        <h1>{{ DialogSpiritPowerInfo.spiritPower.name }}</h1>
        <div class="item">
          <div>Art</div>
          <div>{{ DialogSpiritPowerInfo.spiritPower.type }}</div>
        </div>
        <div class="item">
          <div>Handlung</div>
          <div>{{ DialogSpiritPowerInfo.spiritPower.action }}</div>
        </div>
        <div class="item">
          <div>Reichweite</div>
          <div>{{ DialogSpiritPowerInfo.spiritPower.range }}</div>
        </div>
        <div class="item">
          <div>Dauer</div>
          <div>{{ DialogSpiritPowerInfo.spiritPower.duration }}</div>
        </div>
        <p>{{ DialogSpiritPowerInfo.spiritPower.description }}</p>
      </div>

    </div>

  </div>

</template>

<style scoped>

p {
  text-transform: none;
  margin-top: 2dvh;
}

.overlay {
  z-index: 6000;
}

.dialog-box {
  width: 90dvw;
  max-height: 70vh;
  overflow: scroll;
  padding: 2dvw;
}

</style>/