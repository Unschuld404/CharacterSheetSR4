<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogRollDice} from "@/composables/dialogs";
</script>

<template>
  <div class="transparent-box">
    <div class="upper-header">Initiative</div>
    <div class="row item">
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
        <div>Normal</div>
        <div>Durchgänge: {{char.initiative.normal.passes}}</div>
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
          <div>Matrix</div>
          <div>Durchgänge: {{char.initiative.matrix.passes}}</div>
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
          <div>Astral</div>
          <div>Durchgänge: {{char.initiative.astral.passes}}</div>
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
}

</style>