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
  <div class="box">
    <strong>Waffen</strong>
    <ul>
        <li v-for="weapon in char.weapons" :key="weapon.name" class="item">

          <div v-if="!weapon.isMelee" @click="DialogWeapon.setWeapon(weapon).show()">
           <div class="column">
             <div class="clickable">{{ weapon.name }}</div>
             <div>Schaden: <strong>{{ weapon.damage }}</strong></div>
             <div v-if="weapon.ap != '-'">PB: <strong>{{ weapon.ap }}</strong></div>
             <div>{{ weapon.settings.ammoLoaded}}</div>
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
              <div>{{ weapon.name }}</div>
              <div>Schaden: <strong>{{ weapon.damage }}</strong></div>
              <div v-if="weapon.ap != '-'">PB: <strong>{{ weapon.ap }}</strong></div>
            </div>
          </div>
        </li>
      </ul>
  </div>
</template>

<style scoped>

strong {
  padding-top: 0.5rem;
  padding-left: 1vw;
}

.column {
  align-items: start;
  padding-bottom: 0;
}

</style>/