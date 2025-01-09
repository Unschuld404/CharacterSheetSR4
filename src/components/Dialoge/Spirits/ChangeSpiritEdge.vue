<script setup lang="ts">
import {DialogManageEdge, DialogManageSpiritEdge, DialogSpiritSheet} from "@/composables/dialogs";
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
      <div>Edge (max. {{DialogSpiritSheet.spirit.edgeMax }})</div>
      <div class="row">
        <i class='bx bxs-minus-square' @click="substract"></i>
        <strong>{{ DialogSpiritSheet.spirit.edge }}</strong>
        <i class='bx bxs-plus-square' @click="add"></i>
      </div>
      <button @click="DialogManageSpiritEdge.hide">OK</button>
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