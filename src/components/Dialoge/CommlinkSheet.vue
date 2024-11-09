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

  <div v-if="DialogCommlink.visible && char.commlink" class="modal-overlay" @click="DialogCommlink.hide">
    <div class="modal-content" @click.stop>

      <h1>{{ char.commlink.name}}</h1>
      <h4><span v-for="mod in char.commlink.mods" > {{ mod.name }}</span></h4>
      <div class="row stats">
        <div v-if="char.commlink.system > 0" class="column">
          <strong>{{ char.commlink.system}}</strong>
          <div>System</div>
        </div>
        <div v-if="char.commlink.firewall > 0" class="column">
          <strong>{{char.commlink.firewall}}</strong>
          <div>Firewall</div>
        </div>
        <div v-if="char.commlink.response > 0" class="column">
          <strong>{{char.commlink.response}}</strong>
          <div>Prozessor</div>
        </div>
        <div v-if="char.commlink.signal > 0" class="column">
          <strong>{{char.commlink.signal}}</strong>
          <div>Signal</div>
        </div>
      </div>

      <div class="scroll-box">

        <template v-for="item in char.commlink.programs">
          <div class="item">

            <div class="row">

              <h2>

                {{item.name}} <span v-if="item.extra">({{ item.extra }})</span>

                <template v-if="item.rating > 1">
                  ({{item.rating}})
                </template>

              </h2>

            </div>

          </div>
        </template>

        <template v-for="item in char.commlink.autosofts">
          <div class="item">

            <div class="row">

              <h2>

                {{item.name}} <span v-if="item.extra"> ({{ item.extra }})</span>

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