<script setup lang="ts">

import {DialogChangeNuyen} from "@/composables/dialogs";
</script>

<template>

  <div class="box">

    <div class="scroll-box">
      <div class="item">
        <div>Kampfzauber</div>
        <div class="value">+ 2</div>
        <button @click="DialogChangeNuyen.show" class="dice">11</button>
      </div>

      <div class="item">
        <div>Tiergeister beschwören</div>
        <div class="value">+ 2</div>
        <button class="dice">11</button>
      </div>

      <div class="item">
        <div>Etwas anderes besonderes ...</div>
        <div class="value">+ 4</div>
        <button class="dice">9</button>
      </div>
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
    display: flex;
    height: 6vh;
    line-height: 6vh;
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
    top: 1vh;
  }

</style>