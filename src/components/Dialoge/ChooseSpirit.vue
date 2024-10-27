<script setup lang="ts">

import {DialogChooseSpirit, DialogSummonSpirit} from "@/composables/dialogs";
import {ref} from "vue";

const activeIndex = ref(null);

const choose = (index) => {
  activeIndex.value = index;
  DialogChooseSpirit.hide();
  DialogSummonSpirit.show();
  console.log(activeIndex.value, 'wurde ausgewählt');
}

</script>/

<template>

  <div v-if="DialogChooseSpirit.visible" class="modal-overlay" @click="DialogChooseSpirit.hide">
    <div class="modal-content" @click.stop>

      <div class="column">

        <div  v-for="(item, index) in ['Erdgeist', 'Feuergeist', 'Luftgeist', 'Wassergeist', 'Geist der Menschen', 'Geist der Tiere', 'Watcher']"
              :key="index"
              :class="['flavor', {active: activeIndex === index }]"
              @click="choose(item)"
        >
          {{ item }}

        </div>
      </div>

    </div>
  </div>

</template>

<style scoped>

.modal-overlay {
  z-index: 1000;
}

.modal-content {
  width: 55vh;
  height: 75vh;
  z-index: 1001;
}

.column {
  margin-top: 1vh;
  height: 100%;
  justify-content: space-evenly;
}

.flavor {
  appearance: none;
  text-align: center;
  font-size: 3vw;
  line-height: 7vh;
  background-color: var(--background-color);
  border: none;
  border-radius: 1vh;
  margin-bottom: 2vh;
}

</style>/