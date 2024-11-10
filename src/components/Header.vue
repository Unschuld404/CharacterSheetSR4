<script setup lang="ts">
import {RouterLink} from "vue-router";
import {menuRoutes} from "@/router";
import {char} from "@/composables/char";

</script>

<template>
  <nav class="navbar">
    <ul>
      <li v-for="item in menuRoutes">
        <RouterLink :to="item.path" class="nav-link" active-class="active-link"><i :class="item.icon"></i></RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>

.navbar {
  background-color: var(--background-color);
  font-size: 40px;
  position: fixed;
  padding-top: 10px;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  align-content: center;
  z-index: 10000;
}

.navbar ul {
  display: flex;
  justify-content: space-evenly;
  height: 60px;
  width: 100%;
  align-items: center;
}

.nav-link {
  color: var(--font-color);
}

.active-link {
  color: var(--accent-color);
}

</style>
