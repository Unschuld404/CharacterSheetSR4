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
    <div class="dialog-box column" @click.stop>
      <div class="upper-header">Edge (max. {{ char.attributes.edge.base }})</div>
      <div class="row">
        <div class="mutator" @click="substract">-</div>
        <strong>{{ char.attributes.edge.total }}</strong>
        <div class="mutator" @click="add">+</div>
      </div>
      <button class="confirm" @click="DialogManageEdge.hide">OK</button>
    </div>
  </div>

</template>

<style scoped>

strong {
  font-size: 12dvw;
}

.row {
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
}

</style>/