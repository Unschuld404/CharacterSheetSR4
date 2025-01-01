<script setup lang="ts">
import {computed, ref} from "vue";
import {EvadeType} from "@/composables/types";
import {char} from "@/composables/char";
import {DialogRollDice} from "@/composables/dialogs";

const isActive = ref(false);

function fullDefense() {
  isActive.value = !isActive.value;
}

const evadeMelee = computed( () => {
    return char.evade(EvadeType.Melee, isActive.value );
});

const evadeRanged = computed( () => {
  return char.evade(EvadeType.Ranged, isActive.value );
});

</script>

<template>

  <div class="box row">
    <div class="column">
      <div :class="{'active': isActive}" class="defense" @click="fullDefense">Volle Abwehr</div>
    </div>
    <div class="column">
      <button @click="DialogRollDice.setValues(evadeMelee).show()">{{ evadeMelee.value }}</button>
      <div>Nahkampf</div>
    </div>
    <div class="column">
      <button @click="DialogRollDice.setValues(evadeRanged).show()">{{ evadeRanged.value }}</button>
      <div>Fernkampf</div>
    </div>
  </div>

</template>

<style scoped>

.column {
  text-align: center;
  align-items: center;
}

.row{
  justify-content: space-between;
  padding: 0.5rem 2dvw;
}

.defense.active {
  background-color: var(--accent-color);
  color: var(--background-color);
  font-weight: bold;
}

</style>