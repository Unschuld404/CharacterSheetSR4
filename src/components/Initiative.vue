<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogManageEdge, DialogRollDice} from "@/composables/dialogs";
</script>

<template>
  <div class="transparent-box">
    <div>Initiative</div>
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
      <div class="column" @click="DialogManageEdge.show">
        <button>{{ char.attributes.edge.total }}</button>
        <div>Edge ({{ char.attributes.edge.base }})</div>
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
}

.column {
  align-items: center;
  background-color: var(--primary-color);
  border-radius: 0.3rem;
  width: 18vw;
  padding: 0.5rem 0;
}

.special-row {
  display: flex;
  justify-content: space-between;
  position: relative;
  gap: 2vw;
}

.transparent-box {
  margin: 0.5rem 1vw;
}

</style>