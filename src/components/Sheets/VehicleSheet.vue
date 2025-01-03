<script setup lang="ts">

import {DialogRollDice,  DialogVehicleSheet, DialogWeapon} from "@/composables/dialogs";
import RadioButtons from "@/components/RadioButtons.vue";
import {VehicleModes} from "@/composables/consts";
import {computed, ref} from "vue";

import {Vehicle} from "@/composables/vehicle";
import {char} from "@/composables/char";
import {type VehicleInitiative} from "@/composables/types";
import VehicleAusweichen from "@/components/VehicleAusweichen.vue";
import {toInt, translate} from "@/composables/utils";

const vehicle = computed<Vehicle>(() => DialogVehicleSheet.getVehicle());

const selectedVehicleMode = computed ({
  get() { return vehicle.value.mode },
  set(value) { vehicle.value.mode = value  }
})

const initiative = computed<VehicleInitiative>(() => vehicle.value.initiative );

</script>/

<template>

  <div v-if="DialogVehicleSheet.visible" class="overlay" @click.stop>
    <div class="sheet">
      <div class="sheet-header row">
        <h1>{{ vehicle.name }}</h1>
        <button class="sheet-control" @click="DialogVehicleSheet.hide"><i class='bx bxs-x-square'></i></button>
      </div>
      <div>
        <RadioButtons class="mode" v-model="selectedVehicleMode" :options="VehicleModes" group="pilot"/>
      </div>
      <div class="row">
        <div class="box">
          <div class="left-header">Schadenswiderstand</div>
          <div class="row">
            <div class="button-box" @click="DialogRollDice.setValues(
            {
              name: vehicle.resistance.physical.name,
              value: vehicle.resistance.physical.value,
              values: vehicle.resistance.physical.values,
            }
            ).show()">
              <button>{{ vehicle.resistance.physical.value }}
              </button>
              <div>Normal</div>
            </div>
            <div class="button-box" @click="DialogRollDice.setValues(
            {
              name: vehicle.resistance.elemental.name,
              value: vehicle.resistance.elemental.value,
              values: vehicle.resistance.elemental.values,
            }
            ).show()">
              <button>{{ vehicle.resistance.elemental.value }}
              </button>
              <div>Elementar</div>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="left-header">Initiative</div>
          <div class="column button-box" @click="DialogRollDice.setValues(
            {
              name: initiative.pool.name,
              value: initiative.pool.value,
              values: initiative.pool.values,
            }
            ).show()">
            <button>{{ initiative.pool.value }}</button>
            <div>Initiative</div>
          </div>
        </div>
        <div class="box">
          <div class="left-header">Passes</div>
          <div class="column button-box">
            {{ initiative.passes }}
          </div>
        </div>
      </div>


        <div class="box">
          <div class="left-header">Stats</div>
          <div class="item">Handling<span>{{ vehicle.handling }}</span></div>
          <div class="item">Beschleunigung<span>{{ vehicle.accel }}</span></div>
          <div class="item">Geschwindigkeit<span>{{ vehicle.speed }}</span></div>
          <div class="item">Gerätestufe<span>{{ vehicle.rating }}</span></div>
        </div>
        <div class="box">
          <div class="left-header">Chip</div>
          <div class="item">Prozessor<span>{{ vehicle.processor }}</span></div>
          <div class="item">Signal<span>{{ vehicle.signal }}</span></div>
          <div class="item">System<span>{{ vehicle.system }}</span></div>
          <div class="item">Firewall<span>{{ vehicle.firewall }}</span></div>
        </div>
        <div class="box">
          <div class="left-header">Hardware</div>
          <div class="item">Rumpf<span>{{ vehicle.body }}</span></div>
          <div class="item">Panzerung<span>{{ vehicle.armor }}</span></div>
          <div class="item">Sensor<span>{{ vehicle.sensor }}</span></div>
        </div>
        <div>
          <VehicleAusweichen/>
        </div>
        <div class="box" v-if="vehicle.sensors.length > 0">
          <div class="left-header">Sensoren</div>
          <div v-for="sensor in vehicle.sensors">
           <div class="item column">
             <div>{{ sensor.name }} <span v-if="sensor.rating > 0">({{ sensor.rating }})</span></div>
             <div v-for="mod in sensor.mods">{{ mod.name }}
               <template v-if="mod.rating > 0">( {{ mod.rating }} )</template>
             </div>
           </div>
          </div>
        </div>
          <div class="box" v-if="vehicle.autosofts.length > 0">
            <div v-for="autosoft in vehicle.autosofts">
              <div>{{ autosoft.name }} ({{ autosoft.rating }}) {{ autosoft.skill }}</div>
              <div>XX</div>
            </div>
          </div>
          <div class="box" v-if="vehicle.mods.length > 0">
            <div class="left-header">Mods</div>
            <div class="item" v-for="mod in vehicle.mods">
              {{ mod.name }}
            </div>
          </div>
          <div class="box" v-if="vehicle.weapons.length > 0">
            <div class="left-header">Waffen</div>
            <div class="item" v-for="weapon in vehicle.weapons" @click="!weapon.isMelee
            ? DialogWeapon.setWeapon(weapon).show()
            : DialogRollDice.setValues(
            {
              name: weapon.name,
              value: toInt(weapon.dicepool),
              values: [
                  {name: 'Fertigkeit', value: toInt(weapon.dicepool)-char.attributes.agility.total},
                  {name: 'Geschicklichkeit', value: char.attributes.agility.total},
                  ]
            }
            ).show()">
              {{ weapon.name }}
            </div>
          </div>
          <div class="box" v-if="vehicle.ammunitions.length > 0">
            <div class="left-header">Munition</div>
            <div class="item" v-for="ammunition in vehicle.ammunitions">
              {{ ammunition.count }} x {{ ammunition.name }}<i class='bx bx-transfer-alt'></i>
            </div>
          </div>
    </div>
  </div>

</template>

<style scoped>

button {
  padding-bottom: 1dvw;
}

.sheet-header {
  padding: 0 2dvw 2vw 2dvw;
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

.box {
  padding-left: 2dvw;
  padding-right: 2dvw;
}

.button-box {
  display: flex;
  flex-direction: column;
  width: 20dvw;
  align-items: center;
  background-color: var(--primary-color);
  border-radius: 2dvw;
  padding-top: 4dvw;
  padding-bottom: 4dvw;
  font-size: 4dvw;
}

.row {
  gap: 2dvw;
}

.mode {
  height: 10dvw;
  padding-left: 2dvw;
  padding-right: 2dvw;
  margin-bottom: 2dvw;
}

.item {
  align-items: normal;
  padding-left: 0;
  padding-right: 0;
}

</style>/