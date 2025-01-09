<script setup lang="ts">
import { computed } from 'vue';
import {DialogSpiritSheet, DialogAddSpirit} from "@/composables/dialogs";
import {char} from "@/composables/char";

const spirits = computed(() => char.spirits);

</script>

<template>
  <div class="box">
    <div>
      <strong class="category">Geister <i class='bx bxs-cog' @click="DialogAddSpirit.show()"></i></strong>
    </div>
    <ul>
      <li v-for="(spirit, index) in spirits" :key="index" @click="DialogSpiritSheet.setSpirit(spirit).show()" class="item">
        <div class="column">
          <div  class="clickable">{{ spirit.caption }} ( {{ spirit.force }} )</div>
          <div class="row">
            <div>Dienste: {{ spirit.services }}</div>
            <div>{{ spirit.bound ? 'Gebunden' : 'Ungebunden' }}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.column {
  width: 100%;
}

.row {
  justify-content: space-between;
}

.box {
  padding-top: 1rem;
}

.item:last-child {
  border-bottom: none;
}

</style>