<script setup lang="ts">
import {char} from "@/composables/char";
import {GearType} from "@/composables/types";
</script>

<template>

  <div class="box">

    <div class="scroll-box">

    <template v-for="item in char.gear">
      <div class="item" v-if="item.type!==GearType.Commlink && item.type!==GearType.Program">
      <div class="row">

        <h2>

          <template v-if="item.count!=1||item.type==GearType.Ammo">
            {{item.count}} x
          </template>

          {{item.name}}

          <template v-if="item.rating > 1">
            ({{item.rating}})
          </template>

        </h2>

        <i v-if="item.type==GearType.Ammo" class='bx bx-transfer-alt'></i>
      </div>
      <div class="row">
        <h3>{{ item.category }} <template v-if="item.extra!=''"> - {{item.extra}}</template></h3>
      </div>
    </div>
    </template>

    </div>

    <div class="lower-header">Inventar</div>

  </div>

</template>

<style scoped>

.item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1vh;
}

.row {
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 2vh;
  color: var(--accent-color);
  font-weight: normal;
}

.box {
  height: 73vh;
}

i {
  color: var(--accent-color);
  font-weight: bold;
  font-size: 5vh;
  position: absolute;
  right: 0;
  margin-top: 1.5vh;
}

</style>