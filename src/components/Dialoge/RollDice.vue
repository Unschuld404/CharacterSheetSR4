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
    <div class="popup box" @click.stop>

      <div class="upper-header">{{ DialogRollDice.name }}</div>

      <div class="row">
        <div class="pool">
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

.overlay {
  z-index: 100000;
}

i {
  height: 10dvh;
  font-size: 8.5dvh;
  padding-top: 2dvh;
  padding-left: 1dvh;
}

.pool {
  font-size: 10dvh;
  font-weight: bold;
}

.line {
  margin-top: 2vh;
  text-align: center;
}

</style>/