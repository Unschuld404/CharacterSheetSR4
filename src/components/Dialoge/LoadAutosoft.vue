<script setup lang="ts">

  import {char} from "@/composables/char";
  import {uploadSheet} from "@/composables/fetch";
  import {DialogLoadAutosoft, DialogVehicleSheet} from "@/composables/dialogs";
  import {computed} from "vue";
  import type {AutoSoft} from "@/composables/types";
  import {autosoftEquals, removeDuplicates} from "@/composables/utils";

  const commlinkAutosofts = computed(() => char.commlink?.autosofts ?? []);
  const storageAutosofts = computed(() => DialogVehicleSheet.vehicle?.getAutosoftsFromStorage() ?? []);
  const loadedAutosofts = computed(() => DialogVehicleSheet.vehicle?.getAutosofts() ?? []);

  const autosofts = computed(() => {
    return removeDuplicates(
      [...commlinkAutosofts.value, ...storageAutosofts.value ]
        .sort((a, b) => {
          const nameResult = a.name.localeCompare(b.name);
          if (nameResult !== 0)
          {
            return nameResult;
          }
          const extraResult = a.extra.localeCompare(b.extra);
          if (extraResult !== 0)
          {
            return extraResult;
          }
          return b.rating - a.rating;
        }), (a, b) => autosoftEquals(a, b));
  });

  function isLoaded(value: AutoSoft): boolean {
    const index = loadedAutosofts.value.findIndex((item: AutoSoft) => autosoftEquals(item, value));
    return index >= 0;
  }

  function toggle(value: AutoSoft)
  {
    if (isLoaded(value))
    {
      DialogVehicleSheet.vehicle?.unloadAutosoft(value);
    }
    else
    {
      DialogVehicleSheet.vehicle?.loadAutosoft(value);
    }

    uploadSheet().then();
  }

</script>/

<template>

  <div v-if="DialogLoadAutosoft.visible" class="overlay" @click="DialogLoadAutosoft.hide">
    <div class="dialog-box column" @click.stop>
      <ul>
        <li v-for="autosoft in autosofts" :key="autosoft.name + autosoft.rating" class="item">
          <div class="column">
            <div>{{ autosoft.name }} ( {{autosoft.rating}} )</div>
            <div class="extra">{{ autosoft.extra }}</div>
          </div>
          <input type="checkbox" class="favourite" :checked="isLoaded(autosoft)" @change="toggle(autosoft)">
        </li>
      </ul>
    </div>
  </div>

</template>

<style scoped>

strong {
  padding-top: 1rem;
  padding-left: 2vw;
}

.dialog-box {
  height: 80dvh;
  width: 90dvw;
  overflow: scroll;
  padding: 0;
  align-items: normal;
}

.item {
  padding: 0 2vw;
}


</style>/