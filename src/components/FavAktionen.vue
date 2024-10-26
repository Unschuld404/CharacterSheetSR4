<script setup lang="ts">
import {char} from "../composables/data";
</script>

<template>

  <div class="box">

    <div class="scroll-box">

      <div class="item">
       <div>Lieblingsfähigkeit</div>
        <div class="formula">(F/2)+1</div>
      </div>

      <div class="item">
       <div>Manablitz</div>
        <div class="formula">(F/2) - 1</div>
      </div>

      <div class="item">
       <div>Lieblingsfähigkeit</div>
        <div class="formula">(F/2)+1</div>
      </div>

      <div class="item">
       <div>Lieblingsfähigkeit</div>
        <div class="formula">(F/2)+1</div>
      </div>

      <div class="item">
       <div>Lieblingsfähigkeit</div>
        <div class="formula">(F/2)+1</div>
      </div>

      <div class="item">
       <div>Manablitz</div>
        <div class="formula">(F/2) - 1</div>
      </div>

      <div class="item">
       <div>Lieblingsfähigkeit</div>
        <div class="formula">(F/2)+1</div>
      </div>

      <div class="item">
       <div>Lieblingsfähigkeit</div>
        <div class="formula">(F/2)+1</div>
      </div>

      <div class="item">
       <div>Lieblingsfähigkeit</div>
        <div class="formula">(F/2)+1</div>
      </div>

    </div>

    <div class="lower-header">Aktionen</div>

  </div>

</template>

<style scoped>

  .box {
    height: 100%
  }

  .item {
    display: flex;
    height: 6vh;
    line-height: 6vh;
    justify-content: space-between;
  }

</style>