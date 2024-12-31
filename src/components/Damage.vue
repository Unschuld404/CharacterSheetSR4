<script setup lang="ts">

import {char} from "../composables/char";
</script>

<template>
  <div class="transparent-box row">
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
</template>

<style scoped>

i {
  color: var(--accent-color);
  font-size: 8vw;
}

.dmg  {
  padding-left: 4dvw;
  padding-right: 4dvw;
  align-items: center;
}

.transparent-box {
  padding-left: 2dvw;
  padding-right: 2dvw;
}

.row {
  display: flex;
  text-align: center;
  justify-content: space-between;
}

.column {
  width: 100%;
}

</style>
