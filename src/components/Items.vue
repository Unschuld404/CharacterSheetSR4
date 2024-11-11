<script setup lang="ts">
import {char} from "@/composables/char";
import {GearType} from "@/composables/types";
</script>

<template>

  <div class="box">

    <template v-for="item in char.gear">
      <div class="item" v-if="item.type!==GearType.Commlink && item.type!==GearType.Program">
      <strong class="row">

          <template v-if="item.count!=1||item.type==GearType.Ammo">
            {{item.count}} -
          </template>

          {{item.name}}

          <template v-if="item.rating > 1">
            ({{item.rating}})
          </template>
      </strong>
      <div class="row caption">
        {{ item.category }} <template v-if="item.extra!=''"> - {{item.extra}}</template>
      </div>
    </div>
    </template>

    <div class="lower-header">Inventar</div>

  </div>

</template>

<style scoped>

.item {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.caption {
  color: var(--accent-color);
}

</style>