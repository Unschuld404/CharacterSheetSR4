<script setup lang="ts">
import RadioButtons from "@/components/RadioButtons.vue";
import {ref, watch} from "vue";

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

const selectedDroneMode = ref<string>('auto');
const selectedSpiritPlane = ref<string>('home');

function onSelectDroneMode(newMode: string) {
  console.log(newMode)
}

function onSelectPlane(newPlane: string) {
  console.log(newPlane)
}

watch(selectedDroneMode, (newMode) => {
  onSelectDroneMode(newMode);
});


</script>

<template>
  <div class="frame">

    <div style="display: flex; flex-direction: column; height: 200px; justify-content: space-evenly;">

      <div style="text-align: center">Values: {{ selectedDroneMode }}   |   {{selectedSpiritPlane}}</div>

      <RadioButtons  class="mode" v-model="selectedDroneMode" :options="droneModes" group="weapons"/>

      <RadioButtons @update:modelValue="onSelectPlane" class="mode" v-model="selectedSpiritPlane" :options="spiritPlanes" group="planes"/>
    </div>

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