<script setup lang="ts">
 import {DialogManageEdge} from "@/composables/dialogs";
 import {char} from "@/composables/char";

 function add()
 {
   if (char.attributes.edge.total < char.attributes.edge.base)
   {
     char.attributes.edge.total++;
   }
 }

 function substract() {
   if (char.attributes.edge.total > 0)
   {
     char.attributes.edge.total--;
   }
 }

</script>/

<template>

  <div v-if="DialogManageEdge.visible" class="overlay" @click="DialogManageEdge.hide">
    <div class="popup dialog-box" @click.stop>
      <div class="upper-header">Edge</div>
      <div class="row">
        <div class="mutator" @click="substract">-</div>
        <div class="edge">
          <div>{{ char.attributes.edge.total }}</div>
          <div class="max-edge">/ {{ char.attributes.edge.base }}</div>
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

.row {
  justify-content: space-evenly;
  width: 70vw;
  height: 15vh;
  align-items: center;
  font-size: 8vh;
  font-weight: bold;
}

</style>/