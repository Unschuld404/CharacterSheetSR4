<script setup lang="ts">
import {computed, ref} from "vue";
import {DialogWeapon} from "@/composables/dialogs";
import {getSizeTypesFromAmmo} from "@/composables/weapons";
import RadioButtons from "@/components/RadioButtons.vue";
import {toInt} from "@/composables/utils";
import type {Ammunition} from "@/composables/types";

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
function confirm(): void  {

  if (selectedItem.value !== null)
  {
    const size = selectedSize.value || (sizeSelection.value[0]?.label ?? '');
    const regex = /^(\d+)\s*\(([^)]+)\)$/;
    const match = size.match(regex);

    DialogWeapon.weapon.settings.ammoLoaded = selectedItem.value.name;
    DialogWeapon.weapon.settings.magType = match ? match[2].trim() : '';
    DialogWeapon.weapon.settings.magSize = match ? toInt(match[1]) : 0;
    DialogWeapon.weapon.settings.ammoLeft = Math.min(DialogWeapon.weapon.settings.magSize, selectedItem.value.count);
    selectedItem.value.count -= DialogWeapon.weapon.settings.ammoLeft;
  }

  emit('confirm');
}
function cancel(): void  {
  emit('cancel');
}

const sizeSelection = computed(() => {
  return getSizeTypesFromAmmo(DialogWeapon.weapon?.ammo ?? '').map(size => ({
    label: size,
    value: size,
  }));
})

const selectedSize = ref<string>(sizeSelection.value[0]?.value ?? '');

const items = computed(() => {
  return DialogWeapon.weapon.parent?.getAmmunitions()?.filter((item: Ammunition) => {
    return item.extra == DialogWeapon.weapon.category && item.count > 0
  }) ?? [];
})

const selectedItem = ref<Ammunition|null>(null );

function setSelection(item: Ammunition) {
  selectedItem.value = item;
}

</script>

<template>

    <div class="overlay" @click.self="cancel">
      <div class="dialog-box" @click.stop>
        <div v-if="sizeSelection.length > 1" class="size">
          <RadioButtons :options="sizeSelection" v-model="selectedSize" group="magSize"/>
        </div>
        <ul class="selection-list">
          <li
            v-for="(item, index) in items"
            :key="index"
            :class="{ selected: selectedItem === item }"
            @click="setSelection(item)">
            <div>
              {{ item.name }}
            </div>
            <div>
              ({{ item.count }})
            </div>
          </li>
        </ul>
        <button class="confirm" @click="confirm()">that's the stuff</button>
      </div>
    </div>

</template>

<style scoped>

ul {
  list-style-type: none;
  max-height: 70vh;
  padding: 0;
  margin: 0 auto;
}

.size {
  margin-bottom: 2rem;
}

.selection-list li {
  cursor: pointer;
  border-radius: 1vh;
  margin-bottom: 2vh;
  padding: 0.5rem 1rem;
  text-align: center;
  background-color: var(--primary-color);
  color: var(--accent-color);
  border: none;
}

.selection-list li + li {
  border: none;
}

.selection-list li.selected {
  background-color: var(--accent-color);
  color: var(--background-color);
  font-weight: bold;
  border: none;
}

.confirm {
  background-color: transparent;
}

.dialog-box {
  width: 95dvw;
}

</style>