<script setup lang="ts">
import {data, getAttributeValueByName} from "@/composables/data";
import {DialogRollDice} from "@/composables/dialogs";
import {char} from "@/composables/data";
</script>

<template>

  <div class="box">

    <div class="row">

      <div class="column">
        <div class="resistance-category">Ballis.</div>
        <button class="total-value" @click="DialogRollDice.show()">{{ data?.armori ?? 0 }}</button>
      </div>

      <div class="column">
        <div class="resistance-category">Stoß</div>
        <button class="total-value" @click="DialogRollDice.show()">{{ data?.armorb ?? 0  }}</button>
      </div>

      <div class="column">
        <div class="resistance-category">Körper</div>
        <button class="total-value" @click="DialogRollDice.show()">{{ char.attributes.body.total }}</button>
      </div>

      <div class="column">
        <div class="resistance-category">Wille</div>
        <button class="total-value" @click="DialogRollDice.show()">{{ char.attributes.willpower.total }}</button>
      </div>

      <div class="column">
        <div class="resistance-category">Entzug</div>
        <button class="total-value" @click="DialogRollDice.show()">{{ +getAttributeValueByName('WIL') + +getAttributeValueByName('CHA') }}</button>
      </div>

    </div>

    <div class="lower-header">Widerstand</div>

  </div>

</template>

<style scoped>

  .box {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .row {
    width: 100%;
    margin-bottom: 2vh;
  }

  .column {
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  button {
    position: relative;
    top: 1vh;
  }

</style>