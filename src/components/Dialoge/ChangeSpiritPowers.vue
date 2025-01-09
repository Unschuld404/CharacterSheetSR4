<script setup lang="ts">
import {computed, ref} from "vue";
import {optionalPowersFor} from "@/composables/spirits";

const props = defineProps<{
  count: number;
  type: string;
}>();

const items = computed(() => {
  return optionalPowersFor(props.type);
})

const countLeft = computed(() => {
  return  Math.min(props.count, items.value.length) - selectedItems.value.length;
})

const emit = defineEmits<{
  (e: 'confirm:selectedItems', selectedItems: string[]): void;
  (e: 'cancel'): void;
}>();

function confirm(): void
{
  emit('confirm:selectedItems', selectedItems.value);
}

function cancel(): void
{
  emit('cancel');
}

const selectedItems = ref<string[]>([]);

function toggleSelection(item: string) {
  const index = selectedItems.value.indexOf(item);
  if (index === -1) {
    if (countLeft.value > 0)
    {
      selectedItems.value.push(item);
    }
  } else {
    selectedItems.value.splice(index, 1);
  }
}

</script>

<template>

    <div class="overlay" @click.self="cancel">
      <div class="dialog-box" @click.stop>

        <ul class="selection-list">
          <li
              v-for="(item, index) in items"
              :key="index"
              :class="{ selected: selectedItems.includes(item.name) }"
              @click="toggleSelection(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>

      <div class="row">
        <button class="confirm" v-if="countLeft > 0"> Nimm {{ countLeft }}</button class="confirm">
        <button v-else class="confirm" @click="confirm()">OK</button>
      </div>

      </div>
    </div>

</template>

<style scoped>

.row {
  justify-content: center;
}

ul {
  list-style-type: none;
  width: 90%;
  padding: 0;
  margin: 0 auto 0 auto;
}

.selection-list li {
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 1vh;
  margin-bottom: 2vh;
  text-align: center;
  font-size: 1.5rem;
  background-color: var(--background-color);
  color: var(--accent-color);
}

.selection-list li + li {
  border-top: none;
}

.selection-list li.selected {
  background-color: var(--accent-color);
  color: var(--background-color);
  font-weight: bold;
}

.overlay {
  z-index: 3000;
}

.confirm {
  background-color: transparent;
  margin-top: 1rem;
}

</style>