<script setup lang="ts">

import {DialogRollDice, DialogVehicleSheet} from "@/composables/dialogs";
import RadioButtons from "@/components/RadioButtons.vue";
import {VehicleModes} from "@/composables/consts";
import {computed} from "vue";
import Ausweichen from "@/components/Ausweichen.vue";
import {Vehicle} from "@/composables/vehicle";
import {char} from "@/composables/char";
import {type Initiative, VehicleMode} from "@/composables/types";
import VehicleAusweichen from "@/components/VehicleAusweichen.vue";

const vehicle = computed<Vehicle>(() => DialogVehicleSheet.getVehicle());

const selectedVehicleMode = computed ({
  get() { return vehicle.value.mode },
  set(value) { vehicle.value.mode = value  }
})

const initiative = computed<Initiative>(() =>
    vehicle.value.initiative
      ?? (selectedVehicleMode.value == VehicleMode.Remote
            ? char.initiative.normal
            : char.initiative.matrix) );


</script>/

<template>

  <div v-if="DialogVehicleSheet.visible" class="modal-overlay" @click="DialogVehicleSheet.hide">
    <div class="modal-content">

      <h1 class="box" @click.stop>{{ vehicle.name }}</h1>

      <div class="main-row row">

        <div class="main-column column info">

          <div class="box" @click.stop>

            <div class="line">Handling<span>{{ vehicle.handling }}</span></div>
            <div class="line">Beschleunigung<span>{{ vehicle.accel }}</span></div>
            <div class="line">Geschwindigkeit<span>{{ vehicle.speed }}</span></div>
            <div class="line">Gerätestufe<span>{{ vehicle.rating }}</span></div>

          </div>

          <div class="box" @click.stop>

            <div class="line">Prozessor<span>{{ vehicle.processor }}</span></div>
            <div class="line">Signal<span>{{ vehicle.signal }}</span></div>
            <div class="line">System<span>{{ vehicle.system }}</span></div>
            <div class="line">Firewall<span>{{ vehicle.firewall }}</span></div>

          </div>

          <div class="box" @click.stop>

            <div class="line">Rumpf<span>{{ vehicle.body }}</span></div>
            <div class="line">Panzerung<span>{{ vehicle.armor }}</span></div>
            <div class="line">Sensor<span>{{ vehicle.sensor }}</span></div>
            <div class="line">Pilot/Befehl/Prozessor<span>X</span></div>

          </div>

        </div>

        <div class="main-column column lists">

          <div class="box" v-if="vehicle.sensors.length > 0" @click.stop>
            <div v-for="sensor in vehicle.sensors" class="line sensor column">
              <div class="sensor-name">{{ sensor.name }} ({{ sensor.rating }})</div>
              <div v-for="mod in sensor.mods" class="line mod">{{ mod.name }}
                <template v-if="mod.rating > 0">( {{ mod.rating }} )</template>
              </div>
            </div>
          </div>

          <div class="flex-scroll">

            <div class="box" v-if="vehicle.autosofts.length > 0" @click.stop>
              <div class="line autosoft" v-for="autosoft in vehicle.autosofts">
                <div>{{ autosoft.name }} ({{ autosoft.rating }}) {{ autosoft.skill }}</div>
                <div class="dice line-dice">XX</div>
              </div>
            </div>

            <div class="box" v-if="vehicle.mods.length > 0" @click.stop>
              <div class="line" v-for="mod in vehicle.mods">
                {{ mod.name }}
              </div>
            </div>

            <div class="box" v-if="vehicle.weapons.length > 0" @click.stop>
              <div class="line" v-for="weapon in vehicle.weapons">
                {{ weapon.name }}
              </div>
            </div>

            <div class="box" v-if="vehicle.ammunitions.length > 0" @click.stop>
              <div class="line" v-for="ammunition in vehicle.ammunitions">
                {{ ammunition.count }} x {{ ammunition.name }}<i class='bx bx-transfer-alt'></i>
              </div>
            </div>

          </div>

        </div>

        <div class="main-column column active">

          <div class="box row resistances" @click.stop>

            <div class="column resistance">
              <div>Normal</div>
              <button class="dice" @click="DialogRollDice.setValues(
              {
                name: 'Normaler Widerstand',
                value: vehicle.resistance.mundan,
                values: [
                    {name: 'Rumpf', value: vehicle.body},
                    ...(vehicle.armor > 0 ? [{ name: 'Panzerung', value: vehicle.armor }] : []),
                    ]
              }
              ).show()">{{ vehicle.resistance.mundan }}
              </button>
            </div>
            <div class="column resistance">
              <div>Elementar</div>
              <button class="dice" @click="DialogRollDice.setValues(
              {
                name: 'Elementarwiderstand',
                value: vehicle.resistance.elemental,
                values: [
                    ...(vehicle.armor > 0 ? [{ name: '2x Panzerung', value: (vehicle.armor)*2 }] : []),
                    ]
              }
              ).show()">{{ vehicle.resistance.elemental }}
              </button>
            </div>

            <div class="lower-header">Schadenswiderstand</div>

          </div>

          <div class="pilot toggle" @click.stop>
            <RadioButtons class="mode" v-model="selectedVehicleMode" :options="VehicleModes" group="pilot"/>
          </div>

          <div class="box row" @click.stop>

            <div class="column initiative">
              <div>Initiative</div>
              <button class="dice" @click="DialogRollDice.setValues(
              {
                name: 'Initiative',
                value: initiative.value,
                values:
                [
                    ...(vehicle.armor > 0 ? [{ name: '2x Panzerung', value: (vehicle.armor)*2 }] : []),
                    ]
              }
              ).show()">{{ initiative.value }}
              </button>
            </div>
            <div class="column initiative">
              <div>Durchgänge</div>
              <strong>{{ initiative.passes }}</strong>
            </div>

          </div>

          <div class="dodge" @click.stop>
            <VehicleAusweichen/>
          </div>

          <div class="box damage" @click.stop>
            <div class="lower-header">Schaden</div>
          </div>

        </div>

      </div>

    </div>
  </div>

</template>

<style scoped>

.mod {
  padding-left: 5vh;
  display: flex;
}

i {
  color: var(--accent-color);
  font-weight: bold;
  font-size: 3vh;
  position: absolute;
  right: 0;
  margin-top: 1vh;
}

.sensor {
  display: flex;
  justify-content: space-between;
}

.line-dice {
  line-height: 4vh;
}

.autosoft {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box {
  width: 100%;
}

.flex-scroll {
  padding-right: 0;
}

.damage {
  height: 20vh;
}

.dodge {
  height: 13vh;
}

.mode {
  border: 1px solid var(--font-color);
  height: 8vh;
}

.resistance, .initiative {
  height: 80%;
  width: 50%;
  justify-content: space-evenly;
  align-items: center;
}

.initiative {
 align-items: center;
}

.resistances {
  height: 12vh;
}

.line {
  border-bottom: 1px solid var(--background-color);
  position: relative;
  line-height: 5vh;
}

.line:last-child {
  border: none;
}

span {
  position: absolute;
  right: 0;
  font-weight: bold;
}

h1 {
  margin-bottom: 2vh;
}

.info {
  flex: 1;
}

.active {
  flex: 1;
}

.lists {
  flex: 2;
}

.main-column {
  height: 75vh;
  gap: 2vh;
}

.main-row {
  justify-content: space-between;
  gap: 2vh;
}

.modal-overlay {
  z-index: 1000;
  background-color: var(--background-color);
}

.modal-content {
  z-index: 1001;
  height: 85vh;
  width: 90vw;
  border: none;
  padding: 0;
  background: transparent;
}

</style>/