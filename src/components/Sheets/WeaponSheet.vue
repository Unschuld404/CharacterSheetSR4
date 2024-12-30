<script setup lang="ts">
import {DialogRollDice, DialogWeapon} from "@/composables/dialogs";
import {computed, ref, watch} from "vue";
import RadioButtons from "@/components/RadioButtons.vue";
import {
  getRangeModifierForRange,
  shootingMode,
  WeaponSetting
} from "@/composables/weapons";
import {toInt} from "@/composables/utils";
import ChangeAmmo from "@/components/Dialoge/ChangeAmmo.vue";
import {char} from "@/composables/char";


const selectedRange = ref<string>('short');
const chooseAmmoDialogVisible = ref(false);
const isBlinking = ref(false);

const weapon  = computed( () => DialogWeapon.weapon  )
const ranges  = computed( () => DialogWeapon.weapon.getRanges )
const rangeModifier = computed(() => getRangeModifierForRange(selectedRange.value))
const modeModifier = computed(() => DialogWeapon.weapon.shootingModeModifier )
const bulletsLeft = computed(() =>  DialogWeapon.weapon.bulletsLeft )
const bulletsToFire = computed(() => DialogWeapon?.weapon?.bulletsToFire ?? 0 )
const bulletsLeftAfterFire = computed(() => DialogWeapon.weapon.bulletsLeftAfterFire)
const isLoaded = computed(() => DialogWeapon.weapon.isLoaded )
const selectedShootingMode = computed({
  get: () => DialogWeapon.weapon?.shootingMode ?? (new WeaponSetting()).selectedMode,
  set: (value) => DialogWeapon.weapon.shootingMode = value
})

const bulletStyle = computed(() => {
  const maxWith = 200;
  const widthPerBullet = maxWith/ Math.max(1, weapon.value.magSize);
  return {
    width: widthPerBullet + 'px',
  }
})

watch(bulletsToFire, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    isBlinking.value = true;
    setTimeout(() => {
      isBlinking.value = false;
    }, 500);
  }
});

function reload()
{
  weapon.value.reload();
}

function load()
{
  chooseAmmoDialogVisible.value = true;
}

function shoot()
{
  weapon.value.shoot();
}

</script>/

<template>

  <ChangeAmmo v-if="chooseAmmoDialogVisible" @confirm="chooseAmmoDialogVisible = false" @cancel="chooseAmmoDialogVisible = false" />

  <div v-if="DialogWeapon.visible" class="overlay" @click="DialogWeapon.hide">
    <div class="sheet" @click.stop>
      <div class="sheet-header row">
        <button class="close" @click="DialogWeapon.hide"><i class='bx bx-x'></i></button>
        <h1>{{ weapon.name }}</h1>
        <div style="width: 5vh;"></div>
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
          <RadioButtons class="mode" v-model="selectedShootingMode" :options="shootingMode" group="modes"/>
        </div>
      </div>
      <div v-if="isLoaded" class="ammo">
       {{ weapon.ammoLoaded }}  ({{ weapon.magType }})
      </div>
      <div v-if="isLoaded" class="ammo">
        Anzahl Kugeln: {{ bulletsToFire }}
      </div>
      <div v-if="isLoaded" class="magazine">
        {{ bulletsLeftAfterFire }}  ({{ bulletsLeft }}) <span
            v-for="index in weapon.magSize"
            :key="index"
            class="bullet"
            :style="bulletStyle"
            :class="{
              'used': index > bulletsLeft,
              'to-fire': index > bulletsLeftAfterFire && index <= bulletsLeft,
              'blink': isBlinking && index > bulletsLeftAfterFire && index <= bulletsLeft,
            }"
        ></span> {{ weapon.magSize }}
      </div>

      <div class="row">
        <div class="column">
          <div v-if="isLoaded">
            <button class="weapon-buttons" @click="load">switch ammo</button>
          </div>
          <div v-if="isLoaded">
            <button class="weapon-buttons" @click="reload">reload</button>
          </div>
          <div v-else class="empty" >
            <button class="weapon-buttons" @click="load">Munition laden</button>
          </div>
        </div>
        <div class="column">
          <button class="weapon-buttons" @click="shoot">schiessen</button>

          <button class="weapon-buttons" @click="DialogRollDice.setValues(
          {
            name: weapon.name,
            value: toInt(weapon.dicepool) + rangeModifier + modeModifier,
            values: [
                {name: 'Fertigkeit', value: toInt(weapon.dicepool)-char.attributes.agility.total},
                {name: 'Geschicklichkeit', value: char.attributes.agility.total},
                {name: 'Distanz', value: rangeModifier},
                {name: 'Modus', value: modeModifier},
                ]
          }
          ).show()">
            ({{ toInt(weapon.dicepool) + rangeModifier + modeModifier }}) Würfel
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
          <div>{{ toInt(weapon.dicepool) + rangeModifier - modeModifier }}</div>
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

</template>

<style scoped>

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

.gap {
  margin-top: 2dvh;
  width: 100%;
}

.ammo {
  margin-top: 2vh;
  text-align: center;
}

 .magazine {
   display: flex;
   justify-content: center;
 }

.bullet {
  height: 20px;
  margin-right: 1px;
  background-color: green;
}
.bullet.used {
  background-color: dimgray;
}
.bullet.to-fire {
  background-color: yellow;
}
.bullet.fired {
  background-color: red;
}

/* Einfaches Blinken */
@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
.blink {
  animation: blink 0.5s linear 1;
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

</style>/