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
  <div class="transparent-box">
    <div class="left-header">Waffen</div>
  <ul>
      <li v-for="weapon in char.weapons" :key="weapon.name" class="item">

        <div v-if="!weapon.isMelee" @click="DialogWeapon.setWeapon(weapon).show()">
         <div class="item column">
           <div class="row">
             <input type="checkbox" class="favourite" @click.stop :checked="char.isItemSelected(weapon)" @change="toggleSelection(weapon)">
             <div class="clickable-name">{{ weapon.name }}</div>
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

        <div v-else @click="DialogRollDice.setValues(
                {
                  name: weapon.name,
                  value: toInt(weapon.dicepool),
                  values: [
                      {name: 'Fertigkeit', value: toInt(weapon.dicepool)-char.attributes.agility.total},
                      {name: 'Geschicklichkeit', value: char.attributes.agility.total},
                      ]
                }
                ).show()">
          <div class="column">
            <div class="row">
              <input type="checkbox" class="favourite" @click.stop :checked="char.isItemSelected(weapon)" @change="toggleSelection(weapon)">
              <div class="clickable-name">{{ weapon.name }}</div>
            </div>

            <div class="row">

              <div class="damage-code">Schaden: <strong>{{ weapon.damage }}</strong></div>

              <div v-if="weapon.ap != '-'">PB: <strong>{{ weapon.ap }}</strong></div>

            </div>

          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.column {
  align-items: start;
  padding-bottom: 0;
}

.damage-code {
  width: 40vw;
}

li:last-child {
  margin-bottom: 0;
}

</style>/