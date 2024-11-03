<script setup lang="ts">
import Weapons from "@/components/Weapons.vue";
</script>

<template>
  <div class="collection">
    <div class="weapons">
      <Weapons/>
    </div>
  </div>
</template>

<style scoped>

.collection {
  display: flex;
  flex-direction: row-reverse;
}

.weapons {
  height: 100%;
}

</style>
