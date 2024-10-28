<script setup lang="ts">
import {defineProps, defineEmits, computed, watch} from 'vue';

interface RadioOption {
  label: string;
  value: string;
}

const props = defineProps<{
  options: RadioOption[];
  selected?: string;
  group?: string;
}>();

const emit = defineEmits<{
  (e: 'update:selected', value: string): void;
}>();

const selectedValue = computed({
  get: () => props.selected,
  set: (value: string) => emit('update:selected', value),
});

watch(selectedValue, (newVal) => {
  console.log(`Selected Value in RadioButtonPanel: ${newVal}`);
});

const groupName = computed(() => props.group || `radio-group-${Math.random().toString(36)}`);
</script>

<template>
  <div class="radio">
    <div v-for="option in options" :key="option.value" class="radio_item">
      <input
          class="radio_input"
          type="radio"
          :value="option.value"
          :name="groupName"
          :id="`radio-${option.value}`"
          v-model="selectedValue"
      />
      <label class="radio_label" :for="`radio-${option.value}`">{{ option.label }}</label>
    </div>
  </div>
</template>


<style scoped>
.radio {
  display: flex; /* Ändere von inline-flex zu flex für bessere Kontrolle */
  align-items: stretch; /* Streckt die Items, sodass sie die gleiche Höhe haben */
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
}

.radio_item {
  flex: 1; /* Jeder Item nimmt gleich viel Platz ein */
  display: flex; /* Ermöglicht die Ausrichtung der Labels */
  align-items: stretch; /* Streckt die Labels, sodass sie die gleiche Höhe haben */
}

.radio_input {
  display: none; /* Versteckt die eigentlichen Radio-Buttons */
}

.radio_label {
  flex: 1; /* Label nimmt die gesamte Breite des Containers ein */
  display: flex; /* Ermöglicht die Zentrierung des Textes */
  justify-content: center; /* Horizontale Zentrierung */
  align-items: center; /* Vertikale Zentrierung */
  padding: 8px 14px;
  font-size: 14px;
  line-height: 1;
  color: #81ffc0;
  background: #181818;
  cursor: pointer;
  transition: background 0.1s;
  box-sizing: border-box; /* Sorgt dafür, dass Padding und Border in der Breite enthalten sind */
  margin: 0; /* Entfernt eventuelle Margins */
}

.radio_label:not(:last-of-type) {
  border-right: 1px solid #080808; /* Trennlinie zwischen den Buttons */
}

.radio_input:checked + .radio_label {
  background: #080808;
  font-weight: normal;
  color: var(--font-color);
}
</style>