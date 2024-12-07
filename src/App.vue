<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from "@/components/Header.vue";
import { dataIsValid } from "@/composables/data";
import ChangeNuyen from "@/components/Dialoge/ChangeNuyen.vue";
import RollDice from "@/components/Dialoge/RollDice.vue";
import SpiritSheet from "@/components/Dialoge/SpiritSheet.vue";
import ManageEdge from "@/components/Dialoge/ManageEdge.vue";
import ChangeKarma from "@/components/Dialoge/ChangeKarma.vue";
import AddSpirit from "@/components/Dialoge/AddSpirit.vue";
import DiceResult from "@/components/Dialoge/DiceResult.vue";
import RangedWeapons from "@/components/Dialoge/RangedWeapon.vue";
import ManageSpiritEdge from "@/components/Dialoge/ManageSpiritEdge.vue";
import EdgeDiceResult from "@/components/Dialoge/EdgeDiceResult.vue";
import CommlinkSheet from "@/components/Dialoge/CommlinkSheet.vue";
import VehicleSheet from "@/components/Dialoge/VehicleSheet.vue";

</script>

<template>

  <ChangeNuyen/>
  <RollDice/>
  <SpiritSheet />
  <ManageEdge/>
  <AddSpirit/>
  <ChangeKarma/>
  <RangedWeapons/>
  <DiceResult/>
  <EdgeDiceResult/>
  <ManageSpiritEdge/>
  <CommlinkSheet/>
  <VehicleSheet/>

  <Header  v-if="dataIsValid()"/>

  <RouterView />
</template>

<style scoped>

</style>