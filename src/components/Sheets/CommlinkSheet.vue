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
    <div class="dialog-box" @click.stop>
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

      <strong class="category" v-if="char.commlink.programs.length != 0">Programme</strong>
      <template v-for="item in char.commlink.programs">
        <div class="item">
          <div class="column">
            <div>
              {{item.name}}
              <template v-if="item.rating > 1">
                ({{item.rating}})
              </template>
            </div>
          </div>

        </div>
      </template>
      <strong class="category" v-if="char.commlink.autosofts.length != 0">Autosofts</strong>
      <template v-for="item in char.commlink.autosofts">
        <div class="item">
          <div>
            <div>{{item.name}}
              <template v-if="item.rating > 1">
                ({{item.rating}})
              </template>
            </div>
            <div v-if="item.extra" class="subcaption"> {{ item.extra }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>

</template>

<style scoped>

.dialog-box {
  overflow: scroll;
  padding: 2rem 0 1rem;
  width: 90dvw;
}

.row {
  justify-content: space-between;
  width: 100%;
}

.value {
  width: 100%;
 text-align: center;
  margin: 2rem 0 0;
}

.item {
  padding-left: 3dvw;
}

.item:last-child {
  border-bottom: none;
}

.category {
  align-self: start;
  margin-top: 1rem;
  margin-left: 2dvw;
}


</style>/