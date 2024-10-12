<script setup lang="ts">

import { computed } from 'vue';
import { data, getWeapons } from '@/scripts/Data';

// Computed Property, das sich automatisch aktualisiert, wenn data sich ändert
const weapons = computed(() => {
  return data.value ? getWeapons() : [];
});

</script>

<template>

  <div class="scroll-box">
    <ul>
      <li v-for="weapon in weapons" :key="weapon.name">
        <div class="item column">
          <div class="header">
            <div v-if="data">{{ weapon.name }}</div>
          </div>
          <div class="info">
            <input type="checkbox" class="favourite">
            <div v-if="data" class="value">Schaden: <strong>{{ weapon.damage }}</strong></div>
            <div v-if="data" class="value">PB: <strong>{{ weapon.ap }}</strong></div>
            <div v-if="data" class="value">Modus: <strong>{{ weapon.mode }}</strong></div>
            <div v-if="data" class="value">Rückstoßkomp.: <strong>{{ weapon.rc }}</strong></div>
            <div v-if="data" class="value">Munition: <strong>{{ weapon.ammo }}</strong></div>
            <button v-if="data" class="total-value">{{ weapon.dicepool }}</button>
          </div>
          <div class="info">
            <div v-if="data" class="ranges">
              <div class="range">Reichweite:</div>
              <div class="range">Kurz: <strong>{{ weapon.ranges.short }}</strong></div>
              <div class="range">Mittel: <strong>{{ weapon.ranges.medium }}</strong></div>
              <div class="range">Lang: <strong>{{ weapon.ranges.long }}</strong></div>
              <div class="range">Extrem: <strong>{{ weapon.ranges.extreme }}</strong></div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

</template>

<style scoped>

.scroll-box {
  height: 80vh;
}

.info {
  display: flex;
  justify-content: flex-start;
  text-align: center;
  margin-top: 1vh;
  line-height: 2vh;
  height:5vh;
  position: relative;
}

.value {
  width: 18%;
  text-align: center;
  line-height: 2vh;
}

.ranges {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.range {
  width: 18%;
  text-align: center;
  line-height: 2vh;
}

button {
  position: absolute;
  right: 0;
  bottom: 1vh;
}

.favourite {
  position: absolute;
  left: 0;
  bottom: 1vh;
}

</style>/