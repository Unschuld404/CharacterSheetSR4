<script setup lang="ts">
import { computed } from 'vue';
import {getSpirits} from "@/composables/data";
import {DialogSpiritSheet, DialogChooseSpirit} from "@/composables/dialogs";

const spirits = computed(() => getSpirits());
</script>

<template>

  <div v-if="spirits.length">
    <ul>
      <li v-for="(spirit, index) in spirits" :key="index" @click="DialogSpiritSheet.show">
        <div class="box">
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
    margin-bottom: 1vh;
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
    background-color: var(--accent-color);
    border: none;
    border-radius: 1vh;
    font-size: 5vh;
    height: 10vh;
    color: var(--background-color);
  }

  i {
    color: var(--background-color);
    padding-top: 1vh;
  }

</style>