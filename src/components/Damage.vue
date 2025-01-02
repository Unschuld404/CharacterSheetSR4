<script setup lang="ts">

import {char} from "@/composables/char";
</script>

<template>
  <div class="row space">
    <div class="column">
      <div>Körperlicher Schaden</div>
      <div class="row dmg">
        <i class='bx bxs-minus-square'></i>
        <div><strong>10</strong> / {{ char.maxPhysicalDamage }}</div>
        <i class='bx bxs-plus-square'></i>
      </div>
    </div>
    <div class="column">
      <div>Geistiger Schaden</div>
      <div class="row dmg">
        <i class='bx bxs-minus-square'></i>
        <div><strong>8</strong> / {{ char.maxStunDamage }}</div>
        <i class='bx bxs-plus-square'></i>
      </div>
    </div>
  </div>
  <div class="box">
    <strong>Du stirbst!</strong>
  </div>
</template>

<style scoped>

i {
  color: var(--accent-color);
  font-size: 1.5rem;
}

.box {
  background-color: var(--primary-color);
  padding: 0.5rem 1vw;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.dmg  {
  padding-left: 1rem;
  padding-right: 1rem;
}

.row {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
}

.column {
  width: 100%;
}

.space {
  margin: 0.5rem 0;
}

</style>
