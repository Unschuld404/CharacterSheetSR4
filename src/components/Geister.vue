<script setup lang="ts">
import { computed } from 'vue';
import {DialogSpiritSheet, DialogChooseSpirit} from "@/composables/dialogs";
import {char} from "@/composables/data";

const spirits = computed(() => char.spirits);
</script>

<template>

  <div v-if="spirits.length">
    <ul>
      <li v-for="(spirit, index) in spirits" :key="index" @click="DialogSpiritSheet.setType(DialogSpiritSheet.type).show">
        <div class="box spirit-selection">
          <div class="header">{{ spirit.type }}</div>
          <div class="info">
            <div class="value">Kraft: {{ spirit.force }}</div>
            <div class="value">Dienste: {{ spirit.services }}</div>
            <div class="value">{{ spirit.bound ? 'Gebunden' : 'Frei' }}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <button @click="DialogChooseSpirit.show"><i class='bx bxs-ghost'></i></button>

</template>

<style scoped>

  .box {
    height: 15vh;
    padding-top: 2vh;
    padding-left: 4vh;
    padding-right: 4vh;
    margin-bottom: 2vh;
  }

  .info {
    display: flex;
    justify-content: space-between;
  }

  .value {
    width: 30%;
    text-align: center;
    line-height: 6vh;
  }

  button {
    background-color: var(--background-color);
    border-radius: 1vh;
    font-size: 5vh;
    height: 15vh;
    color: var(--accent-color);
    border: 1px solid var(--font-color);
    position: relative;
    top: -2vh;
  }

</style>