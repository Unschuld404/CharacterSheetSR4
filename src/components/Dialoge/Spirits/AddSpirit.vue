<script setup lang="ts">
import {DialogAddSpirit} from "@/composables/dialogs";
import {type SpiritType, SpiritTypes} from "@/composables/spirits";

const choose = (type: SpiritType) => {
  DialogAddSpirit.type = type;
}

</script>

<template>

  <div v-if="DialogAddSpirit.visible" class="overlay" @click="DialogAddSpirit.hide()">

    <div v-if="DialogAddSpirit.doChooseType" class="popup dialog-box" @click.stop>
      <div class="column-choose">
        <div  v-for="(item, index) in SpiritTypes"
              :key="index"
              :class="['type', {active: DialogAddSpirit.selectedType === item.name }]"
              @click="choose(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <div v-else class="popup dialog-box" @click.stop>
      <h1>{{ DialogAddSpirit.selectedType}}</h1>

      <div class="column">
        <div v-if="!DialogAddSpirit.isWatcher" class="row" >
          <div class="force">Kraft</div>
          <div class="mutator" @click="DialogAddSpirit.substractForce()">-</div>
          <div class="value">{{ DialogAddSpirit.force }}</div>
          <div class="mutator" @click="DialogAddSpirit.addForce()">+</div>
        </div>

        <div class="row">
          <div class="services">Dienste</div>
          <div class="mutator" @click="DialogAddSpirit.substractServices()">-</div>
          <div class="value">{{ DialogAddSpirit.services }}</div>
          <div class="mutator" @click="DialogAddSpirit.addServices()">+</div>
        </div>

      </div>

      <div class="row">
        <button class="confirm" @click="DialogAddSpirit.commit()">Hinzufügen</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.column-choose {
  margin-top: 1vh;
  justify-content: space-evenly;
  width: 95%;
}

.modal-content {
  width: 50vh;
  max-height: 65vh;
  overflow: scroll;
  z-index: 1001;
}

.column {
  height: 30vh;
  justify-content: space-around;
}

.row {
  height: 8vh;
  line-height: 8vh;
  font-size: 4vh;
  align-items: center;
  gap: 1vh;
  justify-content: center;
}

.value {
  width: 10vh;
  text-align: center;
  font-weight: bold;
}

.force, .services {
  width: 20vh;
}

.type {
  appearance: none;
  text-align: center;
  font-size: 3vh;
  color: var(--accent-color);
  line-height: 7vh;
  background-color: var(--background-color);
  border: none;
  border-radius: 1vh;
  margin-bottom: 1vh;
}

</style>