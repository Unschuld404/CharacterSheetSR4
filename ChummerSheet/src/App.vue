<script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router';
import { menuRoutes } from "@/router/routes";
import { onMounted } from 'vue';
import { onBeforeUnmount, ref } from "vue";
import {fetchData} from "@/scripts/Fetch";
import { data } from "@/scripts/Data";

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
}

function onSwipeRight(): void
{
  console.log("on swipe right");
  routerLeft();
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
  offset.value = 0;

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

      <div class="chummer-name">
        <div v-if="data">{{ data.name }}</div>
      </div>

      <nav class="navbar">
        <ul>
          <li v-for="item in menuRoutes">
            <RouterLink :to="item.path" class="nav-link"><i :class="item.icon"></i></RouterLink></li>
        </ul>
      </nav>

      <div v-if="data" class="karma">{{ data.totalkarma }} Karma</div>

    </header>

    <RouterView :style="{ transform: 'translateX(' + offset + 'px)' }" @mousedown="onMouseDown" />

</template>

<style scoped>

.main-header {
  background-color: var(--background-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 4vh;
      }

.chummer-name {
  font-weight: bold;
  display: flex;
  width: 30%;
}

.karma {
  width: 30%;
  text-align: right;
}

.navbar {
  width: 30%;
  align-items: center;
}

.navbar ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.nav-link {
  color: var(--font-color)
}

.router-link-active {
  color: var(--accent-color)
}

</style>
