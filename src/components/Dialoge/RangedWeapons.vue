<script setup lang="ts">
import {DialogRangedWeapons} from "@/composables/dialogs";
import {ref} from "vue";
import RadioButtons from "@/components/RadioButtons.vue";

const shootingMode = [
  { label: 'Einzelschuss', value: 'einzelschuss' },
  { label: 'Kurze Salve', value: 'kurzeSalve' },
  { label: 'Lange Salve', value: 'langeSalve' },
  { label: 'Autofeuer', value: 'autofeuer' },
  { label: 'Sperrfeuer', value: 'sperrfeuer' },
];

const reachTable = [
  { label: '0-5', value: 'short' },
  { label: '6-15', value: 'medium' },
  { label: '16-29', value: 'long' },
  { label: '30-40', value: 'extreme' },
];

const selectReach = ref<string>('medium');

const selectShootingMode = ref<string>('einzelschuss');

</script>/

<template>

  <div v-if="DialogRangedWeapons.visible" class="modal-overlay" @click="DialogRangedWeapons.hide">
    <div class="modal-content" @click.stop>

      <div class="the-weapon">

        <div class="row box name"><h1>Name</h1></div>
        <div class="row">
          <div class="column divers">
            <div class="row box">
              <RadioButtons class="mode reach" v-model="selectReach" :options="reachTable" group="distances" id="reach"/>
            </div>
            <div class="row box">Nachladenknopf, Munitionsanzeige und Abziehen</div>
            <div class="row">
              <div class="column box">
                <div class="ap">Panzerbrechend</div>
                <div class="recoil">Rückstoßkompensation</div>
              </div>
              <div class="column box">Schaden</div>
              <div class="shoot box">
                <div class="dice">xx</div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="shooting-mode">
              <RadioButtons class="mode" v-model="selectShootingMode" :options="shootingMode" group="modes" id="mode"/>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>

</template>

<style scoped>

.divers {
  flex: 3;
}

.row {
  gap: 2vh;
}

.column {
  gap: 2vh;
}

.name {
  margin-bottom: 2vh;
}

.the-weapon {
  display: flex;
  flex-direction: column;
}

.modal-overlay {
  z-index: 1000;
  background-color: var(--background-color);
}

.modal-content {
  width: 70vw;
  height: 50vh;
  background-color: transparent;
  border: 1px solid var(--accent-color);
  z-index: 1001;
}

#mode.radio {
  flex-direction: column;
  height: 38vh;
  width: 20vh;
  border: 1px solid var(--font-color);
}

#reach.radio {
  width: 50vh;
}



</style>/