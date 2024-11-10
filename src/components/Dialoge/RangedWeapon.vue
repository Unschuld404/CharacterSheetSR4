<script setup lang="ts">
import {DialogRollDice, DialogWeapon} from "@/composables/dialogs";
import {computed, ref} from "vue";
import RadioButtons from "@/components/RadioButtons.vue";
import {getModeModifier, getRangeModifierForRange, shootingMode} from "@/composables/weapons";
import {toInt} from "@/composables/utils";
import ChooseAmmo from "@/components/Dialoge/ChooseAmmo.vue";
import {char} from "@/composables/char";


const selectReach = ref<string>('short');
const selectShootingMode = ref<string>('einzelschuss');
const chooseAmmoDialogVisible = ref(false);

const weapon  = computed( () => {
    return DialogWeapon.weapon;
})

const setting = computed(() => {
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
  return getModeModifier( selectShootingMode.value, setting.value.ammoLeft, toInt(weapon.value.rc), false );
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
    console.error('mode not found: ' + selectShootingMode.value)
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
          <div v-if="weapon.mods.length > 0" class="column box">
            <div class="lower-header">
              Waffen-Mods
            </div>
            <div v-for="mod in weapon.mods" class="line">
              {{ mod.name }}
              <template v-if="mod.rating > 0">( {{ mod.rating }} )</template>
              <template v-if="mod.rc != 0">- RC: ( {{ mod.rc }} )</template>
            </div>
          </div>
          <div class="column">
            <div class="shooting-mode">
              <RadioButtons class="mode" v-model="selectShootingMode" :options="shootingMode" group="modes" id="mode"/>
            </div>
          </div>
          <div class="column divers">
            <div class="row reach">
              <RadioButtons class="mode" v-model="selectReach" :options="ranges" group="distances" id="reach"/>
            </div>
            <div v-if="isLoaded()" class="row" >
              {{ setting.ammoLoaded }} {{ setting.ammoLeft }} / {{ setting.magSize }} ({{ setting.magType }})
              <button @click="reload">reload</button>
              <button @click="load">switch ammo</button>
            </div>
            <div v-else class="row empty" >
              <button @click="load">Munition laden</button>
            </div>
            <div class="row">
              <div class="column box narrow">
                <div class="lower-header">
                  Schaden
                </div>
                <div class="mod">
                  {{ weapon.damage }}
                </div>
              </div>
              <div class="column box narrow">
                <div class="lower-header">
                  Pool
                </div>
                <div class="mod">
                  {{ weapon.dicepool }}
                </div>
              </div>
              <div class="column box wide">
                <div class="row-info">
                  <p>Panzerbrechend</p>
                  <strong>{{ weapon.ap }}</strong>
                </div>
                <div class="row-info">
                  <p>Rückstoßkompensation</p>
                  <strong>{{ weapon.rc }}</strong>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column box narrow">
                <div class="lower-header">
                  Distanz-Mod
                </div>
                <div class="mod">
                  {{ rangeModifier }}
                </div>
              </div>
              <div class="column box narrow">
                <div class="lower-header">Modus-Mod</div>
                <div class="mod">
                  -{{ modeModifier }}
                </div>
              </div>

              <button class="dice wide" @click="DialogRollDice.setValues(
              {
                name: weapon.name,
                value: toInt(weapon.dicepool) + rangeModifier - modeModifier,
                values: [
                    {name: 'Fertigkeit', value: toInt(weapon.dicepool)-char.attributes.agility.total},
                    {name: 'Geschicklichkeit', value: char.attributes.agility.total},
                    {name: 'Distanz', value: rangeModifier},
                    {name: 'Modus', value: modeModifier},
                    ]
              }
              ).show()">{{ toInt(weapon.dicepool) + rangeModifier - modeModifier }}
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>

</template>

<style scoped>

.line {
  height: 6vh;
  align-content: center;
  border-bottom: 1px solid var(--background-color)
}
.line:last-child{
  border: none;
}

.row-info {
  display: flex;
  justify-content: space-between;
  font-size: 2vh;
  line-height: 3vh;
}

.mod {
  font-weight: bold;
  font-size: 3vh;
  line-height: 7vh;
}

.dice {
  padding: 1vh;
  font-size: 5vh;
}

.narrow {
  width: 15vh;
  height: 10vh;
  flex: 1;
  text-align: center;
}

.wide {
  flex: 3;
}

.empty {
  width: 100%;
  flex: 1;
}

button{
  width: 100%;
  height: 100%;
  font-size: 3vh;
  font-weight: bold;
  color: var(--accent-color);
  background-color: var(--background-color);
  border-radius: 1vh;
  border: 1px solid var(--font-color)
}

.reach {
  flex: 1;
  border: 1px solid var(--font-color);
  border-radius: 1vh;
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
  z-index: 2000;
  background-color: var(--background-color);
}

.modal-content {
  background-color: transparent;
  border: none;
  z-index: 2001;
}

#mode.radio {
  flex-direction: column;
  height: 38vh;
  width: 20vh;
  border: 1px solid var(--font-color);
}

#reach.radio {
  width: 100%;
}



</style>/