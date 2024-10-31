<script setup lang="ts">
import {DialogReleaseSpirit, DialogRollDice, DialogSpiritSheet} from "@/composables/dialogs";
import SpiritSchadensmonitor from "@/components/SpiritSchadensmonitor.vue";
import {ref} from "vue";
import RadioButtons from "@/components/RadioButtons.vue";
import ReleaseSpirit from "@/components/Dialoge/ReleaseSpirit.vue";

const services = ref(1);

function add()
{
  services.value = services.value + 1;
  console.log(services.value);
}

function substract()
{
  services.value = services.value - 1;
  console.log(services.value);
}

const boundModes = [
  { label: 'Gebunden', value: 'gebunden' },
  { label: 'Ungebunden', value: 'ungebunden' },
];

const spiritPlanes = [
  { label: 'Materiell', value: 'material' },
  { label: 'Astral', value: 'astral' },
  { label: 'Heimat', value: 'heimat' },
];

const selectedBoundModes = ref<string>('ungebunden');

const selectedSpiritPlane = ref<string>('heimat');

</script>/

<template>

  <ReleaseSpirit v-if="true"/>

  <div v-if="DialogSpiritSheet.visible" class="modal-overlay" @click="DialogSpiritSheet.hide">
    <div class="modal-content" @click.stop>

      <div class="box row spirit">
        <div class="name">
          Hier steht der Name vom Geist und Stufe
        </div>
        <div class="dice release" @click="DialogReleaseSpirit.show"><i class='bx bx-unlink'></i></div>
      </div>

      <div class="content">

        <div class="column skill-column">
          <div class="skills box">

            <div class="scroll-box">

              <div class="item" @click="DialogRollDice.show">
                <div class="skill">Askennen</div>
                <div class="dice skill-dice" @click="DialogRollDice.show">5</div>
              </div>
              <div class="item" @click="DialogRollDice.show">
                <div class="skill">Astralkampf</div>
                <div class="dice skill-dice">5</div>
              </div>
              <div class="item" @click="DialogRollDice.show">
                <div class="skill">Ausweichen</div>
                <div class="dice skill-dice">5</div>
              </div>
              <div class="item" @click="DialogRollDice.show">
                <div class="skill">Waffenloser Kampf</div>
                <div class="dice skill-dice">5</div>
              </div>
              <div class="item" @click="DialogRollDice.show">
                <div class="skill">Wahrnehmung</div>
                <div class="dice skill-dice">5</div>
              </div>
              <div class="item" @click="DialogRollDice.show">
                <div class="skill">Astrale Gestalt</div>
                <div class="dice skill-dice">5</div>
              </div>
              <div class="item" @click="DialogRollDice.show">
                <div class="skill">Bewegung</div>
                <div class="dice skill-dice">5</div>
              </div>
              <div class="item" @click="DialogRollDice.show">
                <div class="skill">Bewusstsein</div>
                <div class="dice skill-dice">5</div>
              </div>
              <div class="item ">
                <div class="skill">Gesteigerte Sinne</div>
                <div class="dice skill-dice">5</div>
              </div>
              <div class="item" @click="DialogRollDice.show">
                <div class="skill">Grauen</div>
                <div class="dice skill-dice">5</div>
              </div>
              <div class="item" @click="DialogRollDice.show">
                <div class="skill">Materialisierung</div>
                <div class="dice skill-dice">5</div>
              </div>
              <div class="item" @click="DialogRollDice.show">
                <div class="skill">Tierbeherrschung</div>
                <div class="dice skill-dice">5</div>
              </div>
              <div class="item" @click="DialogRollDice.show">
                <div class="skill">Verschleierung</div>
                <div class="dice skill-dice">5</div>
              </div>
            </div>

          </div>
        </div>

        <div class="column">

          <div class="box plane">
            <RadioButtons class="mode" v-model="selectedSpiritPlane" :options="spiritPlanes" group="planes"/>
          </div>
          <div class="box binding">
            <RadioButtons class="mode" v-model="selectedBoundModes" :options="boundModes" group="bounded" :selected="ungebunden"/><br>
          </div>
          <div class="box damage">
            <div class="monitor">
              <SpiritSchadensmonitor/>
            </div>
            <div class="lower-header">
              Schadensmonitor
            </div>
          </div>

        </div>

      <div class="column">

        <div class="box initiative">
          <div class="item-special">
            <div>Initiative</div>
            <div class="dice skill-dice" @click="DialogRollDice.show">5</div>
          </div>
          <div class="item-special">
            <div>Durchgänge</div>
            <strong>3</strong>
          </div>
        </div>
        <div class="box resistance">
          <div class="item-special">
            <div>Widerstand: Bannen</div>
            <div class="dice skill-dice" @click="DialogRollDice.show">5</div>
          </div>
          <div class="item-special">
            <div>Widerstand: Binden</div>
            <div class="dice skill-dice" @click="DialogRollDice.show">5</div>
          </div>
        </div>
        <div class="box service">
          <div class="row mod">
            <div class="mutator" @click="substract">-</div>
            <h1>{{ services }}</h1>
            <div class="mutator" @click="add">+</div>
          </div>
          <div class="lower-header">
            Dienste
          </div>
        </div>
      </div>

    </div>

      </div>

  </div>

</template>

<style scoped>

.release {
  align-self: center;
  margin-left: 1.5vh;
}

i {
  margin-top: 0.85vh;
}

.mode {
  height: 100%;
}

.monitor {
  display: flex;
  justify-content: center;
}

.mod {
  align-content: center;
  justify-content: space-evenly;
  margin-bottom: 1vh;
}

.spirit{
  width: 100%;
  height: 8vh;
  text-align: center;
  align-content: center;
}

.item-special {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7vh;
  padding-left: 2vh;
  padding-right: 2vh;
}

.box {
  align-content: center;
  text-align: center;
  font-size: 2.5vh;
}

.resistance {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;
}

.binding{
  flex: 1;
}

.service{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.plane {
  flex: 1;
}

.initiative {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;
}

.damage {
  flex: 5;
}

.dice {
  height: 5vh;
  width: 5vh;
  font-size: 3.5vh;
}

.name {
  position: absolute;
  font-size: 5vh;
  left: 50%;
  top: 0.5vh;
  transform: translateX(-50%);
  width: 80%;
}

.scroll-box {
  height: 96%;
  margin-top: 2%;
  margin-bottom: 2%;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7vh;
}

strong {
  width: 5vh;
  text-align: center;
}

.skills{
  height: 100%;
}

.column {
  flex: 1;
  gap: 2vh;
}

.skill-column{
  flex: 1.3;
}

.content{
  display: flex;
  height: 65vh;
  margin-top: 2vh;
  position: relative;
  gap: 2vh;
}

.modal-overlay {
  z-index: 1000;
  background-color: var(--background-color);
}

.modal-content {
  height: 80vh;
  width: 80vw;
  z-index: 1001;
  position: relative;
  background-color: transparent;
  border: none;
  bottom: 5vh;
}

</style>/