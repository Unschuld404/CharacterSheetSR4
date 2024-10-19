<script setup lang="ts">

</script>

<template>

  <div class="box">
    <div class="dmg">

      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <div class="malus">-1</div>
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <div class="malus">-2</div>
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <div class="malus">-3</div>
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <div class="malus">-4</div>

    </div>
    <div class="lower-header">Geistiger Zustand</div>
  </div>

</template>

<style scoped>

  .box {
    height: 36vh;
    width: 50%;
  }

  .dmg {
    display: flex;
    flex-wrap: wrap;
    gap: 1vh;
    justify-content: space-evenly;
    padding-top: 1vh;
    padding-left: 2vh;
    padding-right: 2vh;
  }

  .favourite {
    height: 4vh;
    width: 4vh;
  }

  .malus {
    height: 4vh;
    width: 1vh;
    line-height: 4vh;
  }

</style>