<script setup lang="ts">
import Weapons from "@/components/Weapons.vue";
import Items from "@/components/Items.vue";
import Kommlink from "@/components/Kommlink.vue";
</script>

<template>
  <div class="content column">
    <Kommlink/>
    <Weapons/>
    <Items/>
  </div>
</template>

<style scoped>

.column {
  gap: 2vh;
}

</style>
