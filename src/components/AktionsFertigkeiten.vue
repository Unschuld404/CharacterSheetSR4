<script setup lang="ts">
import { computed } from 'vue';
import { data, getSkills } from '@/scripts/Data';

// Computed Property, das sich automatisch aktualisiert, wenn data sich ändert
const actionSkills = computed(() => {
  return data.value ? getSkills(false) : [];
});

</script>

<template>

  <div class="action-skills box">
    <div v-if="data" class="scroll-box">
      <div v-if="actionSkills.length">
        <ul>
          <li v-for="(skill, index) in actionSkills" :key="index" class="item">
            <div class="checkbox-box">
              <input type="checkbox" class="favourite">
            </div>
            <div v-if="data">{{ skill.name }}</div>
            <div v-if="data" class="value"><strong>{{ skill.rating }}</strong> + {{ skill.attribute }} {{ skill.attributemod }}</div>
            <div v-if="data" class="button-box">
              <button v-if="data" class="total-value">{{ skill.total }}</button>
            </div>
          </li>
        </ul>
      </div>
      <p v-else>No action skills available.</p>
    </div>
    <div class="lower-header">Aktionsfertigkeiten</div>
  </div>

</template>

<style scoped>

</style>