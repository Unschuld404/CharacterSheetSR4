<script setup lang="ts">
import Weapons from "@/components/Weapons.vue";
import Items from "@/components/Items.vue";
import Kommlink from "@/components/Kommlink.vue";
</script>

<template>
  <div class="collection">
    <div class="column">
      <div class="commlink">
        <Kommlink/>
      </div>
      <div class="items">
        <Items/>
      </div>
    </div>
    <div class="weapons">
      <Weapons/>
    </div>
  </div>
</template>

<style scoped>

.collection {
  display: flex;
  gap: 2vh;
}

.weapons {
  height: 100%;
  flex: 1;
}

.column {
  flex: 2;
  height: 100%;
  justify-content: space-between;
  gap: 2vh;
}

.commlink {
  width: 100%;
  height: 10vh;
}

.items {
  width: 100%;
  height: 100%;
}

</style>
