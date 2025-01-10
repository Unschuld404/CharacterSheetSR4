<script setup lang="ts">

import {DialogLoadAutosoft, DialogRollDice, DialogVehicleSheet, DialogWeapon} from "@/composables/dialogs";
import RadioButtons from "@/components/RadioButtons.vue";
import {VehicleModes} from "@/composables/consts";
import {computed} from "vue";

import {Vehicle} from "@/composables/vehicle";
import {type VehicleInitiative} from "@/composables/types";
import VehicleAusweichen from "@/components/VehicleAusweichen.vue";
import MagazinInfo from "@/components/MagazinInfo.vue";
import {char} from "@/composables/char";
import {toInt} from "@/composables/utils";

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
        <div v-if="vehicle.nickname" class="column">
          <h1>{{vehicle.nickname}}</h1>
          <div>{{ vehicle.name }}</div>
        </div>
        <div v-else>
          <h1>{{ vehicle.name }}</h1>
        </div>
        <button class="sheet-control" @click="DialogVehicleSheet.hide"><i class='bx bxs-x-square'></i></button>
      </div>
      <RadioButtons class="mode" v-model="selectedVehicleMode" :options="VehicleModes" group="pilot"/>
      <div class="combo-row">
        <div class="box">
          <strong class="category">Schadenswiderstand</strong>
          <div class="row">
            <div class="dice-column" @click="DialogRollDice.setValues(
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
            <div class="dice-column" @click="DialogRollDice.setValues(
            {
              name: vehicle.resistance.elemental.name,
              value: vehicle.resistance.elemental.value,
              values: vehicle.resistance.elemental.values,
            }
            ).show()">
              <button class="dice">{{ vehicle.resistance.elemental.value }}
              </button>
              <div>Elementar</div>
            </div>
          </div>
        </div>
        <div class="box">
          <strong class="category">Initiative</strong>
          <div class="row">
            <div class="dice-column" @click="DialogRollDice.setValues(
            {
              name: initiative.pool.name,
              value: initiative.pool.value,
              values: initiative.pool.values,
            }
            ).show()">
              <button>{{ initiative.pool.value }}</button>
              <div>Initiative</div>
            </div>
            <div class="dice-column">
              <div class="passes">
                {{ initiative.passes }}
              </div>
              <div>
                Passes
              </div>
            </div>
          </div>
          </div>
      </div>
      <div>
        <VehicleAusweichen/>
      </div>
      <div class="box" v-if="vehicle.weapons.length > 0">
        <strong class="category">Waffen</strong>
        <template v-for="weapon in vehicle.weapons">
          <template v-if="weapon.isMelee">
            <div class="item normal-column" @click="
                DialogRollDice.setValues(
                {
                  name: weapon.name,
                  value: toInt(weapon.dicepool),
                  values: [
                      {name: 'Fertigkeit', value: toInt(weapon.dicepool)-char.attributes.agility.total},
                      {name: 'Geschicklichkeit', value: char.attributes.agility.total},
                      ]
                }
                ).show()">
              <div>{{ weapon.name }}</div>
              <button class="dice" >{{ weapon.dicepool }}</button>
            </div>
          </template>
          <template v-else>
            <div class="item normal-column" @click="DialogWeapon.setWeapon(weapon).show()">
              <div class="clickable">{{ weapon.name }}</div>
              <div class="combo-row" v-if="weapon.isLoaded">
                <div>{{ weapon.ammoLoaded }}</div>
                <MagazinInfo :bulletsLeft="weapon.bulletsLeft" :magSize="weapon.magSize" />
              </div>
            </div>
          </template>
        </template>
      </div>

      <div class="box" v-if="vehicle.getAmmunitions().length > 0">
        <strong class="category">Munition</strong>
        <div class="item" v-for="ammunition in vehicle.getAmmunitions()">
          {{ ammunition.count }} x {{ ammunition.name }}<i class='bx bx-transfer-alt'></i>
        </div>
      </div>

      <div class="box" v-if="vehicle.sensors.length > 0">
        <strong class="category">Sensoren</strong>
        <div v-for="sensor in vehicle.sensors">
          <div class="item normal-column">
            <div>{{ sensor.name }} <span v-if="sensor.rating > 0">({{ sensor.rating }})</span></div>
            <div class="mods" v-for="mod in sensor.mods">{{ mod.name }}
              <template v-if="mod.rating > 0">( {{ mod.rating }} )</template>
            </div>
          </div>
        </div>
      </div>

      <div class="box">
        <strong class="category">Autosofts <i class='bx bxs-cog' @click="DialogLoadAutosoft.show()" ></i></strong>
        <template v-for="autosoft in vehicle.getAutosofts()">
          <div class="item">{{ autosoft.name }} ({{ autosoft.rating }}) <template v-if="autosoft.extra">- {{ autosoft.extra}}</template> <span>{{ autosoft.skill }}</span></div>
        </template>
      </div>

      <div class="box" v-if="vehicle.mods.length > 0">
        <strong class="category">Mods</strong>
        <div class="item" v-for="mod in vehicle.mods">
          {{ mod.name }}
        </div>
      </div>

      <div class="box">
        <strong class="category">Stats</strong>
        <div class="item">Handling<span>{{ vehicle.handling }}</span></div>
        <div class="item">Beschleunigung<span>{{ vehicle.accel }}</span></div>
        <div class="item">Geschwindigkeit<span>{{ vehicle.speed }}</span></div>
        <div class="item">Gerätestufe<span>{{ vehicle.rating }}</span></div>
      </div>

      <div class="box">
        <strong class="category">Chip</strong>
        <div class="item">Prozessor<span>{{ vehicle.processor }}</span></div>
        <div class="item">Signal<span>{{ vehicle.signal }}</span></div>
        <div class="item">System<span>{{ vehicle.system }}</span></div>
        <div class="item">Firewall<span>{{ vehicle.firewall }}</span></div>
      </div>

      <div class="box">
        <strong class="category">Hardware</strong>
        <div class="item">Rumpf<span>{{ vehicle.body }}</span></div>
        <div class="item">Panzerung<span>{{ vehicle.armor }}</span></div>
        <div class="item">Sensor<span>{{ vehicle.sensor }}</span></div>
      </div>

    </div>
  </div>

</template>

<style scoped>

button {
  padding-bottom: 0.5rem;
}

.dice {
  margin-right: 3dvw;
}

.mods {
  padding-left: 0.5rem;
}

.sheet-header {
  padding: 0 2dvw 2vw 2dvw;
  margin-bottom: 1rem;
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

.row {
  padding: 0 1dvw;
  justify-content: space-between;
  gap: 2dvw;
}

.mode {
  height: 3rem;
  margin: 0 1dvw 1rem;
  gap: 0.5rem;
}

.item {
  align-items: center;
}

.item:last-child {
  border-bottom: none;
  margin-bottom: 0.5rem;
}

.normal-column {
  flex-direction: column;
  align-items: normal;
}

.dice-column {
  width: 22vw;
}

.passes {
  padding-bottom: 0.5rem;
}

.combo-row {
  display: flex;
  justify-content: space-between;
}

</style>/