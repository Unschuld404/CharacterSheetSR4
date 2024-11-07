<script setup lang="ts">

import {DialogVehicleSheet} from "@/composables/dialogs";
import RadioButtons from "@/components/RadioButtons.vue";
import {VehicleModes} from "@/composables/consts";
import {computed, ref} from "vue";
import {Vehicle} from "@/composables/vehicle";

const vehicle = ref<Vehicle>(new Vehicle())

const selectedVehicletMode = computed ({
  get() { return vehicle.value.mode },
  set(value) { vehicle.value.mode = value  }
})
</script>/

<template>

  <div v-if="DialogVehicleSheet.visible" class="modal-overlay" @click="DialogVehicleSheet.hide">
    <div class="modal-content" @click.stop>

      <h1 class="box">Name der Drohne</h1>

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

          <div>Skills</div>

          <div>Waffenliste</div>

          <div>Gear-Liste</div>

          <div>Modifikations-Liste</div>

          <div>Programmliste</div>

          <div>Munitionsliste</div>

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
            <RadioButtons class="mode" v-model="selectedVehicletMode" :options="VehicleModes" group="pilot"/>
          </div>

          <div>Toggle für Steuerung: Auto, Remote, VR</div>

          <div>Initiative</div>

          <div>Verteidigung</div>

          <div>Schadensmonitor 8 + Rumpf/2 (aufgerundet)</div>

        </div>

      </div>

    </div>
  </div>

</template>

<style scoped>

.mode {
  border: 1px solid var(--font-color);
  height: 10vh;
}

.resistance {
  height: 80%;
  width: 50%;
  justify-content: space-evenly;
  align-items: center;
}

.resistances {
  height: 15vh;
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
  border: 1px solid red;
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