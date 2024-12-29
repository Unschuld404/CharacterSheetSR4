<script setup lang="ts">
import {DialogRollDice} from "@/composables/dialogs";
import {char} from "@/composables/char";
</script>

<template>
  <div class="transparent-box">
    <div class="upper-header">Widerstand</div>
    <div class="row item">
      <div class="column">
        <button class="dice" @click="DialogRollDice.setValues(
          {
            name: 'Ballistischer Widerstand',
            value: char.resist.ballistic,
            values: [
                {name: 'Konstitution', value: char.attributes.body.total},
                {name: 'Rüstung', value: char.armorValues.ballistic
                },
                ]
          }
          ).show()">{{ char.resist.ballistic }}
        </button>
        <div class="resistance-category">Ballis.</div>
      </div>
      <div class="column">
        <button class="dice" @click="DialogRollDice.setValues(
          {
            name: 'Stoßwiderstand',
            value: char.resist.impact,
            values: [
                {name: 'Konstitution', value: char.attributes.body.total},
                {name: 'Rüstung', value: char.armorValues.impact
                },
                ]
          }
          ).show()">{{ char.resist.impact }}
        </button>
        <div class="resistance-category">Stoß</div>
      </div>
    </div>
    <div class="row item">
      <div class="column">
        <button class="dice" @click="DialogRollDice.setValues(
          {
            name: 'Physischer Widerstand',
            value: char.resist.physical,
            values: [
                {name: 'Konstitution', value: char.attributes.body.total},
                ]
          }
          ).show()">{{ char.resist.physical }}
        </button>
        <div class="resistance-category">Physisch</div>
      </div>
      <div class="column">
        <button class="dice" @click="DialogRollDice.setValues(
          {
            name: 'Manawiderstand',
            value: char.resist.mana,
            values: [
                {name: 'Willenskraft', value: char.attributes.willpower.total},
                ]
          }
          ).show()">{{ char.resist.mana }}
        </button>
        <div class="resistance-category">Mana</div>
      </div>
    </div>
    <div class="row item" v-if="char.magician">
      <div v-if="char.magician" class="column">
        <button class="dice" @click="DialogRollDice.setValues(
          {
            name: 'Widerstand gegen magischen Entzug',
            value: char.resist.drain,
            values: [
                {name: 'Traditionsattribut', value: char.resist.drain - char.attributes.willpower.total},
                {name: 'WIL', value: char.attributes.willpower.total},
                ]
          }
          ).show()">{{ char.resist.drain }}
        </button>
        <div class="resistance-category">Entzug</div>
      </div>
    </div>
  </div>

</template>

<style scoped>

button {
  position: relative;
  margin-top: 1vh;
  margin-bottom: 1vh;
}

.column {
  align-items: center;
  width: 30dvw;
}

</style>