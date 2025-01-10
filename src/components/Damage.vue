<script setup lang="ts">

import {char} from "@/composables/char";
import {uploadSheet} from "@/composables/fetch";

function store()
{
  uploadSheet().then(() => {});
}

function takePhysicalDamage()
{
  if (char.monitor.physical.filled < char.monitor.physical.max)
  {
    char.monitor.physical.filled++;
    store();
  }
}

function healPhysicalDamage()
{
  if (char.monitor.physical.filled > 0)
  {
    char.monitor.physical.filled--;
    store();
  }
}

function takeStunDamage()
{
  if (char.monitor.stun.filled < char.monitor.stun.max)
  {
    char.monitor.stun.filled++;
    store();
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
  <div class="box">
    <strong>Du stirbst!</strong>
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
