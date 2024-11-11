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
      <div class="dice" @click="DialogRollDice.setValues(evadeRanged).show()">{{ evadeRanged.value }}</div>
    </div>

    <div class="column">
      <div :class="{'active': isActive}" class="dice defense" @click="fullDefense">Volle Abwehr</div>
    </div>

    <div class="column">
      <div class="dice" @click="DialogRollDice.setValues(evadeMelee).show()">{{ evadeMelee.value }}</div>
    </div>

  <div class="lower-header">
    <div>{{ evadeRanged.name }}</div>
    <div>{{ evadeMelee.name }}</div>
  </div>

  </div>

</template>

<style scoped>

.lower-header {
  display: flex;
  justify-content: space-evenly;
}

.box {
  padding-bottom: 2rem;
}

.column {
  text-align: center;
  align-items: center;
}

.row{
  justify-content: space-between;
  padding-left: 3vh;
  padding-right: 3vh;
}

.defense {
  width: 15vh;
  font-weight: normal;
  font-size: 2vh;
}

.defense.active {
  background-color: var(--accent-color);
  color: var(--background-color);
  font-weight: bold;
}

</style>