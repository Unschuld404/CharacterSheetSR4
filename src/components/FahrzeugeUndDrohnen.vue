<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogVehicleSheet} from "@/composables/dialogs";
import {uploadSheet} from "@/composables/fetch";
import {Vehicle} from "@/composables/vehicle";

function toggleSelection(item: Vehicle): void
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

  <ul>
    <li v-for="vehicle in char.vehicles" :key="vehicle.name">
      <div class="box" @click="DialogVehicleSheet.setVehicle(vehicle).show()">
        <div class="header-row">
          <input type="checkbox" class="favourite" @click.stop :checked="char.isItemSelected(vehicle)" @change="toggleSelection(vehicle)">
          <div class="header">{{ vehicle.name }} </div>
        </div>
        <div class="info">
          <div class="value-small">Handling: <strong>{{ vehicle.handling }}</strong></div>
          <div class="value">Beschl.: <strong>{{ vehicle.accel }}</strong></div>
          <div class="value">Geschw.: <strong>{{ vehicle.speed }}</strong></div>
          <div class="value-small">Pilot: <strong>{{ vehicle.pilot }}</strong></div>
          <div class="value-small">Rumpf: <strong>{{ vehicle.body }}</strong></div>
          <div class="value-small">Panzerung: <strong>{{ vehicle.armor }}</strong></div>
          <div class="value-small">Sensor: <strong>{{ vehicle.sensor }}</strong></div>
        </div>
      </div>
    </li>
  </ul>

</template>

<style scoped>

  .box {
    padding-top: 2vh;
    margin-bottom: 2vh;
    width: 100%;
    cursor: pointer;
  }

  .info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .value {
    width: 20vh;
    text-align: center;
    line-height: 6vh;
    font-size: 2vh;
  }

  .value-small {
    width: 15vh;
    text-align: center;
    line-height: 6vh;
    font-size: 2vh;
  }

</style>/