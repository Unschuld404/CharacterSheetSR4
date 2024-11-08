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

      <div class="name">
        <h1>{{ DialogRollDice.name }}</h1>
      </div>

      <div class="row">
        <div class="header">
          {{ DialogRollDice.dice_count}}
        </div>
        <i class='bx bxs-dice-6'></i>
      </div>

      <div class="column">
        <div v-for="(value, index) in values" class="line">{{ value.name }} ({{ value.value }})</div>
      </div>
    </div>
  </div>

</template>

<style scoped>

i {
  height: 10vh;
  font-size: 9vh;
  padding-top: 2vh;
  padding-left: 1vh;
  color: var(--accent-color)
}

.header {
  height: 10vh;
  align-self: center;
  font-size: 10vh;
}

.line {
  margin-top: 2vh;
  height: 2vh;
  align-content: center;
}

.modal-overlay {
  z-index: 4000;
}

.modal-content{
  width: 40vh;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  z-index: 4001;
  padding-bottom: 2vh;
}

</style>/