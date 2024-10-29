<script setup lang="ts">
import {char} from "@/composables/data";
import {DialogRollDice} from "@/composables/dialogs";
</script>

<template>

  <div class="box">

    <div class="column">
      <div class="row">Durchgänge</div>
      <div class="row">
        <div class="passes">1</div>
        <div class="passes">1</div>
        <div class="passes">3</div>
      </div>

      <div class="row">

        <div class="column">
          <div class="initiative-category">Normal</div>
          <button class="dice" @click="DialogRollDice.setName('Initiative').setDiceCount(char.initiative.normal.total).show()" >{{ char.initiative.normal.total }}</button>
        </div>

        <div class="column">
          <div class="initiative-category">Matrix</div>
          <button class="dice" @click="DialogRollDice.setName('Matrix Initiative').setDiceCount(char.initiative.matrix.total).show()" >{{ char.initiative.matrix.total }}</button>
        </div>

        <div class="column">
          <div class="initiative-category">Astral</div>
          <button class="dice" @click="DialogRollDice.setName('Astrale Initiative').setDiceCount(char.initiative.astral.total).show()">{{ char.initiative.astral.total }}</button>
        </div>

      </div>
    </div>

    <div class="lower-header">Initiative</div>

  </div>

</template>

<style scoped>

.passes {
  font-weight: bold;
}

.box {
  display: flex;
  width: 100%;
  height: 100%;
}

.row {
  width: 100%;
  margin-bottom: 2vh;
  justify-content: space-around;
}

.column {
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 1vh;
}

button {
  position: relative;
  top: 1vh;
}

</style>