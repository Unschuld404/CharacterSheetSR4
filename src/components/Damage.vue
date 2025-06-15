<script setup lang="ts">

import {char} from "@/composables/char";
import {uploadSheet} from "@/composables/fetch";
import {computed} from "vue";


function getDeathPool(){
  return char.monitor.physical.max + char.monitor.overflow;
}

function store()
{
  uploadSheet().then(() => {});
}

function takePhysicalDamage()
{
  if (char.monitor.physical.filled < getDeathPool())
  {
    char.monitor.physical.filled++;
    store();
    console.log(char.monitor.physical.filled);
  }
  else {
    console.log("Dein Chummer ist tot");
  }
}

function healPhysicalDamage()
{
  if (char.monitor.physical.filled > 0)
  {
    char.monitor.physical.filled--;
    store();
    console.log(char.monitor.physical.filled);
  }
}

function takeStunDamage()
{
  if (char.monitor.stun.filled < char.monitor.stun.max)
  {
    char.monitor.stun.filled++;
    store();
    console.log(char.monitor.physical.filled);
  }
  else {
    if (char.monitor.physical.filled < getDeathPool()) {
      char.monitor.physical.filled++;
      store();
      console.log(char.monitor.physical.filled);
    }
    else {
      console.log("Dein Chummer ist tot", char.monitor.physical.filled);
    }
    // hier könnte noch ein else mit einem Feedback hin, dass der Char bereits tot ist
  }
}

function healStunDamage()
{
  if (char.monitor.stun.filled > 0)
  {
    char.monitor.stun.filled--;
    store();
  }
}

const damageModifier = computed(() => {
  return (Math.floor(Math.max(0, char.monitor.physical.filled - char.monitor.offset) / char.monitor.threshold))
  + (Math.floor(Math.max(0, char.monitor.stun.filled - char.monitor.offset) / char.monitor.threshold));
})

const unconscious = computed(() => {
  return (char.monitor.physical.filled >= char.monitor.physical.max) || (char.monitor.stun.filled >= char.monitor.stun.max);
})

</script>

<template>
  <div class="row space">
    <div class="column">
      <div>Körperlicher Schaden</div>
      <div class="row dmg">
        <i class='bx bxs-minus-square' @click="healPhysicalDamage"></i>
        <div><strong>{{char.monitor.physical.filled}}</strong> / {{ char.monitor.physical.max }}</div>
        <i class='bx bxs-plus-square' @click="takePhysicalDamage"></i>
      </div>
    </div>
    <div class="column">
      <div>Geistiger Schaden</div>
      <div class="row dmg">
        <i class='bx bxs-minus-square' @click="healStunDamage"></i>
        <div><strong>{{char.monitor.stun.filled}}</strong> / {{ char.monitor.stun.max}}</div>
        <i class='bx bxs-plus-square' @click="takeStunDamage"></i>
      </div>
    </div>
  </div>
  <div class="box" v-if="damageModifier > 0">
    <div v-if="char.monitor.physical.filled == getDeathPool()">
      <i class='bx bxs-skull'></i>
      <div><strong>{{char.monitor.physical.filled}}</strong> / {{ getDeathPool() }}</div>
      <div>Du bist tot</div>
    </div>
    <div v-else>
      <div v-if="unconscious">
        <div><strong>{{char.monitor.physical.filled}}</strong> / {{ getDeathPool() }}</div>
        <div>Du bist bewusstlos</div>
      </div>
      <div v-else>
        Du hast einen Abzug von {{damageModifier}} auf deine Würfelproben
      </div>
    </div>
  </div>
</template>

<style scoped>

i {
  color: var(--accent-color);
  font-size: 1.5rem;
}

.box {
  background-color: var(--primary-color);
  padding: 0.5rem 1vw;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.dmg  {
  padding-left: 1rem;
  padding-right: 1rem;
}

.row {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
}

.column {
  width: 100%;
}

.space {
  margin: 0.5rem 0;
}

</style>
