<script setup lang="ts">
import { computed } from 'vue';
import {data, getActionSkills, getSpells} from "@/composables/data";

const spells = computed(() => getSpells());

const spellCastingTotal = computed(() => {
  let skills = getActionSkills();
  return skills.find((skill: any) => skill.name === 'Spruchzauberei')?.total ?? 0;
});
</script>

<template>

  <div class="scroll-box">
    <ul>
      <li v-for="(spell, index) in spells" :key="index">
       <div class="item column">
         <div class="header-row">
           <input type="checkbox" class="favourite">
           <div  class="header" v-if="data">{{ spell.name }}</div>
         </div>
         <div class="row">
           <div v-if="data" class="category">{{ spell.category }}</div>
           <div v-if="data" class="value">{{ spell.type }}</div>
           <div v-if="data" class="value">{{ spell.range }}</div>
           <div v-if="data" class="value">{{ spell.duration }}</div>
           <div v-if="data" class="formula">{{ spell.dv }}</div>
           <button v-if="data" class="total-value">{{ spellCastingTotal }}</button>
         </div>
       </div>
      </li>
    </ul>
  </div>

</template>

<style scoped>

  .header {
    margin-top: 1.5vh;
  }

  .header-row{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .row {
    height: 8vh;
    align-items: center;
    justify-content: space-between;
  }

  .item {
    height: 14vh;
  }

  .value {
    width: 3vh;
    text-align: center;
  }

  .category{
    width: 30vh;
    text-align: center;
  }

  .formula{
    width: 8vh;
  }

  .favourite{
    position: relative;
    bottom: 2vh;
    margin-right: 3vh;
  }

</style>/