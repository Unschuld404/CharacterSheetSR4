<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogWeapon, DialogRollDice} from "@/composables/dialogs";
import {toInt} from "@/composables/utils";
import {uploadSheet} from "@/composables/fetch";
import {Weapon} from "@/composables/weapons";
import MagazinInfo from "@/components/MagazinInfo.vue";

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
             <div class="clickable" v-if="weapon.weaponname">{{ weapon.weaponname }}</div>
             <div class="clickable" v-else>{{ weapon.name }}</div>
             <div>Schaden: <strong>{{ weapon.damage }}</strong></div>
             <div v-if="weapon.ap != '-'">PB: <strong>{{ weapon.ap }}</strong></div>
           </div>
            <div class="row" v-if="weapon.isLoaded">
                <div>{{ weapon.ammoLoaded }}</div>
                <MagazinInfo :bulletsLeft="weapon.bulletsLeft" :magSize="weapon.magSize" />
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
              <div v-if="weapon.weaponname">{{ weapon.weaponname }}</div>
              <div v-else>{{ weapon.name }}</div>
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

.row {
  width: 95dvw;
  justify-content: space-between;
}

</style>/