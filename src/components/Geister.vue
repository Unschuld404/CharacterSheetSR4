<script setup lang="ts">
import { computed } from 'vue';
import { data, getSpirits } from '@/scripts/Data';

// Computed Property, das sich automatisch aktualisiert, wenn data sich ändert
const spirits = computed(() => {
  return data.value ? getSpirits() : [];
});
</script>

<template>

  <div v-if="spirits.length">
    <ul>
      <li v-for="(spirit, index) in spirits" :key="index">
        <div class="box">
          <div v-if="data" class="header">{{ spirit.crittername }}</div>
          <div class="info">
            <div v-if="data" class="value">Kraft: {{ spirit.force }}</div>
            <div v-if="data" class="value">Dienste: {{ spirit.services }}</div>
            <div v-if="data" class="value">{{ spirit.bound ? 'Gebunden' : 'Frei' }}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <button><i class='bx bxs-ghost'></i></button>

</template>

<style scoped>

  .box {
    height: 15vh;
    padding-top: 2vh;
    padding-left: 4vh;
    padding-right: 4vh;
  }

  .info {
    display: flex;
    justify-content: space-between;
  }

  .value {
    width: 30%;
    text-align: center;
    line-height: 6vh;
  }

  button {
    background-color: var(--accent-color);
    border: none;
    border-radius: 1vh;
    font-size: 5vh;
    line-height: 8vh;
    height: 7vh;
    color: var(--background-color);
  }

  button:active {
    background-color: var(--background-color);
    color: var(--font-color);
  }

</style>/