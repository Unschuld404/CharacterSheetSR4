<script setup lang="ts">
import {DialogRollDice} from "@/composables/dialogs";
import {char} from "@/composables/char";
</script>

<template>

  <div class="box">

    <div class="row">

      <div class="column">
        <div class="resistance-category">Ballis.</div>
        <button class="dice" @click="DialogRollDice.setName('Ballistischer Widerstand').setDiceCount(char.resist.ballistic).show()">{{ char.resist.ballistic }}</button>
      </div>

      <div class="column">
        <div class="resistance-category">Stoß</div>
        <button class="dice" @click="DialogRollDice.setName('Stoß Widerstand').setDiceCount(char.resist.impact ).show()">{{ char.resist.impact  }}</button>
      </div>

      <div class="column">
        <div class="resistance-category">Physisch</div>
        <button class="dice" @click="DialogRollDice.setName('Widerstand gegen physischen Zauber').setDiceCount(char.resist.physical).show()">{{ char.resist.physical }}</button>
      </div>

      <div class="column">
        <div class="resistance-category">Mana</div>
        <button class="dice" @click="DialogRollDice.setName('Widerstand gegen Manazauber').setDiceCount(char.resist.mana).show()">{{ char.resist.mana  }}</button>
      </div>

      <div v-if="char.magician" class="column">
        <div class="resistance-category">Entzug</div>
        <button class="dice" @click="DialogRollDice.setName('Widerstand gegen magischen Entzug').setDiceCount(char.resist.drain).show()">{{  char.resist.drain }}</button>
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