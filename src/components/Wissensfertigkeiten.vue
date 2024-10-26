<script setup lang="ts">
import { computed } from 'vue';
import {getKnowledgeSkills} from "@/composables/data";

const knowledgeSkills = computed(() => getKnowledgeSkills());

</script>

<template>

  <div class="knowledge-skills box">
    <div class="scroll-box">
      <div v-if="knowledgeSkills.length">
        <ul>
          <li v-for="(skill, index) in knowledgeSkills" :key="index" class="item row">
            <input type="checkbox" class="favourite">
            <div class="name">{{ skill.name }}</div>
            <div class="value" ><strong>{{ skill.rating }}</strong> + {{ skill.attribute }} {{ skill.attribute_value }}</div>
            <button class="total-value">{{ skill.total }}</button>
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