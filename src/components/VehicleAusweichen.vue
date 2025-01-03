<script setup lang="ts">
import {computed, ref} from "vue";
import {EvadeType} from "@/composables/types";
import {DialogRollDice, DialogVehicleSheet} from "@/composables/dialogs";
import {Vehicle} from "@/composables/vehicle";

const vehicle = computed<Vehicle>(() => DialogVehicleSheet.getVehicle());

const fullDefense = ref(false);
function toggleFullDefense() {
  fullDefense.value = !fullDefense.value;
}

const evadeMelee = computed( () => {
  return vehicle.value.evade(EvadeType.Melee, fullDefense.value, vehicle.value.mode);
});
const evadeRanged = computed( () => {
  return vehicle.value.evade(EvadeType.Ranged, fullDefense.value, vehicle.value.mode);
});

</script>

<template>

  <div class="box row">

    <div class="column">
      <div class="dice" @click="DialogRollDice.setValues(evadeRanged).show()">{{ evadeRanged.value }}</div>
    </div>

    <div class="column">
      <div :class="{'active': fullDefense}" class="dice defense" @click="toggleFullDefense">Volle Abwehr</div>
    </div>

    <div class="column">
      <div class="dice" @click="DialogRollDice.setValues(evadeMelee).show()">{{ evadeMelee.value }}</div>
    </div>

  <div class="lower-header">
    <div>{{ evadeRanged.name }}</div>
    <div>{{ evadeMelee.name }}</div>
  </div>

  </div>

</template>

<style scoped>

.lower-header {
  display: flex;
  justify-content: space-evenly;
}

.box {
  height: 100%;
  padding-top: 3vh;
}

.column {
  text-align: center;
  align-items: center;
}

.row{
  justify-content: space-between;
  padding-left: 3vh;
  padding-right: 3vh;
}

.defense {
  width: 15vh;
  font-weight: normal;
  font-size: 2vh;
}

.defense.active {
  background-color: var(--accent-color);
  color: var(--background-color);
  font-weight: bold;
}

</style>