<script setup lang="ts">
import {char} from "@/composables/char";
import {computed} from "vue";
import {Spell} from "@/composables/types";
import {Spirit} from "@/composables/spirits";
import {Vehicle} from "@/composables/vehicle";
import {Weapon} from "@/composables/weapons";
import {
  DialogChooseAction,
  DialogRollDice,
  DialogSpiritSheet,
  DialogVehicleSheet,
  DialogWeapon
} from "@/composables/dialogs";
import {toInt} from "@/composables/utils";

function handleWeapon(weapon: Weapon) {
  if (weapon.isMelee) {
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
    <strong class="category" @click="DialogChooseAction.show">Aktionen <i class='bx bxs-cog'></i></strong>
    <div>
      <div v-for="spell in spells" class="item" >
        <div>
          <div>{{ spell.name }}</div>
          <div class="subcaption">{{ spell.category }}</div>
        </div>
        <div>{{ spell.dv }}</div>
      </div>
      <div v-for="spirit in spirits" class="item" @click="DialogSpiritSheet.setSpirit(spirit).show()">
        <div>
          <div class="clickable">{{ spirit.type }} ({{ spirit.force }})</div>
          <div class="subcaption">Geist</div>
        </div>
        <div class="right">
          <div>{{ spirit.plane }}-Ebene</div>
          <div>Dienste: {{ spirit.services }}</div>
        </div>
      </div>
      <div v-for="vehicle in vehicles" class="item" @click="DialogVehicleSheet.setVehicle(vehicle).show()">
        <div>
          <div class="clickable">{{ vehicle.name }}</div>
          <div class="subcaption">Fahrzeug oder Drohne</div>
        </div>
        <div>Modus: {{ vehicle.mode }}</div>
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
        <div>
          <div class="clickable">{{ weapon.name }}</div>
          <div class="subcaption">{{ weapon.category }}</div>
        </div>
        <div class="right">{{ weapon.ammoLoaded }}</div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.box {
  padding: 0.5rem 0;
}

.right {
  text-align: right;
  text-transform: capitalize;
}

</style>