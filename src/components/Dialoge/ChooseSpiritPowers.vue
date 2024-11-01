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
      <div class="modal-content" @click.stop>

        <ul class="selection-list">
          <li
              v-for="(item, index) in items"
              :key="index"
              :class="{ selected: selectedItems.includes(item) }"
              @click="toggleSelection(item)"
          >
            {{ item }}
          </li>
        </ul>

        <button class="confirm" v-if="countLeft > 0"> wähle {{ countLeft }}</button>
        <button v-else class="confirm" @click="confirm()">Bestätigen</button>
      </div>
    </div>

</template>

<style scoped>

.selection-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.selection-list li {
  display: table;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.selection-list li + li {
  border-top: none;
}

.selection-list li.selected {
  background-color: #e0f7fa;
  color: var(--background-color);
}

.modal-content{
  width: 50vh;
  height: fit-content;
  z-index: 6001;
  padding-bottom: 67px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6000;
}

</style>