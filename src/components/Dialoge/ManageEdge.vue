<script setup lang="ts">
 import {DialogManageEdge} from "@/composables/dialogs";
 import {char} from "@/composables/data";

 function add()
 {
   char.edge = char.edge + 1;
 }

 function substract()
 {
   char.edge = char.edge - 1;
 }

</script>/

<template>

  <div v-if="DialogManageEdge.visible" class="modal-overlay" @click="DialogManageEdge.hide">
    <div class="modal-content" @click.stop>

      <h1>Edge</h1>
      <div class="row">
        <div class="mutator" @click="substract">-</div>
        <div class="edge">
          <div>{{ char.edge }}</div>
          <div class="max-edge">/ 3</div>
        </div>
        <div class="mutator" @click="add">+</div>
      </div>
      <button class="confirm" @click="DialogManageEdge.hide">OK</button>

    </div>
  </div>

</template>

<style scoped>

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

.modal-overlay {
  z-index: 3000;
}

.modal-content{
  width: 40vh;
  height: 30vh;
  z-index: 3001;
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