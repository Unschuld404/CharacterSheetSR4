<script setup lang="ts">
import {char} from "@/composables/char";
import {GearType} from "@/composables/types";
</script>

<template>

  <div class="transparent-box">
    <div class="left-header">Gegenstände</div>
    <template v-for="item in char.gear">
      <div class="item" v-if="item.type!==GearType.Commlink && item.type!==GearType.Program">
        <div class="row name">
            <template v-if="item.count!=1||item.type==GearType.Ammo">
              {{item.count}} -
            </template>
            {{item.name}}
            <template v-if="item.rating > 1">
              ({{item.rating}})
            </template>
        </div>
        <div class="row">
          {{ item.category }} <template v-if="item.extra!=''"> - {{item.extra}}</template>
        </div>
    </div>
    </template>

  </div>

</template>

<style scoped>

.item {
  display: flex;
  flex-direction: column;
  align-items: start;
}

</style>