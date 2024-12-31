<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogManageEdge, DialogRollDice} from "@/composables/dialogs";
</script>

<template>
  <div class="transparent-box">
    <div class="left-header">Initiative</div>
    <div class="row">
      <div class="special-row">
        <div class="column" @click="DialogRollDice.setValues(
          {
            name: 'Normal',
            value: char.initiative.normal.value,
            values: [
                {name: 'Reaktion', value: char.attributes.reaction.total},
                {name: 'Intuition', value: char.attributes.intuition.total},
                ]
          }
          ).show()">
          <button>{{ char.initiative.normal.value }}
          </button>
          <div>Normal</div>
        </div>
        <div class="column" v-if="char.initiative.matrix.passes==3">
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
          <div>Matrix</div>
        </div>
        <div class="column"  v-else>

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
          <div>Matrix</div>
        </div>
        <div class="column">
          <button @click="DialogRollDice.setValues(
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
        </div>
      </div>
      <div class="blank"></div>
      <div class="column">
        <button @click="DialogManageEdge.show">{{ char.attributes.edge.total }}</button>
        <div>Edge ({{ char.attributes.edge.base }})</div>
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

.special-row {
  display: flex;
  justify-content: space-between;
  gap: 1vh;
  position: relative;
}

</style>