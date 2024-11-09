<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogRollDice} from "@/composables/dialogs";
</script>

<template>

  <div class="box">

    <div class="column">

      <div class="row">

        <div class="column">
          <div class="initiative-category">Normal</div>
          <button class="dice" @click="DialogRollDice.setValues(
              {
                name: 'Normal',
                value: char.initiative.normal.value,
                values: [
                    {name: 'Reaktion', value: char.attributes.reaction.total},
                    {name: 'Intuition', value: char.attributes.intuition.total},
                    ]
              }
              ).show()">{{ char.initiative.normal.value }}
          </button>
        </div>

        <div class="column">
          <div class="initiative-category">Matrix</div>

          <template v-if="char.initiative.matrix.passes==3">
            <button class="dice" @click="DialogRollDice.setValues(
              {
                name: 'Matrix',
                value: char.initiative.matrix.value,
                values: [
                    {name: 'Prozessor', value: char.commlink?.response ?? 0},
                    {name: 'Intuition', value: char.attributes.intuition.total},
                    {name: 'Heiße Sim', value: 1},
                    ]
              }
              ).show()">{{ char.initiative.matrix.value }}
            </button>
          </template>
          <template v-else>
            <button class="dice" @click="DialogRollDice.setValues(
              {
                name: 'Matrix',
                value: char.initiative.matrix.value,
                values: [
                    {name: 'Prozessor', value: char.commlink?.response ?? 0},
                    {name: 'Intuition', value: char.attributes.intuition.total},
                    ]
              }
              ).show()">{{ char.initiative.matrix.value }}
            </button>
          </template>

        </div>

        <div class="column" v-if="char.magician">
          <div class="initiative-category">Astral</div>
          <button class="dice" @click="DialogRollDice.setValues(
              {
                name: 'Astral',
                value: char.initiative.astral.value,
                values: [
                    {name: '2 x Intuition', value: (char.attributes.intuition.total)*2},
                    ]
              }
              ).show()">{{ char.initiative.astral.value }}
          </button>
        </div>

      </div>

      <div class="row">Durchgänge</div>
      <div class="row">
        <div class="passes">{{ char.initiative.normal.passes }}</div>
        <div class="passes">{{ char.initiative.matrix.passes }}</div>
        <div v-if="char.magician" class="passes">{{ char.initiative.astral.passes }}</div>
      </div>

    </div>

    <div class="lower-header">Initiative</div>

  </div>

</template>

<style scoped>

.passes {
  font-weight: bold;
  font-size: 3vh;
}

.box {
  display: flex;
  width: 100%;
  height: 100%;
}

.row {
  width: 100%;
  margin-bottom: 1vh;
  justify-content: space-around;
}

.column {
  flex: 1;
  align-items: center;
  justify-content: center;
}

button {
  position: relative;
}

</style>