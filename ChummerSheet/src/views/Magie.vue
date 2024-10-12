<script setup lang="ts">
import Zauber from "@/components/Zauber.vue";
import Geister from "@/components/Geister.vue";
</script>

<template>
  <div class="collection">
    <div class="box spells">
      <Zauber />
    </div>

    <div class="flex-scroll spirits">
      <Geister />
    </div>
  </div>
</template>

<style scoped>

  .collection {
    display: flex;
    gap: 2vh;
  }

  .spells {
    flex: 2;
  }

  .spirits {
    flex: 1;
  }

</style>
