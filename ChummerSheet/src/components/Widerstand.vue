<script setup lang="ts">

import { data, getTotalValueByName } from '@/scripts/Data';

</script>

<template>

  <div class="box">

    <div class="resistances">

      <div class="resistance">
        <div class="resistance-category">Ballist.</div>
        <button v-if="data" class="total-value">{{ data.armori }}</button>
      </div>

      <div class="resistance">
        <div class="resistance-category">Stoß</div>
        <button v-if="data" class="total-value">{{ data.armorb }}</button>
      </div>

      <div class="resistance">
        <div class="resistance-category">Körperl.</div>
        <button v-if="data" class="total-value">{{ getTotalValueByName('BOD') }}</button>
      </div>

      <div class="resistance">
        <div class="resistance-category">Wille</div>
        <button v-if="data" class="total-value">{{ getTotalValueByName('WIL') }}</button>
      </div>

      <div class="resistance">
        <div class="resistance-category">Entzug</div>
        <button v-if="data" class="total-value">{{ +getTotalValueByName('WIL') + +getTotalValueByName('CHA') }}</button>
      </div>

    </div>

    <div class="lower-header">Widerstand</div>

  </div>

</template>

<style scoped>

  .resistances {
    display: flex;
    margin-top: 0.5vh;
  }

  .resistance {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
  }

  .box {
    height: 12vh;
  }

</style>