<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogCommlink} from "@/composables/dialogs";
import {computed} from "vue";
import {type Gear, GearType} from "@/composables/types";
const commlink = computed(()=>{
  return char.gear.find((item:Gear) =>{
    return (item.type == GearType.Commlink) && item.equipped;
  }) ?? null;
})

</script>/

<template>

  <div v-if="DialogCommlink.visible" class="modal-overlay" @click="DialogCommlink.hide">
    <div class="modal-content" @click.stop>

      <h1>{{commlink.name}}</h1>
      <div class="row stats">
        <div v-if="commlink.system > 0" class="column">
          <strong>{{commlink.system}}</strong>
          <div>System</div>
        </div>
        <div v-if="commlink.firewall > 0" class="column">
          <strong>{{commlink.firewall}}</strong>
          <div>Firewall</div>
        </div>
        <div v-if="commlink.response > 0" class="column">
          <strong>{{commlink.response}}</strong>
          <div>Prozessor</div>
        </div>
        <div v-if="commlink.signal > 0" class="column">
          <strong>{{commlink.signal}}</strong>
          <div>Signal</div>
        </div>
      </div>

      <div class="scroll-box">

        <template v-for="item in char.gear">
          <div class="item" v-if="item.type==GearType.Program">

            <div class="row">

              <h2>

                {{item.name}}

                <template v-if="item.rating > 1">
                  ({{item.rating}})
                </template>

              </h2>

              <i class='bx bx-transfer-alt'></i>
            </div>

          </div>
        </template>

      </div>

    </div>
  </div>

</template>

<style scoped>

.stats {
  border-bottom: 2px solid var(--background-color);
}

.scroll-box {
  padding-right: 0;
  margin-top: 1vh;
}

.item {
  border: none;
  border-bottom: 1px solid var(--background-color);
}

.item:last-of-type {
  border-bottom: none;
}

.row {
  width: 100%;
  justify-content: space-between;
  margin-top: 2vh;
  padding-bottom: 2vh;
}

.column {
  align-items: center;
  width: 20vh;
}

i {
  color: var(--accent-color);
  font-weight: bold;
  font-size: 5vh;
  position: absolute;
  right: 0;
  align-self: center;
}

.modal-overlay {
  z-index: 3000;
}

.modal-content{
  width: 90vh;
  height: 60vh;
  z-index: 3001;
}

</style>/