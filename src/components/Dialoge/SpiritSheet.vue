<script setup lang="ts">
import {DialogRollDice, DialogSpiritSheet} from "@/composables/dialogs";
import KoerperlicherSchadensmonitor from "@/components/KoerperlicherSchadensmonitor.vue";
</script>/

<template>

  <div v-if="DialogSpiritSheet.visible" class="modal-overlay" @click="DialogSpiritSheet.hide">
    <div class="modal-content" @click.stop>

      <div class="row">
        <div class="begone">
          Geist entlassen
        </div>
        <h1 class="critter-name">Geist der Tiere Stufe 5</h1>
      </div>

      <div class="row">

        <div class="column">

        <div class="resistances box">

          <div class="row">
            <div class="block">
              <div>Bannen</div>
              <div class="total-value roll">2</div>
            </div>

            <div class="block">
              <div>Binden</div>
              <div class="total-value roll">2</div>
            </div>
            <div class="lower-header">Widerstände</div>
          </div>

        </div>

        <div class="services box">
          <div class="lower-header">Dienste</div>
        </div>

          <div class="plane box">
            <div class="lower-header">Aktuelle Ebene</div>
          </div>

        </div>

        <div class="column">

          <div class="initiatives box">

            <div class="row">
              <div class="block">
                <div>Initiative</div>
                <div class="total-value roll">2</div>
              </div>

              <div class="block">
                <div>Durchgänge</div>
                <div class="roll">2</div>
              </div>
            </div>

            <div class="lower-header">Initiative</div>
          </div>

          <div class="monitor box">
            <div class="lower-header">Schadensmonitor</div>
          </div>

        </div>

        <div class="column scroll-box">

          <div class="item row">
            <div class="skill">Askennen</div>
            <div class="total-value" @click="DialogRollDice.show">5</div>
          </div>
          <div class="item row">
            <div class="skill">Astralkampf</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Ausweichen</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Waffenloser Kampf</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Wahrnehmung</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Astrale Gestalt</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Bewegung</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Bewusstsein</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Gesteigerte Sinne</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Grauen</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Materialisierung</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Tierbeherrschung</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Verschleierung</div>
            <div class="total-value">5</div>
          </div>

        </div>

      </div>

    </div>
  </div>

</template>

<style scoped>

.item {
  font-size: 3vh;
  line-height: 5vh;
  justify-content: space-between;
  align-items: center;
  border-color: var(--background-color);
}

.total-value {
  line-height: 4vh;
}

h1 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.resistances, .initiatives {
  flex: 1;
  display: flex;
  justify-content: space-evenly;
}

.block {
  display: flex;
  flex-direction: column;
  width: 20vh;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 3vh;
}

.roll {
  width: 8vh;
  height: 8vh;
  font-size: 5vh;
  align-content: center;
  text-align: center;
}

.services {
  flex: 2;
}

.plane {
  flex: 1;
}

.initiatives {
  width: 100%;
}

.monitor {
  flex: 3;
}

.row {
  align-items: center;
}

.column {
  margin-top: 3vh;
  height: 65vh;
  flex: 1;
}

.scroll-box {
  padding-left: 0;
  padding-right: 0;
}

.box {
  border: none;
  border-bottom: 1px solid var(--accent-color);
  border-radius: 0;
}

.lower-header {
  color: var(--accent-color)
}

.modal-overlay {
  z-index: 1000;
}

.modal-content {
  height: 80vh;
  width: 80vw;
  z-index: 1001;
  position: relative;
}

</style>/