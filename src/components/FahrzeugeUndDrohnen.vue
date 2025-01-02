<script setup lang="ts">
import {char} from "@/composables/char";
import { DialogVehicleSheet } from "@/composables/dialogs";

</script>

<template>

  <ul>
    <li v-for="vehicle in char.vehicles" :key="vehicle.name">
      <div class="box" @click="DialogVehicleSheet.setVehicle(vehicle).show()">
        <div class="row">
          <div class="clickable-name">{{ vehicle.name }} </div>
        </div>

        <div v-if="vehicle.weapons.length">
          <div class="item" v-for="weapon in vehicle.weapons">
            {{ weapon.name }}
          </div>
        </div>

        <div v-if="vehicle.sensors.length">
          <div class="item" v-for="sensor in vehicle.sensors">
            {{ sensor.name }} ({{ sensor.rating }})
          </div>
        </div>

        <div v-if="vehicle.mods.length">
          <div class="item" v-for="mod in vehicle.mods">
            {{ mod.name }}
          </div>
        </div>

      </div>
    </li>
  </ul>

</template>

<style scoped>

li {
  padding: 0;
  margin-bottom: 1vh;
}

.box {
  padding-top: 2vh;
}

.clickable-name {
  padding-left: 2dvw;
}

</style>