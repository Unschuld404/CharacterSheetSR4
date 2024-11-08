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
               <div v-if="weapon.ap != '-'" class="value">PB: <strong>{{ weapon.ap }}</strong></div>
               <div v-if="!weapon.isMelee" class="value">{{ weapon.settings.ammoLoaded}}</div>
             </div>
             <template v-if="weapon.isMelee">
               <button class="dice" @click="DialogRollDice.setName(weapon.name).setDiceCount(toInt(weapon.dicepool)).show()">{{ weapon.dicepool }}</button>
             </template>
           </div>
         </div>
        </div>
      </li>
    </ul>
  </div>

</template>

<style scoped>

.box {
  cursor: pointer;
}

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
}

strong {
  margin-left: 1vh;
}

.flex-scroll {
  height: 85vh;
}

ul {
  width: 100%;
}

li {
  margin-bottom: 2vh;
}

li:last-of-type {
  margin-bottom: 0;
}


</style>/