<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogChangeNuyen} from "@/composables/dialogs";

</script>

<template>
  <div class="item">
    <div>Nuyen</div>
    <button @click="DialogChangeNuyen.show">{{ char.nuyen }} ¥</button>
  </div>
</template>

<style scoped>
  button {
    border: none;
  }
</style>