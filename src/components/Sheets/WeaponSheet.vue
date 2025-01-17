<script setup lang="ts">
import {DialogRollDice, DialogWeapon} from "@/composables/dialogs";
import {computed, ref, watch} from "vue";
import RadioButtons from "@/components/RadioButtons.vue";
import {
  getRangeModifierForRange,
  WeaponSetting
} from "@/composables/weapons";
import {toInt} from "@/composables/utils";
import ChangeAmmo from "@/components/Dialoge/ChangeAmmo.vue";
import {uploadSheet} from "@/composables/fetch";
import Magazin from "@/components/Magazin.vue";
import {Pool} from "@/composables/types";

const selectedRange = ref<string>('short');
const chooseAmmoDialogVisible = ref(false);

const weapon  = computed( () => DialogWeapon.weapon  )
const ranges  = computed( () => DialogWeapon.weapon.getRanges() )
const shootingModes = computed(() => DialogWeapon.weapon.getShootingModes() )
const rangeModifier = computed(() => getRangeModifierForRange(selectedRange.value))
const modeModifier = computed(() => DialogWeapon.weapon.shootingModeModifier )
const bulletsToFire = computed(() => DialogWeapon?.weapon?.bulletsToFire ?? 0 )
const bulletsFired = computed(() => DialogWeapon?.weapon?.bulletsFired ?? 0 )
const isLoaded = computed(() => DialogWeapon.weapon.isLoaded )
const selectedShootingMode = computed({
  get: () => DialogWeapon.weapon?.shootingMode ?? (new WeaponSetting()).selectedShootingMode,
  set: (value) => DialogWeapon.weapon.shootingMode = value
})
const pool = computed(() => {
    return DialogWeapon.weapon.getPool()
        .add('Distanz', rangeModifier.value);
})

function store()
{
  uploadSheet().then(() => {});
}

function reload()
{
  weapon.value.reload();
  store();
}

function load()
{
  chooseAmmoDialogVisible.value = true;
}

function shoot()
{
  weapon.value.shoot();
  store();
}

function resetPhase()
{
  weapon.value.resetPhase();
  store();
}

</script>/

<template>
  <div v-if="DialogWeapon.visible" class="overlay">
    <div class="sheet" @click.stop>
      <div class="sheet-header row">
        <div v-if="weapon.weaponname">
          <h1>{{ weapon.weaponname }}</h1>
          <div>{{ weapon.name }}</div>
        </div>
        <h1 v-else>{{ weapon.name }}</h1>
        <button class="sheet-control" @click="DialogWeapon.hide"><i class='bx bxs-x-square'></i></button>
      </div>
      <div class="row gap">
        <div class="column">
          <strong>Distanz-Mod</strong>
          <div>{{ rangeModifier }}</div>
          <div>Entfernung</div>
          <RadioButtons class="mode" v-model="selectedRange" :options="ranges" group="distances"/>
        </div>
        <div class="column">
          <strong>Modus-Mod</strong>
          <div>{{ modeModifier }}</div>
          <div>Schussmodus</div>
          <RadioButtons class="mode" v-model="selectedShootingMode" :options="shootingModes" group="modes"/>
        </div>
      </div>
      <div v-if="isLoaded" class="ammo">
       {{ weapon.ammoLoaded }}  ({{ weapon.magType }})
      </div>
      <div v-if="weapon.isSecondPhase" class="phase">Anzahl Kugeln aus Phase 1: {{ bulletsFired }} <button @click="weapon.resetPhase()"> x </button></div>
      <div v-if="isLoaded" class="ammo">
        Anzahl Kugeln: {{ bulletsToFire }}
      </div>

      <magazin v-if="isLoaded"/>

      <div class="row">
        <div class="column">
          <div v-if="isLoaded">
            <button class="weapon-buttons" @click="load">Ammo wechseln</button>
          </div>
          <div v-if="isLoaded">
            <button class="weapon-buttons" @click="reload">Nachladen</button>
          </div>
          <div v-else class="empty" >
            <button class="weapon-buttons" @click="load">Munition laden</button>
          </div>
        </div>
        <div class="column">
          <button class="weapon-buttons" @click="shoot">Schiessen</button>

          <button class="weapon-buttons" @click="DialogRollDice.setPool(pool).show()">
            ({{ pool.value }}) Würfel
          </button>
        </div>
      </div>
      <div class="gap">
        <div class="item">
          <div>Schaden</div>
          <div>{{ weapon.damage }}</div>
        </div>
        <div class="item">
          <div>Pool</div>
          <div>{{ toInt(weapon.dicepool) + rangeModifier + modeModifier }}</div>
        </div>
        <div class="item">
          <div>Mode</div>
          <div>{{ weapon.mode }}</div>
        </div>
        <div class="item">
          <div>Kategorie</div>
          <div>{{ weapon.category }}</div>
        </div>
        <div class="item">
          <div>Ammo</div>
          <div>{{ weapon.ammo }}</div>
        </div>
        <div class="item">
          <div>Name</div>
          <div>{{ weapon.weaponname }}</div>
        </div>
        <div class="item">
          <div>Conceal</div>
          <div>{{ weapon.conceal }}</div>
        </div>
        <div class="item">
          <div>Panzerbrechend</div>
          <div>{{ weapon.ap }}</div>
        </div>
        <div class="item">
          <div>Rückstoßkompensation</div>
          <div>{{ weapon.rc }}</div>
        </div>
        <template v-if="weapon.mods.length > 0">
          <div v-for="mod in weapon.mods" class="item">
            {{ mod.name }}
            <template v-if="mod.rating > 0">( {{ mod.rating }} )</template>
            <template v-if="mod.rc != 0">- RC: ( {{ mod.rc }} )</template>
          </div>
        </template>
      </div>
    </div>
  </div>

  <ChangeAmmo v-if="chooseAmmoDialogVisible" @confirm="chooseAmmoDialogVisible = false" @cancel="chooseAmmoDialogVisible = false" />
</template>

<style scoped>

.overlay {
  z-index: 3000;
}

.item:last-of-type {
  border-bottom: none;
}

.weapon-buttons {
  height: 6vh;
  width: 45dvw;
  font-size: 5dvw;
  font-weight: bold;
  padding-left: 2dvw;
  padding-right: 2dvw;
  margin-top: 1vh;
}

.phase {
  width: 100%;
  text-align: center;
}

.gap {
  margin-top: 2dvh;
  width: 100%;
}

.ammo {
  margin-top: 2vh;
  text-align: center;
}

.item {
  height: 4vh;
  border-bottom: 1px solid var(--font-color);
}

::v-deep(.radio) {
  flex-direction: column;
  width: 44vw;
  gap: 1dvh;
}

::v-deep(.radio_label) {
  height: 5vh;
  border-radius: 1dvh;
  border: 1px solid var(--primary-color);
}

.column {
  gap: 1vh;
  align-items: center;
}

.row {
  gap: 2dvw;
  width: 100%;
  justify-content: space-between;
  padding-left: 2dvw;
  padding-right: 2dvw;
}

.sheet-control {
  width: 4vh;
  height: 4vh;
  padding: 0;
  margin: 0;
  font-size: 3.8vh;
  color: var(--accent-color);
  border: none;
}

</style>/