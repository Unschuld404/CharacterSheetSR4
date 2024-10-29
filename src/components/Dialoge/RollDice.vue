<script setup lang="ts">
import {DialogRollDice} from "@/composables/dialogs";
import {ref} from "vue";

let checked = ref(false);

function toggle()
{
  checked.value = !checked.value;
}

</script>/

<template>

  <div v-if="DialogRollDice.visible" class="modal-overlay" @click="DialogRollDice.hide">
    <div class="modal-content" @click.stop>
      <div class="base">
        <h1>Name des Skills</h1>
        <p>( 12 Basiswürfel )</p>
      </div>
      <div class="row">
        <input type="checkbox" :checked="checked" id="useEdge" name="useEdge" class="favourite"/>
        <label for="useEdge">Edge verwenden</label>
      </div>
      <div class="row mod">
        <div class="mutator" @click="toggle">-</div>
        <p><strong>12</strong> Würfel</p>
        <div class="mutator" @click="toggle">+</div>
      </div>
      <button class="confirm" @click="DialogRollDice.hide">Würfeln</button>
    </div>
  </div>

</template>

<style scoped>

.modal-overlay {
  z-index: 4000;
}

.modal-content{
  width: 70vh;
  height: 50vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  z-index: 4001;
}

.favourite {
  width: 3vh;
  height: 3vh;
  position: relative;
  bottom: 2.5vh;
  right: 1vh;
}

.base {
  height: 12vh;
}

.row {
  margin-top: 2vh;
  justify-content: center;
  align-items: center;
  height: 10vh;
  line-height: 6vh;
}

label {
  font-size: 3vh;
  position: relative;
  left: 1vh;
}

p {
  font-size: 3vh;
}

strong{
  font-size: 5vh;
}

.mod {
  width: 40vh;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}

i {
  font-size: 6vh;
}

</style>/