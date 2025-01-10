<script setup lang="ts">

  import {char} from "@/composables/char";
  import {uploadSheet} from "@/composables/fetch";
  import {DialogTransferAmmunition, DialogVehicleSheet} from "@/composables/dialogs";
  import {computed} from "vue";
  import {ammunitionEquals, cloneAmmunition, removeDuplicates} from "@/composables/utils";
  import type {Ammunition} from "@/composables/types";

  const charAmmunitions = computed(() => char.getAmmunitions());
  const vehicleAmmunitions = computed(() => DialogVehicleSheet.vehicle?.getAmmunitions() ?? [])

  const ammunitions = computed(() =>
      removeDuplicates(
          [...charAmmunitions.value, ...vehicleAmmunitions.value].sort((a, b) => a.name.localeCompare(b.name)),
          (a, b) => ammunitionEquals(a, b)));

  function vehicleCount(ammo: Ammunition): number {
    return (vehicleAmmunitions.value.find((item) => ammunitionEquals(ammo, item) ?? null))?.count ?? 0;
  }
  function charCount(ammo: Ammunition): number {
    return (charAmmunitions.value.find((item) => ammunitionEquals(ammo, item) ?? null))?.count ?? 0;
  }
  function maxCount(ammo: Ammunition): number {
    return vehicleCount(ammo)+ charCount(ammo);
  }
  function setVehicleCount(ammo: Ammunition, count: number) {
    let vehicleItem = vehicleAmmunitions.value.find((item) => ammunitionEquals(ammo, item)) ?? null;
    let charItem = charAmmunitions.value.find((item) => ammunitionEquals(ammo, item)) ?? null;

    if (vehicleItem === null) {
      vehicleItem = cloneAmmunition(ammo);
      vehicleItem.count = 0;
      vehicleAmmunitions.value.push(vehicleItem);
    }

    if (charItem === null) {
      charItem = cloneAmmunition(ammo);
      charItem.count = 0;
      charAmmunitions.value.push(charItem);
    }

    const delta = vehicleItem.count - count;
    vehicleItem.count = count;
    charItem.count += delta;
  }

  function onSliderChange(event: Event, ammo: Ammunition) {
    const value = Number((event.target as HTMLInputElement).value);
    setVehicleCount(ammo, value);
  }

</script>/

<template>

  <div v-if="DialogTransferAmmunition.visible" class="overlay" @click="DialogTransferAmmunition.hide()">
    <div class="dialog-box" @click.stop>
      <ul>
        <li v-for="ammo in ammunitions" :key="ammo.name" class="item">
         <div class="column">
           <div>{{ ammo.name }} - {{ ammo.extra }}</div>
           <div class="row">
             <div class="count">{{ charCount(ammo) }}</div>
             <input
                 class="slider"
                 type="range"
                 min="0"
                 :max="maxCount(ammo)"
                 step="10"
                 :value="vehicleCount(ammo)"
                 @input="onSliderChange($event, ammo)"
             />
             <div class="count">{{ vehicleCount(ammo) }}</div>
           </div>
         </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<style scoped>

input {
  width: 70%;
  margin: 0.5rem 1rem 0;
}

.count {
  width: 15%;
}

.slider {
  -webkit-appearance: none;
  height: 1rem;
  background: var(--primary-color);
  outline: none;
  -webkit-transition: .2s;
  transition: opacity .2s;
  border-bottom: none;
  border-radius: 1rem;
}


.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: var(--accent-color);
  cursor: pointer;
  border-radius: 50%;
}

.dialog-box {
  height: 80vh;
  width: 90dvw;
  overflow: scroll;
  padding: 2vh 0 1vh;
  align-items: normal;
}

.item {
  padding: 0.5rem 2dvw;
  justify-content: space-between;
}

.item:last-child {
  border-bottom: none;
}

.column {
  text-align: center;
  width: 100%;
}

</style>/