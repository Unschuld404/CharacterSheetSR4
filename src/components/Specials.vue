<script setup lang="ts">

</script>

<template>

  <div class="box">

    <div class="item">
      <div>Kampfzauber</div>
      <div class="value">+ 2</div>
      <button class="total-value">11</button>
    </div>

    <div class="item">
      <div>Tiergeister beschwören</div>
      <div class="value">+ 2</div>
      <button class="total-value">11</button>
    </div>

    <div class="item">
      <div>Etwas anderes besonderes ...</div>
      <div class="value">+ 4</div>
      <button class="total-value">9</button>
    </div>

    <div class="lower-header">Boni</div>

  </div>

</template>

<style scoped>

  .value {
    width: 10%;
  }

  .box {
    height: 22vh;
  }

  .item {
    position: relative;
    justify-content: flex-start;
    gap: 1vh;
  }

  .value {
    font-weight: bold;
  }

  button {
    position: absolute;
    right: 0;
  }

</style>