<script setup lang="ts">
import {DialogRollDice} from "@/composables/dialogs";
import {char} from "@/composables/char";
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
          <div class="value-group">
            <div class="value">{{ spell.type }}</div>
            <div class="value">{{ spell.range }}</div>
            <div class="value">{{ spell.duration }}</div>
          </div>
          <div class="formula">{{ spell.dv }}</div>
         </div>
         <button class="dice" @click="DialogRollDice.setName(spell.name).show()">{{ char.spellcasting.total }}</button>
         <button class="dice" @click="DialogRollDice.setValues(
              {
                name: spell.name,
                value: char.spellcasting.total,
                values: [
                    {name: 'MAG', value: char.attributes.magic.total},
                    {name: 'Zauberwirken', value: char.spellcasting.total - char.attributes.magic.total},
                    ]
              }
              ).show()">{{ char.spellcasting.total }}
         </button>
       </div>
      </li>
    </ul>
  </div>

</template>

<style scoped>

.dice {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.category {
  width: 50%;
}

  .value-group {
    display: flex;
  }

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
    margin-left: 6vh;
    margin-right: 6vh;
    justify-content: space-around;
  }

  .item {
    height: 14vh;
    width: 100%;
  }

  .item:last-child {
    border-bottom: 1px solid var(--background-color);
  }

  .value {
    width: 5vh;
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