<script setup lang="ts">

import {char} from "@/composables/char";
import {
  DialogChooseAction
} from "@/composables/dialogs";
import {computed} from "vue";
import {uploadSheet} from "@/composables/fetch";


const spirits = computed(() => char.spirits);

function toggleSelection(item: any): void
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

</script>/

<template>

  <div v-if="DialogChooseAction.visible" class="overlay" @click="DialogChooseAction.hide">
    <div class="dialog-box column" @click.stop>
      <strong v-if="char.spirits.length != 0">Geister</strong>
      <ul>
        <li v-for="(spirit, index) in spirits" :key="index" class="item">
          <div class="column">
            <div>{{ spirit.caption }} ( {{ spirit.force }} )</div>
            <div class="extra">Dienste: {{ spirit.services }}</div>
            <div class="extra">{{ spirit.bound ? 'Gebunden' : 'Ungebunden' }}</div>
          </div>
          <input type="checkbox" class="favourite" @click.stop :checked="char.isItemSelected(spirit)" @change="toggleSelection(spirit)">
        </li>
      </ul>
      <strong v-if="char.spells.length != 0">Zauber</strong>
      <ul>
        <li v-for="spell in char.spells" :key="spell.name" class="item">
          <div class="column">
            <div>{{ spell.name }}</div>
            <div class="extra">{{ spell.category }}</div>
            <div class="extra">{{ spell.dv }}</div>
          </div>
          <input type="checkbox" class="favourite" @click.stop :checked="char.isItemSelected(spell)" @change="toggleSelection(spell)">
        </li>
      </ul>
      <strong v-if="char.weapons.length != 0">Waffen</strong>
      <ul>
        <li v-for="weapon in char.weapons" :key="weapon.name" class="item">
          <template v-if="!weapon.isMelee">
            <div class="column">
              <div>{{ weapon.name }}</div>
              <div class="extra">Schaden: {{ weapon.damage }}</div>
              <div v-if="weapon.ap != '-'" class="extra">PB ({{ weapon.ap }})</div>
            </div>
            <input type="checkbox" class="favourite" @click.stop :checked="char.isItemSelected(weapon)" @change="toggleSelection(weapon)">
          </template>

          <div v-else class="row">
              <div>{{ weapon.name }}</div>
              <input type="checkbox" class="favourite" @click.stop :checked="char.isItemSelected(weapon)" @change="toggleSelection(weapon)">
          </div>
        </li>
      </ul>
      <strong v-if="char.vehicles.length != 0">Fahrzeuge und Drohnen</strong>
      <ul>
        <li v-for="vehicle in char.vehicles" :key="vehicle.name" class="item">
            <div class="column">
              <div>{{ vehicle.name }} </div>
              <div class="extra" v-if="vehicle.weapons.length">
                <div v-for="weapon in vehicle.weapons">
                  {{ weapon.name }}
                </div>
              </div>
              <div class="extra" v-if="vehicle.sensors.length">
                <div v-for="sensor in vehicle.sensors">
                  {{ sensor.name }} ({{ sensor.rating }})
                </div>
              </div>
              <div class="extra" v-if="vehicle.mods.length">
                <div v-for="mod in vehicle.mods">
                  {{ mod.name }}
                </div>
              </div>
            </div>
            <input type="checkbox" class="favourite" @click.stop :checked="char.isItemSelected(vehicle)"
                   @change="toggleSelection(vehicle)">
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

.row {
  justify-content: space-between;
  width: 100%;
}

.extra {
  font-size: 0.8rem;
}

</style>/