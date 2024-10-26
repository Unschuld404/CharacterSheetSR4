<script setup lang="ts">
import {RouterLink} from "vue-router";
import {getAttributeValueByName, char} from "@/composables/data";
import {menuRoutes} from "@/router";



</script>

<template>
  <header class="main-header">

    <div>
      <div class="nuyen">{{ char.nuyen }} ¥</div>
    </div>

    <nav class="navbar">
      <ul>
        <li v-for="item in menuRoutes">
          <RouterLink :to="item.path" class="nav-link"><i :class="item.icon"></i></RouterLink></li>
      </ul>
    </nav>

    <div class="edge">{{ getAttributeValueByName('EDG') }} Edge</div>

  </header>
</template>

<style scoped>
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

.edge {
  font-weight: bold;
}

.nuyen {

}

.nav-link {
  color: var(--font-color)
}

</style>
