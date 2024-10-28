<script setup lang="ts">
import RadioButtons from "@/components/RadioButtons.vue";
import {ref} from "vue";

const droneModes = [
  { label: 'Hot', value: 'hot' },
  { label: 'AR', value: 'ar' },
  { label: 'AUTOPILOT', value: 'auto'},
];

const spiritPlanes = [
  { label: 'Materiell', value: 'material' },
  { label: 'Astral', value: 'astral' },
  { label: 'Heimat', value: 'home' },
];
const initialDroneMode = ref('auto');
const selectedDroneMode = ref<string>(initialDroneMode.value);

const selectedSpiritPlane = ref<string>('home');

</script>

<template>
  <div class="frame">

    <RadioButtons class="mode" v-model="selectedDroneMode" :options="droneModes" group="weapons" :selected="initialDroneMode"/><br>

    <RadioButtons class="mode" v-model="selectedSpiritPlane" :options="spiritPlanes" group="planes"/>

  </div>
</template>

<style scoped>


.mode {
  width:270px;
}

.frame {
  margin: 10px;
  width: 100vw;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  color: black;
  font-size: 8vh;
  position: absolute;
  bottom: 40%;
}

</style>