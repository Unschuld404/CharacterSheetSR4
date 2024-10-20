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
          <li v-for="(skill, index) in knowledgeSkills" :key="index" class="item row">
            <input type="checkbox" class="favourite">
            <div v-if="data" class="name">{{ skill.name }}</div>
            <div class="value" v-if="data"><strong>{{ skill.rating }}</strong> + {{ skill.attribute }} {{ skill.attributemod }}</div>
            <button v-if="data" class="total-value">{{ skill.total }}</button>
          </li>
        </ul>
      </div>
      <p v-else>No knowledge skills available.</p>
    </div>
    <div class="lower-header">Wissensfertigkeiten</div>
  </div>

</template>

<style scoped>

.row {
  justify-content: space-between;
  align-items: center;
}

.favourite {
  position: relative;
  bottom: 2vh;
}

.name {
  width: 40vh;
}

.value {
  width: 10vh;
  text-align: center;
}

</style>