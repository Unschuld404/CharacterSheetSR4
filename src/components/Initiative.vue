<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogRollDice} from "@/composables/dialogs";
</script>

<template>

  <div class="box">

    <div class="column">

      <div class="row">

        <div class="column">
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
          <div class="initiative-category">Normal</div>
        </div>

        <div class="column">

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
          <div class="initiative-category">Matrix</div>

        </div>

        <div class="column" v-if="char.magician">
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
          <div class="initiative-category">Astral</div>
        </div>

      </div>

      <div class="row">
        <strong>{{ char.initiative.normal.passes }}</strong>
        <strong>{{ char.initiative.matrix.passes }}</strong>
        <strong v-if="char.magician">{{ char.initiative.astral.passes }}</strong>
      </div>
      <div class="row">Durchgänge</div>

    </div>

    <div class="upper-header">Initiative</div>

  </div>

</template>

<style scoped>

.box {
  display: flex;
  width: 100%;
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
  margin-top: 1vh;
  margin-bottom: 1vh;
}

</style>