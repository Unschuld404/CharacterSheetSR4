<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from "@/components/Header.vue";
import { dataIsValid } from "@/composables/data";
import ChangeNuyen from "@/components/Dialoge/ChangeNuyen.vue";
import RollDice from "@/components/Dialoge/RollDice.vue";
import SpiritSheet from "@/components/Dialoge/SpiritSheet.vue";
import ChangeEdge from "@/components/Dialoge/ChangeEdge.vue";
import ChangeKarma from "@/components/Dialoge/ChangeKarma.vue";
import AddSpirit from "@/components/Dialoge/AddSpirit.vue";
import DiceResult from "@/components/Dialoge/DiceResult.vue";
import RangedWeapons from "@/components/Dialoge/RangedWeapon.vue";
import ChangeSpiritEdge from "@/components/Dialoge/ChangeSpiritEdge.vue";
import EdgeDiceResult from "@/components/Dialoge/EdgeDiceResult.vue";
import CommlinkSheet from "@/components/Dialoge/CommlinkSheet.vue";
import VehicleSheet from "@/components/Dialoge/VehicleSheet.vue";
import ChooseAction from "@/components/Dialoge/ChooseAction.vue";
import ChooseSkill from "@/components/Dialoge/ChooseSkill.vue";

</script>

<template>



  <RouterView />

  <ChangeNuyen/>
  <RollDice/>
  <SpiritSheet />
  <ChangeEdge/>
  <AddSpirit/>
  <ChangeKarma/>
  <RangedWeapons/>
  <DiceResult/>
  <EdgeDiceResult/>
  <ChangeSpiritEdge/>
  <CommlinkSheet/>
  <VehicleSheet/>
  <ChooseAction/>
  <ChooseSkill/>

  <Header  v-if="dataIsValid()"/>

</template>


<style scoped>

</style>