<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from "@/components/Header.vue";
import { dataIsValid } from "@/composables/data";
import ChangeNuyen from "@/components/Dialoge/ChangeNuyen.vue";
import RollDice from "@/components/Dialoge/RollDice.vue";
import SpiritSheet from "@/components/Sheets/SpiritSheet.vue";
import ChangeEdge from "@/components/Dialoge/ChangeEdge.vue";
import ChangeKarma from "@/components/Dialoge/ChangeKarma.vue";
import AddSpirit from "@/components/Dialoge/Spirits/AddSpirit.vue";
import DiceResult from "@/components/Archiv für Später/DiceResult.vue";
import WeaponSheets from "@/components/Sheets/WeaponSheet.vue";
import ChangeSpiritEdge from "@/components/Dialoge/Spirits/ChangeSpiritEdge.vue";
import EdgeDiceResult from "@/components/Archiv für Später/EdgeDiceResult.vue";
import CommlinkSheet from "@/components/Sheets/CommlinkSheet.vue";
import VehicleSheet from "@/components/Sheets/VehicleSheet.vue";
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
  <WeaponSheets/>
  <DiceResult/>
  <EdgeDiceResult/>
  <ChangeSpiritEdge/>
  <CommlinkSheet/>
  <VehicleSheet/>
  <ChooseSkill/>
  <ChooseAction/>

  <Header  v-if="dataIsValid()"/>

</template>


<style scoped>

</style>