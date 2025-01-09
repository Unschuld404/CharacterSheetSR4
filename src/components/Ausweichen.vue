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
  <div class="box">
    <strong class="category">Ausweichen </strong> <i class='bx bxs-cog'></i>
    <div class="row">
      <div class="dice-column" @click="DialogRollDice.setValues(evadeMelee).show()">
        <button>{{ evadeMelee.value }}</button>
        <div>Nahkampf</div>
      </div>
      <div class="dice-column" @click="DialogRollDice.setValues(evadeRanged).show()">
        <button>{{ evadeRanged.value }}</button>
        <div>Fernkampf</div>
      </div>
      <div :class="{'active': isActive}" class="defense dice-column" @click="fullDefense">
        <button :class="{'active': isActive}" class="defense">Volle Abwehr</button>
        <div>Skill</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

button {
  margin-bottom: 0.5rem;
}

.dice-column {
  width: 31dvw;
}

.box {
  margin: 0.5rem 0;
}

.row{
  justify-content: space-between;
  align-items: center;
  padding: 0 1dvw;
  gap: 2vw;
}

.defense {
  background-color: var(--primary-color);
}

.defense.active {
  background-color: var(--accent-color);
  color: var(--background-color);
  font-weight: bold;
}

</style>