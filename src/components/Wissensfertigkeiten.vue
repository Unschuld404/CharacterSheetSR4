<script setup lang="ts">
import { computed } from 'vue';
import {getKnowledgeSkills} from "@/composables/data";
import {DialogRollDice} from "@/composables/dialogs";

const knowledgeSkills = computed(() => getKnowledgeSkills());

</script>

<template>

  <div class="knowledge-skills box">
    <div v-if="knowledgeSkills.length" class="scrollbox">
      <ul>
        <li v-for="(skill, index) in knowledgeSkills" :key="index" class="item row">
          <input type="checkbox" class="favourite">
          <div class="name">{{ skill.name }}</div>
          <div class="value" ><strong>{{ skill.rating }}</strong> + {{ skill.attribute }} {{ skill.attribute_value }}</div>
          <button class="total-value" @click="DialogRollDice.show">{{ skill.total }}</button>
        </li>
      </ul>
    </div>
    <p v-else>No knowledge skills available.</p>
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