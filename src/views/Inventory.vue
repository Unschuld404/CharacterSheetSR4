<script setup lang="ts">
import Weapons from "@/components/Weapons.vue";
import Items from "@/components/Items.vue";
import Kommlink from "@/components/Kommlink.vue";
</script>

<template>
  <div class="collection column">
    <Kommlink/>
    <Weapons/>
    <Items/>
  </div>
</template>

<style scoped>

.column {
  gap: 1vh;
}

</style>
