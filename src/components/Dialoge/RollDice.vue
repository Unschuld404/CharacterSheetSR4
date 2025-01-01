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

  <div v-if="DialogRollDice.visible" class="overlay" @click="DialogRollDice.hide">
    <div class="dialog-box" @click.stop>
      <div>{{ DialogRollDice.name }}</div>
      <div class="row">
        <div>{{ DialogRollDice.dice_count}}</div>
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
  font-size: 1.9rem;
}

.row {
  font-size: 2rem;
  align-items: center;
  margin-top: 1rem;
}

.overlay {
  z-index: 5000;
}

.column {
  text-align: center;
  margin-bottom: 0.5rem;
}

</style>/