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

  <ul class="box">
    <li class="left-header">Zaubersprüche</li>
    <li v-for="spell in char.spells" :key="spell.name" class="item">
      <div class="column">
        <div class="row">
          <div  class="name">{{ spell.name }}</div>
        </div>
        <div class="row info">
          <div>{{ spell.category }}</div>
          <div class="row group">
            <div class="value">{{ spell.type }}</div>
            <div class="value">{{ spell.range }}</div>
            <div class="value">{{ spell.duration }}</div>
          </div>
          <div class="drain">{{ spell.dv }}</div>
        </div>
      </div>
    </li>
  </ul>
  <button @click="DialogRollDice.setValues(
              {
                name: 'Spruchzauberei',
                value: char.spellcasting.total,
                values: [
                    {name: 'Magie', value: char.attributes.magic.total},
                    {name: 'Zauberwirken', value: char.spellcasting.total - char.attributes.magic.total},
                    ]
              }
              ).show()">Spruchzauberei: {{ char.spellcasting.total }}
  </button>

</template>

<style scoped>

.info {
  justify-content: space-between;
}

.value {
  width: 20px;
  text-align: center;
}

.group {
  position: absolute;
  right: 80px;
}

.drain {
  position: absolute;
  right: 10px;
}

button {
  width: 100%;
  font-size: 6dvw;
  font-weight: bold;
}

.left-header {
  padding: 0;
}

</style>/