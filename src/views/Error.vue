<script setup lang="ts">

import {error} from "@/composables/error";

</script>

<template>
  <div class="container">
    <div class="box">
      <div class="error header"> {{ error ?? 'unbekannter Fehler' }}  </div>
    </div>
  </div>
</template>

<style scoped>

.container {
  width: 100vw;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box {
  height: 20vh;
  width: 60vh;
}

.error {
  font-size: 5vh;
  text-align: center;
  line-height: 20vh;
}

</style>
