<script setup lang="ts">

import {DialogSummonSpirit} from "@/composables/dialogs";
import {char} from "@/composables/data";
import {ref} from "vue";

let force = ref(char.attributes.magic.total);

let services = ref(1);

function addForce()
{
  force.value = force.value + 1;
  console.log(force.value);
}

function substractForce()
{
  force.value = force.value - 1;
  console.log(force.value);
}

function addServices()
{
  services.value = services.value + 1;
  console.log(services.value);
}

function substractServices()
{
  services.value = services.value - 1;
  console.log(services.value);
}


</script>/

<template>

  <div v-if="DialogSummonSpirit.visible" class="modal-overlay" @click="DialogSummonSpirit.hide">
    <div class="modal-content" @click.stop>

      <h1>{{ DialogSummonSpirit.type }}</h1>

      <div class="column">
        <div class="row">
          <div class="force">Kraft</div>
          <i class='bx bxs-minus-square icon' @click="substractForce"></i>
          <div class="value">{{ force }}</div>
          <i class='bx bxs-plus-square icon' @click="addForce"></i>
        </div>

        <div class="row">
          <div class="services">Dienste</div>
          <i class='bx bxs-minus-square icon' @click="substractServices"></i>
          <div class="value">{{ services }}</div>
          <i class='bx bxs-plus-square icon' @click="addServices"></i>
        </div>

      </div>

      <button class="confirm" @click="DialogSummonSpirit.hide">Hinzufügen</button>

    </div>
  </div>

</template>

<style scoped>

.modal-overlay {
  z-index: 1000;
}

.modal-content {
  width: 50vh;
  height: 45vh;
  z-index: 1001;
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

</style>/