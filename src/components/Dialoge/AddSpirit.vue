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

const showList = ref(true);
const selectedType = ref(null);
const force = ref(10);
const services = ref(1);

force.value = char.attributes.magic.total;

const choose = (type: any) => {
  selectedType.value = type;
  showList.value = false;
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
  showList.value = true;
}

</script>

<template>

  <div v-if="DialogAddSpirit.visible" class="modal-overlay" @click="DialogAddSpirit.hide()">
    <div class="modal-content" @click.stop>

      <template v-if="showList">
        <div class="column">
          <div  v-for="(item, index) in spiritTypes"
                :key="index"
                :class="['type', {active: selectedType === index }]"
                @click="choose(item)"
          >
            {{ item }}
          </div>
        </div>
      </template>

      <template v-if="!showList">
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
      </template>

    </div>
  </div>


</template>

<style scoped>

</style>