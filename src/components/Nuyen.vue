<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogChangeNuyen} from "@/composables/dialogs";

</script>

<template>
  <div class="divider row">
    <strong>Nuyen</strong>
    <strong class="click" @click="DialogChangeNuyen.show">{{ char.nuyen }} ¥</strong>
  </div>
</template>

<style scoped>

.divider {
  background-color: var(--primary-color);
  padding-left: 2dvw;
  padding-right: 2dvw;
  height: 6vh;
  align-items: center;
  justify-content: space-between;
}

</style>