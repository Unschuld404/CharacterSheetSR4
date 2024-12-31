<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogManageEdge} from "@/composables/dialogs";

</script>

<template>
  <div class="transparent-box">
    <div class="left-header">Edge</div>
    <div class="row">
      <div class="column">
        <button @click="DialogManageEdge.show">{{ char.attributes.edge.total }}</button>
        <div>max. {{ char.attributes.edge.base }}</div>
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
    justify-content: space-between;
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

</style>