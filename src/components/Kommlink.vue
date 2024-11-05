<script setup lang="ts">
import {char} from "../composables/char";
import {computed} from "vue";
import {type Gear, GearType} from "@/composables/types";
const commlink = computed(()=>{
  return char.gear.find((item:Gear) =>{
    return (item.type == GearType.Commlink) && item.equipped;
  }) ?? null;
})
</script>

<template>

  <div v-if="commlink != null" class="box row commlink">
    <div class="header">{{commlink.name}}</div>
    <div class="column">
      <strong>{{commlink.system}}</strong>
      <div>System</div>
    </div>
    <div class="column">
      <strong>{{commlink.firewall}}</strong>
      <div>Firewall</div>
    </div>
    <div class="column">
      <strong>{{commlink.processorlimit}}</strong>
      <div>Prozessor</div>
    </div>
    <div class="column">
      <strong>{{commlink.signal}}</strong>
      <div>Signal</div>
    </div>
  </div>

</template>

<style scoped>

.box {
  height: 100%;
}

.row {
  justify-content: space-between;
  align-items: center;
}

.column {
  text-align: center;
  width: 10vh;
}

.header {
  line-height: 5.5vh;
  width: 50%;
}

strong {
  margin-bottom: 1vh;
}

.commlink {
  position: relative;
}

</style>