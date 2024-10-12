<script setup lang="ts">
import Zauber from "@/components/Zauber.vue";
import Geister from "@/components/Geister.vue";

import { useRouter } from "vue-router";

const router = useRouter();

const navigateRight = () => {
  router.push({ name: 'Fertigkeiten' });
};

</script>

<template>

  <div v-touch:swipe.right="navigateRight">

    <div class="collection">
      <div class="box spells">
        <Zauber />
      </div>

      <div class="flex-scroll spirits">
        <Geister />
      </div>
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
