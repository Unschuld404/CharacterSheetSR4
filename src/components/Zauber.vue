<script setup lang="ts">
import {DialogRollDice} from "@/composables/dialogs";
import {char} from "@/composables/char";
import {uploadSheet} from "@/composables/fetch";
import {Spell} from "@/composables/types";


function toggleSelection(item: Spell): void
{
  if (char.isItemSelected(item))
  {
    char.unselectItem(item);
  }
  else
  {
    char.selectItem(item);
  }

  uploadSheet().then();
}


</script>

<template>
  <div class="box">
    <strong class="category">Zaubersprüche</strong>
    <ul>
      <li v-for="spell in char.spells" :key="spell.name" class="item">
        <div class="column">
          <div  class="name">{{ spell.name }}</div>
          <div class="row">
            <div class="subcaption">{{ spell.category }}</div>
            <div class="row">
              <div class="value">{{ spell.type }}</div>
              <div class="value">{{ spell.range }}</div>
              <div class="value">{{ spell.duration }}</div>
              <div class="drain">{{ spell.dv }}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <button @click="DialogRollDice.setValues(
              {
                name: 'Spruchzauberei',
                value: char.spellcasting.total,
                values: [
                    {name: 'Magie', value: char.attributes.magic.total},
                    {name: 'Zauberwirken', value: char.spellcasting.total - char.attributes.magic.total},
                    ]
              }
              ).show()">Spruchzauberei ( {{ char.spellcasting.total }} )
  </button>

</template>

<style scoped>

.box {
  margin-top: 2rem;
}

button {
  width: 100%;
  margin-top: 1rem;
}

.item:last-child {
  border-bottom: none;
}

.column {
  width: 100%;
}

.row {
  justify-content: space-between;
}

.drain {
  text-align: right;
  width: 3rem;
  margin-left: 1rem;
  margin-right: 1dvw;
}

.value {
  width: 1rem;
  margin-left: 0.5rem;
}

</style>/