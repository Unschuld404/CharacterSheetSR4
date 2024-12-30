<script setup lang="ts">
import {DialogRollDice, DialogWeapon} from "@/composables/dialogs";
import {computed, ref, watch} from "vue";
import RadioButtons from "@/components/RadioButtons.vue";
import {getModeModifier, getRangeModifierForRange, getShootingMode, shootingMode} from "@/composables/weapons";
import {toInt} from "@/composables/utils";
import ChangeAmmo from "@/components/Dialoge/ChangeAmmo.vue";
import {char} from "@/composables/char";


const selectReach = ref<string>('short');
const chooseAmmoDialogVisible = ref(false);
const isBlinking = ref(false);

const weapon  = computed( () => {
    return DialogWeapon.weapon;
})

const setting = computed(() => {
  return DialogWeapon.setting;
})

const selectShootingMode = computed({
  get: () => setting.value == null ? 'einzelschuss' : setting.value.selectedMode,
  set: (value) => {
    setting.value.selectedMode = value;
  }
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
  return getModeModifier( selectShootingMode.value, toInt(weapon.value.rc), 0, bulletsToFire.value );
})

const ammoLeft = computed(() =>  DialogWeapon?.setting?.ammoLeft ?? 0 )

const bulletsToFire = computed(() => {
  return Math.min(ammoLeft.value, getShootingMode(selectShootingMode.value)?.count ?? 0);
})
const bulletsLeftAfterFire = computed(() => {
  return Math.max(ammoLeft.value - bulletsToFire.value, 0);
})
const bulletStyle = computed(() => {
  const maxWith = 200;
  const widthPerBullet = Math.max(4, maxWith/ setting.value.magSize);
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
          <RadioButtons class="mode" v-model="selectReach" :options="ranges" group="distances"/>
        </div>
        <div class="column">
          <strong>Modus-Mod</strong>
          <div>{{ modeModifier }}</div>
          <div>Schussmodus</div>
          <RadioButtons class="mode" v-model="selectShootingMode" :options="shootingMode" group="modes"/>
        </div>
      </div>
      <div v-if="isLoaded()" class="ammo">
       {{ setting.ammoLoaded }}  ({{ setting.magType }})
      </div>
      <div v-if="isLoaded()" class="ammo">
        Anzahl Kugeln: {{ bulletsToFire }}
      </div>
      <div v-if="isLoaded()" class="magazine">
        {{ bulletsLeftAfterFire }}  ({{ setting.ammoLeft }}) <span
            v-for="index in setting.magSize"
            :key="index"
            class="bullet"
            :style="bulletStyle"
            :class="{
              'used': index > setting.ammoLeft,
              'to-fire': index > bulletsLeftAfterFire && index <= setting.ammoLeft,
              'blink': isBlinking && index > bulletsLeftAfterFire && index <= setting.ammoLeft,
            }"
        ></span> {{ setting.magSize }}
      </div>

      <div class="row">
        <div class="column">
          <div v-if="isLoaded()">
            <button class="weapon-buttons" @click="load">switch ammo</button>
          </div>
          <div v-if="isLoaded()">
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