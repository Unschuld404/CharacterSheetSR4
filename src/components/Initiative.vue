<script setup lang="ts">
import {data, getAttributeValueByName} from "@/composables/data";
import {DialogChangeNuyen, DialogRollDice} from "@/composables/dialogs";

</script>

<template>

  <div class="box">

    <div class="initiatives">

      <div class="initiative">
        <div class="initiative-category">Normal</div>
        <button class="total-value" @click="DialogRollDice.show()" >{{ data?.init?.total ?? 0 }}</button>
      </div>

      <div class="initiative">
        <div class="initiative-category">Matrix</div>
        <button class="total-value" @click="DialogChangeNuyen.show()" >{{ data?.matrixinit?.base ?? 0 }}</button>
      </div>

      <div class="initiative">
        <div class="initiative-category">Astral</div>
        <button class="total-value" >{{ getAttributeValueByName('INT')*2 }}</button>
      </div>

    </div>

    <div class="lower-header">Initiative</div>

  </div>

</template>

<style scoped>

.initiatives {
  display: flex;
  margin-top: 0.5vh;
  justify-content: space-evenly;
}

.initiative {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
}

.box {
  height: 12vh;
}

button {
  position: relative;
  top: 1vh;
}

</style>