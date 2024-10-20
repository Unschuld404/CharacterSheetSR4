<script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router';
import { menuRoutes } from "@/router/routes";
import { onMounted } from 'vue';
import { onBeforeUnmount, ref } from "vue";
import {fetchData} from "@/scripts/Fetch";
import {data, getTotalValueByName} from "@/scripts/Data";
import WertBearbeiten from "@/components/Dialoge/WertBearbeiten.vue";

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


onMounted(() => {
  fetchData();
});

</script>

<template>
   
    <header class="main-header">

      <div>
        <div v-if="data" class="nuyen">{{ data.nuyen }} ¥</div>
      </div>

      <nav class="navbar">
        <ul>
          <li v-for="item in menuRoutes">
            <RouterLink :to="item.path" class="nav-link"><i :class="item.icon"></i></RouterLink></li>
        </ul>
      </nav>

      <div v-if="data" class="edge">{{ getTotalValueByName('EDG') }} Edge</div>

    </header>

  <RouterView
      :style="{ transform: 'translateX(' + offset + 'px)' }"
      @mousedown="onMouseDown" v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
  </RouterView>

</template>

<style scoped>

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s ease-out;
}

.main-header {
  background-color: var(--background-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 4vh;
      }

.navbar {
  width: 25%;
  align-items: center;
}

.navbar ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.nav-link {
  color: var(--font-color)
}

.router-link-active {
  color: var(--accent-color)
}

.edge {
  font-weight: bold;
}

</style>
