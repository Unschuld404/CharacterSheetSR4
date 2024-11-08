<script setup lang="ts">
import {char} from "@/composables/char";
import {computed} from "vue";
import {Spell} from "@/composables/types";
import {Spirit} from "@/composables/spirits";
import {Vehicle} from "@/composables/vehicle";
import {Weapon} from "@/composables/weapons";

const spells = computed<Spell[]>(() => char.spells.filter((obj) =>  char.isItemSelected(obj)));
const spirits = computed<Spirit[]>(() => char.spirits.filter((obj) =>  char.isItemSelected(obj)));
const vehicles = computed<Vehicle[]>(() => char.vehicles.filter((obj) =>  char.isItemSelected(obj)));
const weapons = computed<Weapon[]>(() => char.weapons.filter((obj) =>  char.isItemSelected(obj)));

</script>

<template>

  <div class="box">

    <div class="scroll-box">

      <div v-for="spell in spells" class="item" >
       <div>{{ spell.name }}</div>
        <div class="formula">{{ spell.dv }}</div>
      </div>

      <div v-for="spirit in spirits" class="item" >
        <div>{{ spirit.type }}</div>
        <div class="formula">{{ spirit.bound ? 'gebunden' : 'ungebunden' }}</div>
      </div>

      <div v-for="vehicle in vehicles" class="item" >
        <div>{{ vehicle.name }}</div>
        <div class="formula">{{ vehicle.mode }}</div>
      </div>

      <div v-for="weapon in weapons" class="item" >
        <div>{{ weapon.name }}</div>
        <div class="formula">{{ weapon.category }}</div>
      </div>

    </div>

    <div class="lower-header">Aktionen</div>

  </div>

</template>

<style scoped>

  .box {
    height: 100%
  }

  .item {
    display: flex;
    height: 6vh;
    line-height: 6vh;
    justify-content: space-between;
  }

</style>