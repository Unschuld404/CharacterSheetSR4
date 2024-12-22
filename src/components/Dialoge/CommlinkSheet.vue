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

      <div class="commlink-header">
        <h1>{{ char.commlink.name}}</h1>
        <div v-for="mod in char.commlink.mods">{{ mod.name }}</div>
      </div>

      <div class="row stats">
        <div v-if="char.commlink.system > 0" class="value">
          <strong>{{ char.commlink.system}}</strong>
          <div>System</div>
        </div>
        <div v-if="char.commlink.firewall > 0" class="value">
          <strong>{{char.commlink.firewall}}</strong>
          <div>Firewall</div>
        </div>
        <div v-if="char.commlink.response > 0" class="value">
          <strong>{{char.commlink.response}}</strong>
          <div>Prozessor</div>
        </div>
        <div v-if="char.commlink.signal > 0" class="value">
          <strong>{{char.commlink.signal}}</strong>
          <div>Signal</div>
        </div>
      </div>

      <template v-for="item in char.commlink.programs">
        <div class="item">
          <div class="column">
            <div class="header">
              {{item.name}}
              <template v-if="item.rating > 1">
                ({{item.rating}})
              </template>
            </div>
            <div v-if="item.extra">{{ item.extra }}</div>
          </div>
        </div>
      </template>

      <template v-for="item in char.commlink.autosofts">
        <div class="item">
          <div class="column">
            <div class="header">
              {{item.name}}
              <template v-if="item.rating > 1">
                ({{item.rating}})
              </template>
            </div>
            <div v-if="item.extra"> {{ item.extra }}</div>
            <i class='bx bx-transfer-alt'></i>
          </div>
        </div>
      </template>

    </div>

      <i class='bx bx-chevron-down'></i>

  </div>

</template>

<style scoped>

.commlink-header {
  text-align: center;
}

.stats {
  border-bottom: 2px solid var(--background-color);
}

.row {
  width: 100%;
  justify-content: space-between;
  margin-top: 2vh;
  padding-bottom: 2vh;
}

.value {
  text-align: center;
  align-items: center;
  width: 20vh;
}

.bx-transfer-alt {
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
  width: 90vw;
  max-height: 80%;
  overflow: scroll;
  z-index: 3001;
}

</style>/