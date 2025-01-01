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
      <div>Edge (max. {{ char.attributes.edge.base }})</div>
      <div class="row">
        <i class='bx bxs-minus-square' @click="substract"></i>
        <strong>{{ char.attributes.edge.total }}</strong>
        <i class='bx bxs-plus-square' @click="add"></i>
      </div>
      <button @click="DialogManageEdge.hide">OK</button>
    </div>
  </div>

</template>

<style scoped>

i {
  color: var(--accent-color);
}

strong {
  margin: 2rem;
  width: 1rem;
}

.row {
  font-size: 2rem;
  align-items: center;
  justify-content: space-evenly;
}

</style>/