<script setup lang="ts">
import { computed } from 'vue';
import { data, getSpells } from '@/scripts/Data';

// Computed Property, das sich automatisch aktualisiert, wenn data sich ändert
const spells = computed(() => {
  return data.value ? getSpells() : [];
});

const spellcastingTotal = computed(() => {
  if (data.value && data.value.skills) {
    const skill = data.value.skills.find((skill: any) => skill.name === 'Spruchzauberei');
    return skill ? skill.total : '?';
  }
  return '?';
});
</script>

<template>

  <div class="scroll-box">
    <ul>
      <li v-for="(spell, index) in spells" :key="index">
       <div class="item column">
         <div class="header">
           <div v-if="data">{{ spell.name }}</div>
         </div>
         <div class="info">
           <input type="checkbox" class="favourite">
           <div v-if="data" class="category">{{ spell.category }}</div>
           <div v-if="data" class="value">{{ spell.type }}</div>
           <div v-if="data" class="value">{{ spell.range }}</div>
           <div v-if="data" class="value">{{ spell.duration }}</div>
           <div v-if="data" class="formula">{{ spell.dv }}</div>
           <button v-if="data" class="total-value">{{ spellcastingTotal }}</button>
         </div>
       </div>
      </li>
    </ul>
  </div>

</template>

<style scoped>

  .info {
    display: flex;
    justify-content: flex-start;
    text-align: center;
    margin-top: 1vh;
    line-height: 2vh;
    height: 5vh;
    position: relative;
  }

  .value {
    width: 10%;
    text-align: center;
  }

  .category{
    width: 40%;
  }

  .formula{
    padding-right: 8vh;
    text-align: right;
  }

  button {
    position: absolute;
    right: 0;
    bottom: 2vh;
  }

</style>/