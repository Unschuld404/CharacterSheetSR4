<script setup lang="ts">

</script>

<template>

  <div class="box">
    <div class="row">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <div class="malus">-1</div>
    </div>
    <div class="row">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <div class="malus">-2</div>
    </div>
    <div class="row">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <div class="malus">-3</div>
    </div>
    <div class="row">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <div class="malus">-4</div>
    </div>
    <div class="row">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <div class="malus">-5</div>
    </div>
    <div class="row">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <input type="checkbox" class="favourite">
      <div class="malus">-6</div>
    </div>
    <div class="lower-header">Körperlicher Zustand</div>
  </div>

</template>

<style scoped>

  .box {
    height: 36vh;
    width: 50%;
    padding-top: 1vh;
  }

  .row {
    height: 5vh;
    line-height: 5vh;
    align-items: center;
    justify-content: space-around;
    padding-left: 1vh;
  }

  .favourite {
    height: 4vh;
    width: 4vh;
    position: relative;
    bottom: 2vh;
  }

  .malus {
    height: 4vh;
    width: 2vh;
    line-height: 4vh;
  }

</style>