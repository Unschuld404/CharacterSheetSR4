<script setup lang="ts">
import {DialogRollDice} from "@/composables/dialogs";
import {char} from "@/composables/char";
</script>

<template>
  <div class="transparent-box">
    <div class="left-header">Widerstand</div>
    <div class="row">
      <div class="column" @click="DialogRollDice.setValues(
        {
          name: 'Ballistischer Widerstand',
          value: char.resist.ballistic,
          values: [
              {name: 'Konstitution', value: char.attributes.body.total},
              {name: 'Rüstung', value: char.armorValues.ballistic
              },
              ]
        }
        ).show()">
        <button>{{ char.resist.ballistic }}
        </button>
        <div class="resistance-category">Ballistisch</div>
      </div>
      <div class="column" @click="DialogRollDice.setValues(
        {
          name: 'Stoßwiderstand',
          value: char.resist.impact,
          values: [
              {name: 'Konstitution', value: char.attributes.body.total},
              {name: 'Rüstung', value: char.armorValues.impact
              },
              ]
        }
        ).show()">
        <button>{{ char.resist.impact }}
        </button>
        <div class="resistance-category">Stoß</div>
      </div>
      <div class="column" @click="DialogRollDice.setValues(
        {
          name: 'Physischer Widerstand',
          value: char.resist.physical,
          values: [
              {name: 'Konstitution', value: char.attributes.body.total},
              ]
        }
        ).show()">
        <button>{{ char.resist.physical }}
        </button>
        <div class="resistance-category">Physisch</div>
      </div>
      <div class="column" @click="DialogRollDice.setValues(
        {
          name: 'Manawiderstand',
          value: char.resist.mana,
          values: [
              {name: 'Willenskraft', value: char.attributes.willpower.total},
              ]
        }
        ).show()">
        <button>{{ char.resist.mana }}
        </button>
        <div class="resistance-category">Mana</div>
      </div>
      <div class="column" @click="DialogRollDice.setValues(
        {
          name: 'Widerstand gegen magischen Entzug',
          value: char.resist.drain,
          values: [
              {name: 'Traditionsattribut', value: char.resist.drain - char.attributes.willpower.total},
              {name: 'WIL', value: char.attributes.willpower.total},
              ]
        }
        ).show()">
        <button>{{ char.resist.drain }}
        </button>
        <div class="resistance-category">Entzug</div>
      </div>
    </div>
  </div>

</template>

<style scoped>

button {
  padding-bottom: 1dvw;
}

.row {
  padding-left: 2dvw;
  padding-right: 2dvw;
  justify-content: space-between;
  gap: 1vh;
}

.column {
  width: 18dvw;
  align-items: center;
  background-color: var(--primary-color);
  border-radius: 2dvw;
  padding-top: 4dvw;
  padding-bottom: 4dvw;
  font-size: 4dvw;
}

</style>