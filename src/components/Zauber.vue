<script setup lang="ts">
import {DialogRollDice} from "@/composables/dialogs";
import {char} from "@/composables/data";
</script>

<template>

  <div class="scroll-box">
    <ul>
      <li v-for="spell in char.spells" :key="spell.name" class="item">
       <div class="item column">
         <div class="header-row">
           <input type="checkbox" class="favourite">
           <div  class="header">{{ spell.name }}</div>
         </div>
         <div class="row">
          <div class="category">{{ spell.category }}</div>
          <div class="value">{{ spell.type }}</div>
          <div class="value">{{ spell.range }}</div>
          <div class="value">{{ spell.duration }}</div>
          <div class="formula">{{ spell.dv }}</div>
          <div class="dice-box">
            <button class="dice" @click="DialogRollDice.setName(spell.name).show()">{{ char.spellcasting.total }}</button>
          </div>
         </div>
       </div>
      </li>
    </ul>
  </div>

</template>

<style scoped>

  .header {
    margin-top: 1.5vh;
  }

  .header-row{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .row {
    height: 8vh;
    margin-top: 1vh;
    margin-bottom: 1vh;
    justify-content: space-between;
  }

  .item {
    height: 14vh;
    border-bottom: 1px solid var(--background-color);
  }

  .value {
    width: 3vh;
    text-align: center;
  }

  .category{
    width: 30vh;
    text-align: center;
  }

  .formula{
    width: 8vh;
  }

  .favourite{
    position: relative;
    bottom: 2vh;
    margin-right: 3vh;
  }

</style>/