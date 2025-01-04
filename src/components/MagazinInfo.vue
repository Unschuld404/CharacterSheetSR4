<script setup lang="ts">

import {computed} from "vue";

const bulletStyle = computed(() => {
  const maxWith = 200;
  const widthPerBullet = maxWith/ Math.max(1, props.magSize);
  return {
    width: 1000 + 'px',
  }
})

const props = defineProps<{
  bulletsLeft: number;
  magSize: number;
}>();

</script>

<template>

  <div class="magazine">
    <span
      v-for="index in props.magSize"
      :key="index"
      class="bullet"
      :style="bulletStyle"
      :class="{
              'used': index > props.bulletsLeft
            }"
    ></span>
  </div>

</template>

<style scoped>

.magazine {
  display: flex;
  justify-content: space-between;
  width: 25%;
}

.bullet {
  height: 0.5rem;
  background-color: var(--accent-color);
  align-self: center;
}
.bullet.used {
  background-color: #4f4f4f;
}

</style>