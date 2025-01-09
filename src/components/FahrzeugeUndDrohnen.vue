<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogVehicleSheet} from "@/composables/dialogs";
import MagazinInfo from "@/components/MagazinInfo.vue";
</script>

<template>

  <ul>
    <li v-for="vehicle in char.vehicles" :key="vehicle.name">
      <div class="box" @click="DialogVehicleSheet.setVehicle(vehicle).show()">
        <div class="row">
          <h1 class="clickable" v-if="vehicle.nickname">{{ vehicle.nickname }}</h1>
          <h1 class="clickable" v-else>{{ vehicle.name }}</h1>
          <div>{{ vehicle.mode }}</div>
        </div>

        <div v-if="vehicle.weapons.length">
          <div v-for="weapon in vehicle.weapons">
            <div>{{ weapon.name }}</div>
            <div class="row" v-if="weapon.isLoaded">
              <div>{{ weapon.ammoLoaded }}</div>
              <MagazinInfo :bulletsLeft="weapon.bulletsLeft" :magSize="weapon.magSize" />
            </div>
          </div>
        </div>

      </div>
    </li>
  </ul>

</template>

<style scoped>

li {
  padding: 0;
  margin-bottom: 2vh;
  margin-left: 1vw;
  margin-right: 1vw;
}

.box {
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 2vw;
  background-color: var(--primary-color);
  border-radius: 0.5rem;
}

.row {
  justify-content: space-between;
  align-items: center;
  padding-right: 2vw;
}

</style>