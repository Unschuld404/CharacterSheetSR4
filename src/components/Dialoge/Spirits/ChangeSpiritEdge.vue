<script setup lang="ts">
import {DialogManageSpiritEdge, DialogSpiritSheet} from "@/composables/dialogs";
import {char} from "@/composables/char";

function add()
{
  DialogSpiritSheet.spirit.edge++;
}

function substract()
{
  DialogSpiritSheet.spirit.edge--;
}

</script>/

<template>

  <div v-if="DialogManageSpiritEdge.visible" class="overlay" @click="DialogManageSpiritEdge.hide">
    <div class="dialog-box column" @click.stop>

      <h1>Edge</h1>
      <div class="row">
        <div class="mutator" @click="substract">-</div>
        <div class="edge">
          <div>{{DialogSpiritSheet.spirit.edge}}</div>
          <div class="max-edge">/ {{ DialogSpiritSheet.spirit.edgeMax }}</div>
        </div>
        <div class="mutator" @click="add">+</div>
      </div>
      <button class="confirm" @click="DialogManageSpiritEdge.hide">OK</button>

    </div>
  </div>

</template>

<style scoped>

.confirm {
  background-color: transparent;
}

.mutator {
  width: 7vh;
  height: 7vh;
  line-height: 7.5vh;
  font-size: 7vh;
}

.edge {
  display: flex;
  align-items: center;
}

.max-edge {
  font-size: 2vh;
  font-weight: normal;
  margin-left: 1vh;
  padding-top: 3vh;
}

h1 {
  font-weight: normal;
}

.row {
  justify-content: space-around;
  height: 15vh;
  align-items: center;
  font-size: 8vh;
  font-weight: bold;
}

</style>/