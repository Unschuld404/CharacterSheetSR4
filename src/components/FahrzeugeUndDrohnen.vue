<script setup lang="ts">
import { computed } from 'vue';
import { data, getVehicles } from '@/scripts/Data';

// Computed Property, das sich automatisch aktualisiert, wenn data sich ändert
const vehicles = computed(() => {
  return data.value ? getVehicles() : [];
});
</script>

<template>

  <ul>
    <li v-for="vehicle in vehicles" :key="vehicle.name">
      <div class="box">
        <div v-if="data" class="header">{{ vehicle.name }}</div>
        <div class="info">
          <div v-if="data" class="value">Handling: <strong>{{ vehicle.handling }}</strong></div>
          <div v-if="data" class="value">Beschl.: <strong>{{ vehicle.accel }}</strong></div>
          <div v-if="data" class="value">Geschw.: <strong>{{ vehicle.speed }}</strong></div>
          <div v-if="data" class="value">Pilot: <strong>{{ vehicle.pilot }}</strong></div>
          <div v-if="data" class="value">Rumpf: <strong>{{ vehicle.body }}</strong></div>
        <div v-if="data" class="value">Panzerung: <strong>{{ vehicle.armor }}</strong></div>
          <div v-if="data" class="value">Sensor: <strong>{{ vehicle.sensor }}</strong></div>
        </div>
      </div>
    </li>
  </ul>

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
    width: 15%;
    text-align: center;
    line-height: 6vh;
    font-size: 2vh;
  }

</style>/