<script setup lang="ts">

import {DialogVehicleSheet} from "@/composables/dialogs";
import RadioButtons from "@/components/RadioButtons.vue";
import {VehicleModes} from "@/composables/consts";
import {computed} from "vue";
import Ausweichen from "@/components/Ausweichen.vue";
import {Vehicle} from "@/composables/vehicle";
import {char} from "@/composables/char";
import {type Initiative, VehicleMode} from "@/composables/types";

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
    <div class="modal-content" @click.stop>

      <h1 class="box">{{ vehicle.name }}</h1>

      <div class="main-row row">

        <div class="main-column column info">

          <div class="box">

            <div class="line">Handling<span>X</span></div>
            <div class="line">Beschleunigung<span>X</span></div>
            <div class="line">Geschwindigkeit<span>X</span></div>
            <div class="line">Gerätestufe<span>X</span></div>

          </div>

          <div class="box">

            <div class="line">Prozessor (Response)<span>X</span></div>
            <div class="line">Signal(km)<span>X</span></div>
            <div class="line">System<span>X</span></div>
            <div class="line">Firewall<span>X</span></div>

          </div>

          <div class="box">

            <div class="line">Rumpf<span>X</span></div>
            <div class="line">Panzerung<span>X</span></div>
            <div class="line">Sensor<span>X</span></div>
            <div class="line">Pilot/Befehl/Prozessor<span>X</span></div>

          </div>

        </div>

        <div class="main-column column lists">

          <div class="box">
            <div class="line sensor">
              <div class="sensor-name">Kamera (5)</div>
              <div>Subcaption</div>
            </div>
            <div class="line sensor">
              <div class="sensor-name">Radar (5)</div>
              <div>Subcaption</div>
            </div>
            <div class="line sensor">
              <div class="sensor-name">Mikrofon (5)</div>
              <div>Selektiver Geräuschfilter (1)</div>
            </div>
          </div>

          <div class="flex-scroll">

            <div class="box">
              <div class="line autosoft">
                <div>Eletronische Kriegsführung (5)</div>
                <div class="dice line-dice">XX</div>
              </div>
              <div class="line autosoft">
                <div>Steuerung (5)</div>
                <div class="dice line-dice">XX</div>
              </div>
              <div class="line autosoft">
                <div>Abwehr (5)</div>
                <div class="dice line-dice">XX</div>
              </div>
              <div class="line autosoft">
                <div>Zielerfassung (5)</div>
                <div class="dice line-dice">XX</div>
              </div>
              <div class="line autosoft">
                <div>Clearsight (5)</div>
                <div class="dice line-dice">XX</div>
              </div>
              <div class="line autosoft">
                <div>Verdeckte Operation (5)</div>
                <div class="dice line-dice">XX</div>
              </div>
            </div>

            <div class="box">
              <div class="line">Riggeradaption</div>
              <div class="line">Läufer-Modus</div>
              <div class="line">Verbessertes Start-/Landeprofil Level 2</div>
              <div class="line">Chamäleonüberzug</div>
              <div class="line">Pilotprogram (Stufe 5)</div>
            </div>

            <div class="box">
              <div class="line">Ingram White Knight</div>
              <div class="line">HK 227-X</div>
            </div>

            <div class="box">
              <div class="line">250 X Munition: Standardmunition<i class='bx bx-transfer-alt'></i></div>
              <div class="line">30 X Munition: Explosivgeschosse<i class='bx bx-transfer-alt'></i></div>
            </div>

          </div>

        </div>

        <div class="main-column column active">

          <div class="box row resistances">

            <div class="column resistance">
              <div>Physisch</div>
              <div class="dice">XX</div>
            </div>
            <div class="column resistance">
              <div>Magisch</div>
              <div class="dice">XX</div>
            </div>

            <div class="lower-header">Schadenswiderstand</div>

          </div>

          <div class="pilot toggle">
            <RadioButtons class="mode" v-model="selectedVehicleMode" :options="VehicleModes" group="pilot"/>
          </div>

          <div class="box row">

            <div class="column initiative">
              <div>Initiative</div>
              <div class="dice">{{ initiative.value }}</div>
            </div>
            <div class="column initiative">
              <div>Durchgänge</div>
              <strong>{{ initiative.passes }}</strong>
            </div>

          </div>

          <div class="dodge">
            <Ausweichen/>
          </div>

          <div class="box damage">
            <div class="lower-header">Schaden</div>
          </div>

        </div>

      </div>

    </div>
  </div>

</template>

<style scoped>

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