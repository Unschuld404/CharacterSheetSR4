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
      <h1>{{ weapon.name }}</h1>
      <div class="column">
        <div class="item">
          <div>Schaden</div>
          <div>{{ weapon.damage }}</div>
        </div>
        <div class="item">
          <div>Pool</div>
          <div>{{ toInt(weapon.dicepool) + rangeModifier - modeModifier }}</div>
        </div>
        <div class="item">
          <div>Panzerbrechend</div>
          <div>{{ weapon.ap }}</div>
        </div>
        <div class="item">
          <div>Rückstoßkompensation</div>
          <div>{{ weapon.rc }}</div>
        </div>
        <div v-if="weapon.mods.length > 0">
          <div v-for="mod in weapon.mods" class="item">
            {{ mod.name }}
            <template v-if="mod.rating > 0">( {{ mod.rating }} )</template>
            <template v-if="mod.rc != 0">- RC: ( {{ mod.rc }} )</template>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <strong>Distanz-Mod</strong>
          <div>{{ rangeModifier }}</div>
          <div>Entfernung</div>
          <RadioButtons class="mode" v-model="selectReach" :options="ranges" group="distances"/>
        </div>
        <div class="column">
          <strong>Modus-Mod</strong>
          <div>-{{ modeModifier }}</div>
          <div>Schussmodus</div>
          <RadioButtons class="mode" v-model="selectShootingMode" :options="shootingMode" group="modes"/>
        </div>
      </div>
      <div v-if="isLoaded()" class="ammo">
        {{ setting.ammoLoaded }} {{ setting.ammoLeft }} / {{ setting.magSize }} ({{ setting.magType }})
      </div>


      <div class="row">

        <div v-if="isLoaded()">
          <button @click="load">switch ammo</button>
        </div>
        <div v-if="isLoaded()">
          <button @click="reload">reload</button>
        </div>
        <div v-else class="empty" >
          <button @click="load">Munition laden</button>
        </div>
        <button>schiessen</button>

        <button @click="DialogRollDice.setValues(
      {
        name: weapon.name,
        value: toInt(weapon.dicepool) + rangeModifier - modeModifier,
        values: [
            {name: 'Fertigkeit', value: toInt(weapon.dicepool)-char.attributes.agility.total},
            {name: 'Geschicklichkeit', value: char.attributes.agility.total},
            {name: 'Distanz', value: rangeModifier},
            {name: 'Modus', value: -modeModifier},
            ]
      }
      ).show()">({{ toInt(weapon.dicepool) + rangeModifier - modeModifier }}) Würfel
        </button>

      </div>

    </div>
  </div>

</template>

<style scoped>

button {
  height: 6vh;
  font-size: 4vw;
  font-weight: bold;
  padding-left: 3vw;
  padding-right: 3vw;
  margin-top: 1vh;
}

.ammo {
  margin-top: 2vh;
  text-align: center;
}

.item {
  height: 4vh;
  border-bottom: 1px solid var(--font-color);
}

.item:last-child {
  margin-bottom: 2vh;
  border-bottom: none;
}

.modal-overlay {
  z-index: 2000;
  background-color: var(--background-color);
}

.modal-content {
  background-color: transparent;
  border: none;
  z-index: 2001;
  max-height: 75vh;
  overflow: scroll;
}

::v-deep(.radio) {
  flex-direction: column;
  border: 1px solid var(--font-color);
  width: 44vw;
}

::v-deep(.radio_label) {
  height: 5vh;
}

.column {
  gap: 1vh;
}

.row {
  gap: 1vh;
  justify-content: space-between;
}

</style>/