<script setup lang="ts">
  import {DialogRollDice} from "@/composables/dialogs";
  import {computed, ref} from "vue";
  import {fetchRoll} from "@/composables/fetch";
  import type {RollDiceResult} from "@/composables/types";

  const values = computed(() => DialogRollDice.values?.values ?? [])

  const rollResult = ref<RollDiceResult | null >(null);

  async function roll()
  {
    try {
      const result = await fetchRoll(DialogRollDice.dice_count);
      rollResult.value = result;
      DialogRollDice.result = result;
      console.log("roll result", result);
    }
    catch(err) {
      console.error(err);
    }
  }
</script>/

<template>

  <div v-if="DialogRollDice.visible" class="modal-overlay" @click="DialogRollDice.hide">
    <div class="modal-content" @click.stop>
      <div class="base">
        <h1>{{ DialogRollDice.name }}</h1>
      </div>
      <div class="row">
        <input type="checkbox" :checked="DialogRollDice.edge_checked" id="useEdge" name="useEdge" :class="{'favourite': true, 'disabled': DialogRollDice.edge_disabled}"/>
        <label for="useEdge" :class="{'disabled': DialogRollDice.edge_disabled}">Edge verwenden</label>
      </div>
      <div class="row mod">
        <div class="mutator" @click="DialogRollDice.removeDice()">-</div>
        <p><strong>{{ DialogRollDice.dice_count}}</strong> Würfel</p>
        <div class="mutator" @click="DialogRollDice.addDice()">+</div>
      </div>
      <div class="row">
        <div>{{ DialogRollDice.result }} </div>
      </div>
      <div class="row">
        <div>{{ rollResult }} </div>
      </div>
      <div class="row">
        <div v-for="(value, index) in values">{{ value.name }} ({{ value.value }})<span v-if="index < values.length -1">,</span>&nbsp; </div>
      </div>


      <button class="confirm" @click="roll">Würfeln</button>
    </div>
  </div>

</template>

<style scoped>

.modal-overlay {
  z-index: 4000;
}

.modal-content{
  width: 50vh;
  height: 60vh;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  z-index: 4001;
}

.disabled {
  text-decoration: line-through;
}

.favourite {
  width: 3vh;
  height: 3vh;
  position: relative;
  bottom: 2.5vh;
  right: 1vh;
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

strong{
  font-size: 5vh;
}

.mod {
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}

i {
  font-size: 6vh;
}

</style>/