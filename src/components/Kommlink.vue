<script setup lang="ts">
import {char} from "../composables/char";
</script>

<template>

  <div class="box row">
    <div class="header">Mein Kommlink</div>
    <div class="column">
      <strong>3</strong>
      <div>Prozessor</div>
    </div>
    <div class="column">
      <strong>2</strong>
      <div>Signal</div>
    </div>
  </div>

</template>

<style scoped>

.box {
  height: 100%;
}

.row {
  justify-content: space-between;
  align-items: center;
}

.column {
  text-align: center;
  width: 10vh;
}

.header {
  line-height: 5.5vh;
  width: 70%;
}

strong {
  margin-bottom: 1vh;
}

</style>