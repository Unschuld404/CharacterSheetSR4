<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogChangeNuyen} from "@/composables/dialogs";

</script>

<template>
  <div class="row box">
    <strong>Nuyen</strong>
    <button @click="DialogChangeNuyen.show">{{ char.nuyen }} ¥</button>
  </div>
</template>

<style scoped>

.box {
  background-color: var(--primary-color);
  padding: 0.5rem 1vw;
  align-items: center;
  justify-content: space-between;
}

</style>