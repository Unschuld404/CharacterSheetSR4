<script setup lang="ts">
import {RouterLink} from "vue-router";
import {getAttributeValueByName, char} from "@/composables/data";
import {menuRoutes} from "@/router";

</script>

<template>
  <header class="main-header">

    <nav class="navbar">
      <ul>
        <li v-for="item in menuRoutes">
          <RouterLink :to="item.path" class="nav-link"><i :class="item.icon"></i></RouterLink></li>
      </ul>
    </nav>

  </header>
</template>

<style scoped>

.main-header {
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vh;
}

.navbar {
  width: 30%;
  align-items: center;
}

.navbar ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

i {
  color: var(--font-color);
}

</style>
