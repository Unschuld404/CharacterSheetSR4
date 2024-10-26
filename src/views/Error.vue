<script setup lang="ts">

import {error} from "@/composables/error";

</script>

<template>
  <div class="error"> {{ error ?? 'unbekannter Fehler' }}  </div>
</template>

<style scoped>

</style>