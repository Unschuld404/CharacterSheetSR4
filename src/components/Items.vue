<script setup lang="ts">
import {char} from "@/composables/data";
import {DialogRollDice} from "@/composables/dialogs";

</script>

<template>

  <div class="scroll-box">
    <ul>
      <li v-for="weapon in char.weapons" :key="weapon.name">
        <div class="item column">
          <div class="header row">
            <input type="checkbox" class="favourite">
            <div>{{ weapon.name }}</div>
          </div>
          <div class="info">
            <div class="value">Schaden: <strong>{{ weapon.damage }}</strong></div>
            <div class="value">PB: <strong>{{ weapon.ap }}</strong></div>
            <div class="value">Modus: <strong>{{ weapon.mode }}</strong></div>
            <div class="value">Rückstoßkomp.: <strong>{{ weapon.rc }}</strong></div>
            <div class="value">Munition: <strong>{{ weapon.ammo }}</strong></div>
            <button class="dice" @click="DialogRollDice.setName(weapon.name).setDiceCount(weapon.dicepool).show()">{{ weapon.dicepool }}</button>
          </div>
          <div class="info">
            <div class="ranges">
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

.header {
  margin-top: 1.5vh;
}

.favourite {
  position: relative;
  bottom: 3vh;
  margin-right: 3vh;
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

</style>/