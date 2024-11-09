<script setup lang="ts">
import { computed } from 'vue';
import {DialogSpiritSheet, DialogAddSpirit} from "@/composables/dialogs";
import {char} from "@/composables/char";
import type {Spirit} from "@/composables/spirits";
import {uploadSheet} from "@/composables/fetch";

const spirits = computed(() => char.spirits);

function toggleSelection(item: Spirit): void
{
  if (char.isItemSelected(item))
  {
    char.unselectItem(item);
  }
  else
  {
    char.selectItem(item);
  }

  uploadSheet().then();
}





</script>

<template>

  <div class="column">
    <div v-if="spirits.length">
      <ul>
        <li v-for="(spirit, index) in spirits" :key="index" @click="DialogSpiritSheet.setSpirit(spirit).show()">
          <div class="box ghost">
            <div class="header row">
              <input type="checkbox" class="favourite" @click.stop :checked="char.isItemSelected(spirit)" @change="toggleSelection(spirit)">
              <div  class="header">{{ spirit.caption }}</div>
            </div>
            <div class="info">
              <div class="value">Kraft: {{ spirit.force }}</div>
              <div class="value">Dienste: {{ spirit.services }}</div>
              <div class="value">{{ spirit.bound ? 'Gebunden' : 'Ungebunden' }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <button @click="DialogAddSpirit.show()"><i class='bx bxs-ghost'></i></button>
  </div>

</template>

<style scoped>
  .favourite {
    margin-top: 0;
    width: 3vh;
    height: 3vh;
    margin-right: 2vh;
    align-self: center;
  }

  .header {
    align-content: center;
  }

  .column {
    width: 100%;
  }

  .box {
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
    position: relative;
    background-color: var(--background-color);
    height: 10vh;
    border-radius: 1vh;
    border: 1px solid var(--font-color);
    font-size: 5vh;
    line-height: 5vh;
    color: var(--accent-color);
  }

</style>