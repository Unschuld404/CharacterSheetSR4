<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogRollDice, DialogVehicleSheet, DialogWeapon} from "@/composables/dialogs";
import {uploadSheet} from "@/composables/fetch";
import {Vehicle} from "@/composables/vehicle";
import {toInt} from "@/composables/utils";

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
        <div class="row">
          <input type="checkbox" class="favourite" @click.stop :checked="char.isItemSelected(vehicle)" @change="toggleSelection(vehicle)">
          <div class="header">{{ vehicle.name }} </div>
        </div>

        <div class="item" v-if="vehicle.weapons.length">
          <div v-for="weapon in vehicle.weapons">
            {{ weapon.name }}
          </div>
        </div>

        <div class="item" v-if="vehicle.sensors.length">
          <div v-for="sensor in vehicle.sensors">
            {{ sensor.name }} ({{ sensor.rating }})
          </div>
        </div>

        <div class="item" v-if="vehicle.mods.length">
          <div v-for="mod in vehicle.mods">
            {{ mod.name }}
          </div>
        </div>

      </div>
    </li>
  </ul>

</template>

<style scoped>

li {
  margin-bottom: 2vh;
}

.box {
  padding-top: 1vh;
}

</style>