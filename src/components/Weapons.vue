<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogWeapon, DialogRollDice} from "@/composables/dialogs";
import {toInt} from "@/composables/utils";
import {uploadSheet} from "@/composables/fetch";
import {Weapon} from "@/composables/weapons";

function toggleSelection(item: Weapon): void
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
  <ul>
      <li v-for="weapon in char.weapons" :key="weapon.name">

        <div v-if="!weapon.isMelee" class="box" @click="DialogWeapon.setWeapon(weapon).show()">
          <div class="upper-header">Fernkampfwaffe</div>
         <div class="item column">
           <div class="header row">
             <input type="checkbox" class="favourite" @click.stop :checked="char.isItemSelected(weapon)" @change="toggleSelection(weapon)">
             <div>{{ weapon.name }}</div>
           </div>

           <div class="row">

             <div class="damage-code">Schaden: <strong>{{ weapon.damage }}</strong></div>

             <div v-if="weapon.ap != '-'">PB: <strong>{{ weapon.ap }}</strong></div>

           </div>

           <div class="row">
             <div>{{ weapon.settings.ammoLoaded}}</div>
           </div>

         </div>
        </div>

        <div v-else class="box" @click="DialogRollDice.setValues(
                {
                  name: weapon.name,
                  value: toInt(weapon.dicepool),
                  values: [
                      {name: 'Fertigkeit', value: toInt(weapon.dicepool)-char.attributes.agility.total},
                      {name: 'Geschicklichkeit', value: char.attributes.agility.total},
                      ]
                }
                ).show()">
          <div class="upper-header">Nahkampfwaffe</div>
          <div class="item column">
            <div class="header row">
              <input type="checkbox" class="favourite" @click.stop :checked="char.isItemSelected(weapon)" @change="toggleSelection(weapon)">
              <div>{{ weapon.name }}</div>
            </div>

            <div class="row">

              <div class="damage-code">Schaden: <strong>{{ weapon.damage }}</strong></div>

              <div v-if="weapon.ap != '-'">PB: <strong>{{ weapon.ap }}</strong></div>

            </div>

          </div>
        </div>
      </li>
    </ul>
</template>

<style scoped>

.column {
  align-items: start;
}

.damage-code {
  width: 40vw;
}

li {
  margin-bottom: 1vh;
}

li:last-child {
  margin-bottom: 0;
}

</style>/