<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogManageEdge, DialogRollDice} from "@/composables/dialogs";
</script>

<template>
  <div class="box">
    <strong class="category">Initiative</strong>
    <div class="row">
      <div class="special-row">
        <div class="dice-column"
             @click="DialogRollDice.setValues(
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
        <div class="dice-column" v-if="char.initiative.matrix.passes==3"
             @click="DialogRollDice.setValues(
                  {
                    name: 'Matrix',
                    value: char.initiative.matrix.value,
                    values: [
                        {name: 'Prozessor', value: char.commlink?.response ?? 0},
                        {name: 'Intuition', value: char.attributes.intuition.total},
                        {name: 'Heiße Sim', value: 1},
                        ]
                  }
                  ).show()">
          <button>
            {{ char.initiative.matrix.value }}
          </button>
          <div>Matrix</div>
        </div>
        <div class="dice-column"  v-else>
          <button @click="DialogRollDice.setValues(
                  {
                    name: 'Matrix',
                    value: char.initiative.matrix.value,
                    values: [
                        {name: 'Prozessor', value: char.commlink?.response ?? 0},
                        {name: 'Intuition', value: char.attributes.intuition.total},
                        ]
                  }
                  ).show()">
            {{ char.initiative.matrix.value }}
          </button>
          <div>Matrix</div>
        </div>
        <div class="dice-column"
             @click="DialogRollDice.setValues(
                {
                  name: 'Astral',
                  value: char.initiative.astral.value,
                  values: [
                      {name: '2 x Intuition', value: (char.attributes.intuition.total)*2},
                      ]
                }
                ).show()">
          <button>{{ char.initiative.astral.value }}
          </button>
          <div>Astral</div>
        </div>
      </div>
      <div class="dice-column" @click="DialogManageEdge.show">
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
  padding: 0 1vw;
}

.special-row {
  display: flex;
  justify-content: space-between;
  position: relative;
  gap: 2vw;
}

.box {
  margin: 0.5rem 0;
}

</style>