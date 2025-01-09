<script setup lang="ts">
import {char} from "@/composables/char";
import {GearType} from "@/composables/types";
</script>

<template>
  <div class="box">
    <strong>Gegenstände</strong>
    <template v-for="item in char.gear">
      <div class="item" v-if="item.type!==GearType.Commlink && item.type!==GearType.Program && item.type!==GearType.Ammo">
        <div>
          <template v-if="item.count!=1">
            {{item.count}} -
          </template>
          {{item.name}}
          <template v-if="item.rating > 1">
            ({{item.rating}})
          </template>
        </div>
        <div class="subcaption">
          {{ item.category }} <template v-if="item.extra!=''"> - {{item.extra}}</template>
        </div>
      </div>
    </template>
  </div>
  <div class="box">
    <strong>Munition</strong>
    <template v-for="item in char.ammunitions">
      <div class="item">
        <div>{{item.count}} - {{item.name}}</div>
        <div class="subcaption">
          <template v-if="item.extra">{{item.extra}}</template>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

strong {
  padding-top: 0.5rem;
  padding-left: 1vw;
}

.item {
  flex-direction: column;
  align-items: normal;
}

</style>