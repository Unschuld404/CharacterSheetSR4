<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogChangeNuyen} from "@/composables/dialogs";

</script>

<template>

  <div class="box">

    <div class="nuy" @click="DialogChangeNuyen.show">{{ char.nuyen }} ¥</div>
    <div class="upper-header">Nuyen</div>

  </div>

</template>

<style scoped>

.nuy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1vh;
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--accent-color);
  cursor: pointer;
}

.box {
  height: 50%;
}

</style>