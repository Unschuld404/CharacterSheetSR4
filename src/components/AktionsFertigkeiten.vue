<script setup lang="ts">
import { computed } from 'vue';
import {getActionSkills} from "@/composables/data";

const actionSkills = computed(() => getActionSkills());

</script>

<template>

  <div class="action-skills box">
    <div v-if="actionSkills.length">
      <ul>
        <li v-for="(skill, index) in actionSkills" :key="index" class="item row">
          <input type="checkbox" class="favourite">
          <div class="name">{{ skill.name }}</div>
          <div class="value"><strong>{{ skill.rating }}</strong> + {{ skill.attribute }} {{ skill.attribute_value }}</div>
          <button class="total-value">{{ skill.total }}</button>
        </li>
      </ul>
    </div>
    <p v-else>No action skills available.</p>
    <div class="lower-header">Aktionsfertigkeiten</div>
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