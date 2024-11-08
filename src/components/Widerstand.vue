<script setup lang="ts">
import {DialogRollDice} from "@/composables/dialogs";
import {char} from "@/composables/char";
</script>

<template>

  <div class="box">

    <div class="row">

      <div class="column">
        <div class="resistance-category">Ballis.</div>
        <button class="dice" @click="DialogRollDice.setValues(
              {
                name: 'Ballistischer Widerstand',
                value: char.resist.ballistic,
                values: [
                    {name: 'Konstitution', value: char.attributes.body.total},
                    {name: 'Rüstung', value: char.armor.ballistic
                    },
                    ]
              }
              ).show()">{{ char.resist.ballistic }}
        </button>
      </div>

      <div class="column">
        <div class="resistance-category">Stoß</div>
        <button class="dice" @click="DialogRollDice.setValues(
              {
                name: 'Stoßwiderstand',
                value: char.resist.impact,
                values: [
                    {name: 'Konstitution', value: char.attributes.body.total},
                    {name: 'Rüstung', value: char.armor.impact
                    },
                    ]
              }
              ).show()">{{ char.resist.impact }}
        </button>
      </div>

      <div class="column">
        <div class="resistance-category">Physisch</div>
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
      </div>

      <div class="column">
        <div class="resistance-category">Mana</div>
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
      </div>

      <div v-if="char.magician" class="column">
        <div class="resistance-category">Entzug</div>
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