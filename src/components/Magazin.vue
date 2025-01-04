<script setup lang="ts">

import {computed, ref, watch} from "vue";
import {DialogWeapon} from "@/composables/dialogs";

const isBlinking = ref(false);

const weapon  = computed( () => DialogWeapon.weapon  )

const bulletsLeft = computed(() =>  DialogWeapon.weapon.bulletsLeft )
const bulletsToFire = computed(() => DialogWeapon?.weapon?.bulletsToFire ?? 0 )
const bulletsFired = computed(() => DialogWeapon?.weapon?.bulletsFired ?? 0 )
const bulletsLeftAfterFire = computed(() => DialogWeapon.weapon.bulletsLeftAfterFire)

const bulletStyle = computed(() => {
  const maxWith = 200;
  const widthPerBullet = maxWith/ Math.max(1, weapon.value.magSize);
  return {
    width: widthPerBullet + 'px',
  }
})

watch(bulletsToFire, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    isBlinking.value = true;
    setTimeout(() => {
      isBlinking.value = false;
    }, 500);
  }
});

</script>

<template>

  <div class="magazine">
    {{ bulletsLeftAfterFire }}  ({{ bulletsLeft }}) <span
      v-for="index in weapon.magSize"
      :key="index"
      class="bullet"
      :style="bulletStyle"
      :class="{
              'used': index > bulletsLeft,
              'to-fire': index > bulletsLeftAfterFire && index <= bulletsLeft,
              'blink': isBlinking && index > bulletsLeftAfterFire && index <= bulletsLeft,
            }"
  ></span> {{ weapon.magSize }}
  </div>

</template>

<style scoped>

.magazine {
  display: flex;
  justify-content: center;
}

.bullet {
  height: 20px;
  margin-right: 1px;
  background-color: var(--accent-color);
}
.bullet.used {
  background-color: #4f4f4f;
}
.bullet.to-fire {
  background-color: var(--font-color);
}
.bullet.fired {
  background-color: red;
}

/* Einfaches Blinken */
@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
.blink {
  animation: blink 0.5s linear 1;
}

</style>