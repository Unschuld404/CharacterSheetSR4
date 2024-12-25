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

  <div v-if="DialogCommlink.visible && char.commlink" class="overlay" @click="DialogCommlink.hide">
    <div class="popup dialog-box" @click.stop>
      <h1>{{ char.commlink.name}}</h1>
      <div v-for="mod in char.commlink.mods">{{ mod.name }}</div>
      <div class="row">
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
      <strong class="item" v-if="char.commlink.programs.length != 0">Programme</strong>
      <template v-for="item in char.commlink.programs">
        <div class="item">
          {{item.name}}
          <template v-if="item.rating > 1">
            ({{item.rating}})
          </template>
        </div>
      </template>
      <strong class="item" v-if="char.commlink.autosofts.length != 0">Autosofts</strong>
      <template v-for="item in char.commlink.autosofts">
        <div class="item">
          <div class="column">
            {{item.name}}
            <template v-if="item.rating > 1">
              ({{item.rating}})
            </template>
            <div v-if="item.extra"> {{ item.extra }}</div>
          </div>
          <i class='bx bx-transfer-alt'></i>
        </div>
      </template>
    </div>
  </div>

</template>

<style scoped>

strong {
  margin-top: 2dvh;
  width: 100%;
}

.row {
  justify-content: space-between;
}

.value {
  text-align: center;
  align-items: center;
  width: 20vh;
}

.bx-transfer-alt {
  color: var(--accent-color);
  font-weight: bold;
  font-size: 3dvh;
  position: absolute;
  right: 0;
  align-self: center;
}

.dialog-box {
  padding-top: 2vh;
}

</style>/