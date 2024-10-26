<script setup lang="ts">
import { computed } from 'vue';
import {getVehicles} from "@/composables/data";


// Computed Property, das sich automatisch aktualisiert, wenn data sich ändert
const vehicles = computed(() => getVehicles());
</script>

<template>

  <ul>
    <li v-for="vehicle in vehicles" :key="vehicle.name">
      <div class="box">
        <div class="header">{{ vehicle.name }}</div>
        <div class="info">
          <div class="value">Handling: <strong>{{ vehicle.handling }}</strong></div>
          <div class="value">Beschl.: <strong>{{ vehicle.accel }}</strong></div>
          <div class="value">Geschw.: <strong>{{ vehicle.speed }}</strong></div>
          <div class="value">Pilot: <strong>{{ vehicle.pilot }}</strong></div>
          <div class="value">Rumpf: <strong>{{ vehicle.body }}</strong></div>
          <div class="value">Panzerung: <strong>{{ vehicle.armor }}</strong></div>
          <div class="value">Sensor: <strong>{{ vehicle.sensor }}</strong></div>
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