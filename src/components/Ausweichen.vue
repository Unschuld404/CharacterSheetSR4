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
    <strong class="category">Ausweichen</strong>
    <div class="row">
      <div class="special-row">
        <div class="column" @click="DialogRollDice.setValues(evadeMelee).show()">
          <button>{{ evadeMelee.value }}</button>
          <div>Nahkampf</div>
        </div>
        <div class="column" @click="DialogRollDice.setValues(evadeRanged).show()">
          <button>{{ evadeRanged.value }}</button>
          <div>Fernkampf</div>
        </div>
      </div>
      <div>
        <div class="skill">blocken <i class='bx bxs-cog'></i></div>
        <button :class="{'active': isActive}" class="defense" @click="fullDefense">Volle Abwehr</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.skill {
  text-align: center;
  font-weight: bold;
  color: var(--accent-color);
  padding-bottom: 0.5rem;
}

.box {
  margin: 0.5rem 0;
}

.column {
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 5rem;
  width: 25vw;
  background-color: var(--primary-color);
  border-radius: 0.5rem;
}

.row{
  justify-content: space-between;
  align-items: center;
  padding: 0 1dvw;
  gap: 2vw;
}

.special-row {
  display: flex;
  gap: 2vw;
}

.defense {
  width: 40vw;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: var(--primary-color);
}

.defense.active {
  background-color: var(--accent-color);
  color: var(--background-color);
  font-weight: bold;
}

</style>