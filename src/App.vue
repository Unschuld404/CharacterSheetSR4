<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router';
import { onBeforeUnmount, ref } from "vue";
import Header from "@/components/Header.vue";
import { dataIsValid } from "@/composables/data";
import {menuRoutes} from "@/router";
import ChangeNuyen from "@/components/Dialoge/ChangeNuyen.vue";
import RollDice from "@/components/Dialoge/RollDice.vue";
import SpiritSheet from "@/components/Dialoge/SpiritSheet.vue";
import ManageEdge from "@/components/Dialoge/ManageEdge.vue";
import DroneSheet from "@/components/Dialoge/DroneSheet.vue";
import ChangeKarma from "@/components/Dialoge/ChangeKarma.vue";
import AddSpirit from "@/components/Dialoge/AddSpirit.vue";
import RangedWeapons from "@/components/Dialoge/RangedWeapons.vue";

const router = useRouter();
const route = useRoute();

const isDragging = ref(false);
const eventFired = ref(false);
const offset = ref(0);
const start = ref(0);

function routerLeft()
{
  const routeNames = menuRoutes.map((r) => r.name).filter(Boolean) as string[];
  const currentIndex = routeNames.indexOf(route.name as string);
  if (currentIndex > 0)
  {
    const targetRouteName = routeNames[currentIndex - 1];
    router.push({
      name: targetRouteName
    })
  }
}

function routerRight()
{
  const routeNames = menuRoutes.map((r) => r.name).filter(Boolean) as string[];
  const currentIndex = routeNames.indexOf(route.name as string);
  if (currentIndex < routeNames.length - 1)
  {
    const targetRouteName = routeNames[currentIndex + 1];
    router.push({
      name: targetRouteName
    })
  }
}

const onSwipeLeft = () => {

  console.log("on swipe left");
  routerRight();
  setTimeout(() => {
    offset.value = 0;
  }, 50); // 200ms = 0.2s Verzögerung
}

function onSwipeRight(): void
{
  console.log("on swipe right");
  routerLeft();
  setTimeout(() => {
    offset.value = 0;
  }, 50); // 200ms = 0.2s Verzögerung
}

function onMouseDown(e: MouseEvent): void
{
  isDragging.value = true;
  eventFired.value = false;
  start.value = e.clientX;
  offset.value = 0;

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp)
}
function onMouseMove(e: MouseEvent): void
{
  if (isDragging.value)
  {
    offset.value = e.clientX - start.value;
  }
}
function onMouseUp(): void
{
  let distance = Math.abs(offset.value);
  if (distance > 400)
  {
    let isSwipedLeft = offset.value < 0;

    if (isSwipedLeft)
    {
      onSwipeLeft();
    }
    else
    {
      onSwipeRight();
    }

    eventFired.value = true;
  }

  isDragging.value = false;

  removeEventListeners();
}

function removeEventListeners()
{
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
}

onBeforeUnmount(removeEventListeners);

</script>

<template>

  <ChangeNuyen/>
  <RollDice/>
  <SpiritSheet />
  <ManageEdge/>
  <AddSpirit/>
  <DroneSheet/>
  <ChangeKarma/>
  <RangedWeapons/>

  <Header  v-if="dataIsValid()"  />

  <RouterView
      :style="{ transform: 'translateX(' + offset + 'px)' }"
      @mousedown="onMouseDown" v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
  </RouterView>

</template>

<style scoped>

</style>