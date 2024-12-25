<script setup lang="ts">
import {computed, ref} from "vue";
import {DialogWeapon} from "@/composables/dialogs";
import {getSizeTypesFromAmmo} from "@/composables/weapons";
import RadioButtons from "@/components/RadioButtons.vue";
import {char} from "@/composables/char";
import {type Gear, GearType} from "@/composables/types";
import {toInt} from "@/composables/utils";

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

    DialogWeapon.setting.ammoLoaded = selectedItem.value.name;
    DialogWeapon.setting.magType = match ? match[2].trim() : '';
    DialogWeapon.setting.magSize = match ? toInt(match[1]) : 0;
    DialogWeapon.setting.ammoLeft = Math.min(DialogWeapon.setting.magSize, selectedItem.value.count);
    selectedItem.value.count -= DialogWeapon.setting.ammoLeft;
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

const selectedSize = ref<string>(sizeSelection.value[0]?.label ?? '');

const items = computed(() => {
  return char.gear.filter((item: Gear) => {
    return item.type === GearType.Ammo && item.extra == DialogWeapon.weapon.category && item.count > 0
  }) ?? [];
})

const selectedItem = ref<Gear|null>(null );

function setSelection(item: Gear) {
  selectedItem.value = item;
}

</script>

<template>

    <div class="overlay" @click.self="cancel">
      <div class="dialog-box" @click.stop>

        <div v-if="sizeSelection.length > 1" class="size">
          <RadioButtons :options="sizeSelection" model-value="selectedSize" />
        </div>

        <div class="scroll-box">
          <ul class="selection-list">
            <li
                v-for="(item, index) in items"
                :key="index"
                :class="{ selected: selectedItem === item }"
                @click="setSelection(item)"
            >
              <div>
                {{ item.name }}
              </div>
              <div>
                ({{ item.count }})
              </div>
            </li>
          </ul>
        </div>

        <button class="confirm" @click="confirm()">that's the stuff</button>
      </div>
    </div>

</template>

<style scoped>

.size {
  height: 10vh;
}

.radio {
  height: 6vh;
}

ul {
  list-style-type: none;
  max-height: 70vh;
  width: 90%;
  padding: 0;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
}

.selection-list li {
  padding: 10px;
  cursor: pointer;
  border-radius: 1vh;
  border: 1px solid var(--primary-color);
  margin-bottom: 2vh;
  text-align: center;
  font-size: 6dvw;
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

.confirm {
  background-color: transparent;
}

.dialog-box {
  width: 95dvw;
}

</style>