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
<div class="box">
  <strong class="category">Ausweichen</strong>
    <div class="row">
      <div class="dice-column" @click="DialogRollDice.setValues(evadeMelee).show()">
        <button class="dice">{{ evadeMelee.value }}</button>
        <div>Nahkampf</div>
      </div>
      <div class="dice-column" @click="DialogRollDice.setValues(evadeRanged).show()">
        <button class="dice">{{ evadeRanged.value }}</button>
        <div>Fernkampf</div>
      </div>
      <div :class="{'active': fullDefense}" class="dice-column defense" @click="toggleFullDefense">
        <button :class="{'active': fullDefense}" class="defense">Volle Abwehr</button>
        <div>Skill</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

button {
  margin-bottom: 0.5rem;
}

.dice-column {
  width: 31dvw;
}

.box {
  margin: 0.5rem 0;
}

.row{
  justify-content: space-between;
  align-items: center;
  padding: 0 1dvw;
  gap: 2vw;
}

.defense {
  background-color: var(--primary-color);
}

.defense.active {
  background-color: var(--accent-color);
  color: var(--background-color);
  font-weight: bold;
}

</style>