<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogWeapon, DialogRollDice} from "@/composables/dialogs";
import {toInt} from "@/composables/utils";

</script>

<template>

  <div class="flex-scroll">
    <ul>
      <li v-for="weapon in char.weapons" :key="weapon.name">
        <div class="box" @click="DialogWeapon.setWeapon(weapon).show()">
         <div class="item column">
           <div class="header row">
             <input type="checkbox" class="favourite" @click.stop>
             <div>{{ weapon.name }}</div>
           </div>
           <div class="row">
             <div class="info">
               <div class="value">Schaden: <strong>{{ weapon.damage }}</strong></div>
               <div class="value">PB: <strong>{{ weapon.ap }}</strong></div>
               <div class="value">Distanz: <strong>{{ weapon.ranges.short }} m</strong></div>
             </div>
             <button class="dice" @click="DialogRollDice.setName(weapon.name).setDiceCount(toInt(weapon.dicepool)).show()">{{ weapon.dicepool }}</button>
           </div>
         </div>
        </div>
      </li>
    </ul>
  </div>

</template>

<style scoped>

.dice {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 8vh;
  height: 8vh;
  font-size: 4vh;
}

.header {
  align-items: center;
  position: relative;
}

.favourite {
  margin-top: 0;
  width: 3vh;
  height: 3vh;
  margin-right: 2vh;
  align-self: center;
}

.info {
  margin-left: 5vh;
}

.value {
  line-height: 5vh;
  width: 20vh;
}

strong {
  margin-left: 1vh;
}

.flex-scroll {
  height: 80vh;
}

.box {
  margin-bottom: 2vh;
  width: 40vh;
}

</style>/