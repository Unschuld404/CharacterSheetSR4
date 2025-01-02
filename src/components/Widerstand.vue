<script setup lang="ts">
import {DialogRollDice} from "@/composables/dialogs";
import {char} from "@/composables/char";
</script>

<template>
  <div class="box">
    <strong class="category">Widerstand</strong>
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
        <div>Ballist.</div>
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
        <div>Stoß</div>
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
        <div>Physisch</div>
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
        <div>Mana</div>
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
        <div>Entzug</div>
      </div>
    </div>
  </div>

</template>

<style scoped>

button {
  margin-bottom: 0.5rem;
}

.row {
  justify-content: space-between;
  padding: 0 1vw;
}

.column {
  align-items: center;
  background-color: var(--primary-color);
  border-radius: 0.5rem;
  width: 18vw;
  padding: 0.5rem 0;
}

.box {
  margin: 0.5rem 0;
}

</style>