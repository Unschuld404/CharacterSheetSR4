<script setup lang="ts">
import {char} from "@/composables/char";
import {computed} from "vue";
import {DialogCommlink} from "@/composables/dialogs";
const commlink = computed(()=>{
  return char.commlink;
})
</script>

<template>

  <div v-if="commlink != null" class="box" @click="DialogCommlink.show">
    <strong>Kommlink !</strong>
    <div class="clickable">{{commlink.name}}</div>
    <div class="row">
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
  </div>

</template>

<style scoped>

.column {
  width: 25%;
  text-align: center;
}

.row {
  justify-content: space-evenly;
}

.box {
 padding: 0.5rem 1vw;
}

</style>