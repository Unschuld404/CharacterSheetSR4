<script setup lang="ts">
import {DialogRollDice} from "@/composables/dialogs";
import {char} from "@/composables/char";
</script>

<template>

  <div class="box">

    <div class="row">

      <div class="column">
        <div class="resistance-category">Ballis.</div>
        <button class="dice" @click="DialogRollDice.setName('Ballistischer Widerstand').setDiceCount(char.armor.ballistic).show()">{{ char.armor.ballistic }}</button>
      </div>

      <div class="column">
        <div class="resistance-category">Stoß</div>
        <button class="dice" @click="DialogRollDice.setName('Stoß Widerstand').setDiceCount(char.armor.impact).show()">{{ char.armor.impact  }}</button>
      </div>

      <div class="column">
        <div class="resistance-category">Körper</div>
        <button class="dice" @click="DialogRollDice.setName('Körper').setDiceCount(char.attributes.body.total).show()">{{ char.attributes.body.total }}</button>
      </div>

      <div class="column">
        <div class="resistance-category">Wille</div>
        <button class="dice" @click="DialogRollDice.setName('Willenskraft').setDiceCount(char.attributes.willpower.total).show()">{{ char.attributes.willpower.total }}</button>
      </div>

      <div class="column">
        <div class="resistance-category">Entzug</div>
        <button class="dice" @click="DialogRollDice.setName('Entzug').setDiceCount(char.drain.total).show()">{{ char.drain.total }}</button>
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