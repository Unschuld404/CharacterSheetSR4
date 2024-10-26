<script setup lang="ts">

import {data} from "@/composables/data";
</script>

<template>

<div class="box">
  <div class="chummer">
    <h1>{{ data?.name ?? 'The Shadow' }}</h1>
    <div class="img"></div>
  </div>
</div>
<div class="box">
  <div class="column">
    <div class="line" v-if="data"><div>Rasse:</div><div>{{data?.metatype ?? ''}}</div></div>
    <div class="line" v-if="data"><div>Laufen:</div><div>{{data?.movementwalk ?? ''}}</div></div>
    <div class="line" v-if="data"><div>Schwimmen:</div><div>{{data?.movementswim ?? ''}}</div></div>
    <div class="line" v-if="data"><div>Größe:</div><div>{{data?.height ?? ''}}</div></div>
    <div class="line" v-if="data"><div>Gewicht:</div><div>{{data?.weight ?? ''}}</div></div>
    <div class="line" v-if="data"><div>Alter:</div><div>{{data?.age ?? ''}}</div></div>
    <div class="line" v-if="data"><div>Geschlecht:</div><div>{{data?.sex ?? ''}}</div></div>
    <div class="line" v-if="data"><div>Hautfarbe:</div><div>{{data?.skin ?? ''}}</div></div>
    <div class="line" v-if="data"><div>Augenfarbe:</div><div>{{data?.eyes ?? ''}}</div></div>
    <div class="line" v-if="data"><div>Frisur:</div><div>{{data?.hair ?? ''}}</div></div>
  </div>
</div>

</template>

<style scoped>

.box {
  width: 40vh;
  overflow: hidden;
  margin-bottom: 2vh;
}

.chummer {
  height: 40vh;
}

.img {
  background-color: darkslategrey;
  width: 100%;
  height: 100%;
}

.column {
  width: 40vh;
  height: 40vh;
  padding: 2vh;
}

.line {
  border-bottom: 1px dotted var(--font-color);
  display: flex;
  justify-content: space-between;
  height: 4vh;
  line-height: 3.7vh;
}

.line:last-child {
  border-bottom: none;
}

</style>