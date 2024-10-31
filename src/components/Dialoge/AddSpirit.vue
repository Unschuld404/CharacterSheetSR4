<script setup lang="ts">

import {DialogAddSpirit} from "@/composables/dialogs";
import {ref} from "vue";
import {char} from "@/composables/data";

const spiritTypes = [
  'Erdgeist',
  'Feuergeist',
  'Luftgeist',
  'Wassergeist',
  'Geist der Menschen',
  'Geist der Tiere',
  'Watcher'
];

const selectedType = ref('Watcher');
const force = ref(10);
const services = ref(1);

force.value = char.attributes.magic.total;

const choose = (type: any) => {
  selectedType.value = type;
  DialogAddSpirit.doChoose = false;
}

function addForce()
{
  force.value++;
}

function substractForce()
{
  if (force.value >= 1) {
    force.value--;
  }
}

function addServices()
{
  services.value++;
}

function substractServices()
{
  if (services.value >= 1)
  {
    services.value--;
  }
}

function addSpirit()
{
  char.addSpirit(selectedType.value ?? 'Spirit', force.value, services.value);
  DialogAddSpirit.hide();
}

</script>

<template>

  <div v-if="DialogAddSpirit.visible" class="modal-overlay" @click="DialogAddSpirit.hide()">



    <div v-if="DialogAddSpirit.doChoose" class="modal-content-choose" @click.stop>
      <div class="column-choose">
        <div  v-for="(item, index) in spiritTypes"
              :key="index"
              :class="['type', {active: selectedType === item }]"
              @click="choose(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>


    <div v-if="!DialogAddSpirit.doChoose" class="modal-content" @click.stop>
      <h1>{{ selectedType ?? 'Spirit' }}</h1>

      <div class="column">
        <div class="row">
          <div class="force">Kraft</div>
          <div class="mutator" @click="substractForce">-</div>
          <div class="value">{{ force }}</div>
          <div class="mutator" @click="addForce">+</div>
        </div>

        <div class="row">
          <div class="services">Dienste</div>
          <div class="mutator" @click="substractServices">-</div>
          <div class="value">{{ services }}</div>
          <div class="mutator" @click="addServices">+</div>
        </div>

      </div>

      <button class="confirm" @click="addSpirit()">Hinzufügen</button>
    </div>
  </div>
</template>

<style scoped>

.modal-content-choose {
  width: 55vh;
  height: 75vh;
  z-index: 1001;
}

.modal-content {
  width: 50vh;
  height: 45vh;
  z-index: 1001;
}

.modal-overlay {
  z-index: 1000;
}

.column-choose {
  margin-top: 1vh;
  height: 100%;
  justify-content: space-evenly;
}

.column {
  height: 30vh;
  justify-content: space-around;
}

.row {
  height: 8vh;
  line-height: 8vh;
  font-size: 4vh;
  align-items: center;
  gap: 2vh;
}

i {
  font-size: 6vh;
  width: 10vh;
  text-align: center;
}

.value {
  width: 10vh;
  text-align: center;
  font-weight: bold;
}

.force, .services {
  width: 20vh;
}

.type {
  appearance: none;
  text-align: center;
  font-size: 3vw;
  color: var(--accent-color);
  line-height: 7vh;
  background-color: var(--background-color);
  border: none;
  border-radius: 1vh;
  margin-bottom: 2vh;
}

</style>