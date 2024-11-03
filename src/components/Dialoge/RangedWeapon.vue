<script setup lang="ts">
import {DialogWeapon} from "@/composables/dialogs";
import {computed, ref} from "vue";
import RadioButtons from "@/components/RadioButtons.vue";
import {getModeModifier, getRangeModifierForRange, shootingMode} from "@/composables/weapons";
import type {Weapon, WeaponSetting} from "@/composables/types";
import {toInt} from "@/composables/utils";
import ChooseAmmo from "@/components/Dialoge/ChooseAmmo.vue";


const selectReach = ref<string>('short');
const selectShootingMode = ref<string>('einzelschuss');
const chooseAmmoDialogVisible = ref(false);

const weapon : Weapon = computed( () => {
    return DialogWeapon.weapon;
})

const setting : WeaponSetting = computed(() => {
  return DialogWeapon.setting;
})

const ranges = computed(() => {
    return [
      { label: DialogWeapon.weapon.ranges.short, value: 'short'},
      { label: DialogWeapon.weapon.ranges.medium, value: 'medium' },
      { label: DialogWeapon.weapon.ranges.long, value: 'long'},
      { label: DialogWeapon.weapon.ranges.extreme, value: 'extreme' },
    ];
})

const rangeModifier = computed(() => {
  return getRangeModifierForRange(selectReach.value);
})

const modeModifier = computed(() => {
  return getModeModifier( selectShootingMode.value, setting.value.ammoLeft, toInt(weapon.rc), false );
})

function reload()
{
  setting.value.ammoLeft = setting.value.magSize;
}

function load()
{
  chooseAmmoDialogVisible.value = true;
}

function isLoaded(): boolean
{
  return setting.value.ammoLoaded !== '';
}

function shoot()
{
  const item = shootingMode.find((item) => { return item.value === selectShootingMode.value}) ?? null;
  if (item === null)
  {
    console.error('mode not found: ' + mode)
    return;
  }

  setting.value.ammoLeft -= item.count;
}

</script>/

<template>

  <ChooseAmmo v-if="chooseAmmoDialogVisible" @confirm="chooseAmmoDialogVisible = false" @cancel="chooseAmmoDialogVisible = false" />

  <div v-if="DialogWeapon.visible" class="modal-overlay" @click="DialogWeapon.hide">
    <div class="modal-content" @click.stop>

      <div class="the-weapon">

        <div class="row box name"><h1>{{ weapon.name }}</h1></div>
        <div class="row">
          <div class="column divers">
            <div class="row box">
              <RadioButtons class="mode reach" v-model="selectReach" :options="ranges" group="distances" id="reach"/>
            </div>
            <div v-if="isLoaded()" class="row box" >
              {{ setting.ammoLoaded }} {{ setting.ammoLeft }} / {{ setting.magSize }} ({{ setting.magType }})
              <button class="action-button" @click="reload">reload</button>
              <button class="action-button" @click="load">switch ammo</button>
            </div>
            <div v-else class="row box" >
              <button class="action-button" @click="load">load ammo</button>
            </div>
            <div class="row">
              <div class="column box">
                <div class="ap">Panzerbrechend {{ weapon.ap }}</div>
                <div class="recoil">Rückstoßkompensation {{ weapon.rc }}</div>
              </div>
              <div class="column box">Schaden<br>{{ weapon.damage }}</div>
              <div class="column box"> Pool <br> {{ weapon.dicepool }} </div>
              <div class="column box"> Range-Modifier <br> {{ rangeModifier }} </div>
              <div class="column box"> Mode-Modifier <br> -{{ modeModifier }} </div>
              <div class="shoot box"> Feuer <br> <button @click="shoot" class="dice"> {{ toInt(weapon.dicepool) + rangeModifier - modeModifier }} </button> </div>
            </div>
          </div>
          <div class="column">
            <div class="shooting-mode">
              <RadioButtons class="mode" v-model="selectShootingMode" :options="shootingMode" group="modes" id="mode"/>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>

</template>

<style scoped>

.action-button {
  font-weight: bold;
  font-size: 3vh;
  border: none;
  text-align: center;
  align-content: center;
  border-radius: 0.5vh;
  height: 4vh; /* reference for line-height */
  width: fit-content;
  background-color: var(--background-color);
  color: var(--accent-color);
}

.divers {
  flex: 3;
}

.row {
  gap: 2vh;
}

.column {
  gap: 2vh;
}

.name {
  margin-bottom: 2vh;
}

.the-weapon {
  display: flex;
  flex-direction: column;
}

.modal-overlay {
  z-index: 1000;
  background-color: var(--background-color);
}

.modal-content {
  width: 70vw;
  height: 50vh;
  background-color: transparent;
  border: 1px solid var(--accent-color);
  z-index: 1001;
}

#mode.radio {
  flex-direction: column;
  height: 38vh;
  width: 20vh;
  border: 1px solid var(--font-color);
}

#reach.radio {
  width: 50vh;
}



</style>/