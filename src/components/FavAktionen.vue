<script setup lang="ts">
import {char} from "@/composables/char";
import {computed} from "vue";
import {Spell} from "@/composables/types";
import {Spirit} from "@/composables/spirits";
import {Vehicle} from "@/composables/vehicle";
import {Weapon} from "@/composables/weapons";
import {DialogRollDice, DialogSpiritSheet, DialogVehicleSheet, DialogWeapon} from "@/composables/dialogs";
import {toInt} from "@/composables/utils";

function handleWeapon() {
  if (!weapon.isMelee) {
    // Aktion, wenn die Bedingung erfüllt ist
    console.log("Bedingung ist wahr");
  } else {
    // Aktion, wenn die Bedingung nicht erfüllt ist
    console.log("Bedingung ist falsch");
  }
}

const spells = computed<Spell[]>(() => char.spells.filter((obj) =>  char.isItemSelected(obj)));
const spirits = computed<Spirit[]>(() => char.spirits.filter((obj) =>  char.isItemSelected(obj)));
const vehicles = computed<Vehicle[]>(() => char.vehicles.filter((obj) =>  char.isItemSelected(obj)));
const weapons = computed<Weapon[]>(() => char.weapons.filter((obj) =>  char.isItemSelected(obj)));

</script>

<template>

  <div class="box">

    <div class="scroll-box">

      <div v-for="spell in spells" class="item" >
       <div>{{ spell.name }}</div>
        <div class="extra">{{ spell.dv }}</div>
      </div>

      <div v-for="spirit in spirits" class="item" @click="DialogSpiritSheet.setSpirit(spirit).show()">
        <div>{{ spirit.type }}</div>
        <div class="extra">{{ spirit.bound ? 'gebunden' : 'ungebunden' }}</div>
      </div>

      <div v-for="vehicle in vehicles" class="item"@click="DialogVehicleSheet.setVehicle(vehicle).show()">
        <div>{{ vehicle.name }}</div>
        <div class="extra">{{ vehicle.mode }}</div>
      </div>

      <div v-for="weapon in weapons" class="item"
           @click="!weapon.isMelee
              ? DialogWeapon.setWeapon(weapon).show()
              : DialogRollDice.setValues(
              {
                name: weapon.name,
                value: toInt(weapon.dicepool),
                values: [
                    {name: 'Fertigkeit', value: toInt(weapon.dicepool)-char.attributes.agility.total},
                    {name: 'Geschicklichkeit', value: char.attributes.agility.total},
                    ]
              }
              ).show()">
          <div>{{ weapon.name }}</div>
          <div class="extra">{{ weapon.category }}  ({{ toInt(weapon.dicepool)-char.attributes.agility.total }})</div>
      </div>

    </div>

    <div class="lower-header">Aktionen</div>

  </div>

</template>

<style scoped>

  .extra {
    color: var(--accent-color);
  }

  .box {
    height: 100%
  }

  .item {
    display: flex;
    height: 6vh;
    line-height: 6vh;
    justify-content: space-between;
  }

</style>