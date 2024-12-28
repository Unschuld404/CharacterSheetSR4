<script setup lang="ts">
import { computed } from 'vue';
import {DialogSpiritSheet, DialogAddSpirit} from "@/composables/dialogs";
import {char} from "@/composables/char";

const spirits = computed(() => char.spirits);

</script>

<template>

  <div class="column">
    <div class="transparent-box">
      <div>
        <div class="left-header">Geister <i class='bx bxs-cog' @click="DialogAddSpirit.show()"></i></div>
      </div>
      <ul>
        <li v-for="(spirit, index) in spirits" :key="index" @click="DialogSpiritSheet.setSpirit(spirit).show()" class="item">
          <div class="column">
            <div class="row">
              <div  class="clickable-name">{{ spirit.caption }} ( {{ spirit.force }} )</div>
            </div>
            <div class="row">
              <div>Dienste: {{ spirit.services }}</div>
              <div class="bound">{{ spirit.bound ? 'Gebunden' : 'Ungebunden' }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<style scoped>

.bound {
  position: absolute;
  right: 10px;
}

.column {
  width: 100%;
}

button {
  height: 70px;
  font-size: 42px;
  padding-top: 10px;
  margin-bottom: 10px;
}

</style>