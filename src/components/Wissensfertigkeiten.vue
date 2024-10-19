<script setup lang="ts">
import { computed } from 'vue';
import { data, getSkills } from '@/scripts/Data';

// Computed Property, das sich automatisch aktualisiert, wenn data sich ändert
const knowledgeSkills = computed(() => {
  return data.value ? getSkills(true) : [];
});


</script>

<template>

  <div class="knowledge-skills box">
    <div class="scroll-box">
      <div v-if="knowledgeSkills.length">
        <ul>
          <li v-for="(skill, index) in knowledgeSkills" :key="index" class="item">
            <div class="checkbox-box">
              <input type="checkbox" class="favourite">
            </div>
            <div v-if="data">{{ skill.name }}</div>
            <div class="value" v-if="data"><strong>{{ skill.rating }}</strong> + {{ skill.attribute }} {{ skill.attributemod }}</div>
            <div class="button-box">
              <button v-if="data" class="total-value">{{ skill.total }}</button>
            </div>
          </li>
        </ul>
      </div>
      <p v-else>No knowledge skills available.</p>
    </div>
    <div class="lower-header">Wissensfertigkeiten</div>
  </div>

</template>

<style scoped>

</style>