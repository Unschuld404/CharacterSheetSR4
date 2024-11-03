<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogRollDice} from "@/composables/dialogs";
import {getGear} from "@/composables/data";
import {GearType} from "@/composables/types";
</script>

<template>

  <div class="box">

    <div class="scroll-box">

      <div v-for="item in char.gear" class="item">
        <div class="row">
          <h2>{{item.name}}</h2>
          <p v-if="item.count!=1||item.type==GearType.Ammo">{{ item.count }}</p>
        </div>
        <div class="row">
          <h3>{{ item.category }} <template v-if="item.extra!=''"> - {{item.extra}}</template></h3>
        </div>
      </div>

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
  overflow: scroll;
}


</style>