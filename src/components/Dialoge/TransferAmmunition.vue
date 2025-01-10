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
    <div class="dialog-box column" @click.stop>
      <ul>
        <li v-for="ammo in ammunitions" :key="ammo.name" class="item">
          <div>{{ ammo.name }} - {{ ammo.extra }}</div>
          <span>{{ charCount(ammo) }}</span>
          <input
              type="range"
              min="0"
              :max="maxCount(ammo)"
              step="1"
              :value="vehicleCount(ammo)"
              @input="onSliderChange($event, ammo)"
          /><span>{{ vehicleCount(ammo) }}</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<style scoped>

strong {
  padding-top: 1rem;
  padding-left: 2vw;
}

.dialog-box {
  height: 80dvh;
  width: 90dvw;
  overflow: scroll;
  padding: 0;
  align-items: normal;
}

.item {
  padding: 0 2vw;
}


</style>/