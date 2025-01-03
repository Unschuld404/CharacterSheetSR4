<script setup lang="ts">
import {DialogManageSpiritEdge, DialogRollDice, DialogSpiritPowerInfo, DialogSpiritSheet} from "@/composables/dialogs";
import {computed, ref} from "vue";
import RadioButtons from "@/components/RadioButtons.vue";
import ReleaseSpirit from "@/components/Dialoge/Spirits/ReleaseSpirit.vue";
import {char} from "@/composables/char";
import ChangeSpiritPowers from "@/components/Dialoge/ChangeSpiritPowers.vue";
import {BoundModes, powerHasPool, SpiritPlanes} from "@/composables/spirits";
import SpiritPowerInfo from "@/components/Dialoge/Spirits/SpiritPowerInfo.vue";

const releaseDialogVisible = ref(false);
const powersDialogVisible = ref(false);
const spirit = computed( () => DialogSpiritSheet.spirit );
const services = computed ({
  get() { return spirit.value.services },
  set(value) { spirit.value.services = value }
});
const selectedBoundMode = computed ({
  get() { return spirit.value.bound ? BoundModes[0].value : BoundModes[1].value },
  set(value) { spirit.value.bound = value == BoundModes[0].value  }
})
const selectedSpiritPlane = computed ({
  get() { return spirit.value.plane },
  set(value) { spirit.value.plane = value  }
})


function addService() {
  services.value = services.value + 1;
}
function removeService() {
  if (services.value > 0)
  {
    services.value = services.value - 1;
  }
}

function showReleaseDialog(): void {
  releaseDialogVisible.value = true;
}
function onConfirmReleaseDialog(): void {
  char.releaseSpirit(DialogSpiritSheet.spirit);
  releaseDialogVisible.value = false;
  DialogSpiritSheet.hide();
}
function onCancelReleaseDialog(): void {
  releaseDialogVisible.value = false;
}
function showPowersDialog() {
  powersDialogVisible.value = true;
}
function onConfirmPowersDialog(powers: string[]): void {
  DialogSpiritSheet.spirit.optionalPowers = powers;
  powersDialogVisible.value = false;
}
function onCancelPowersDialog() {
  powersDialogVisible.value = false;
}

</script>/

<template>

  <ReleaseSpirit v-if="releaseDialogVisible" @confirm="onConfirmReleaseDialog" @cancel="onCancelReleaseDialog"/>
  <ChangeSpiritPowers v-if="powersDialogVisible" :count="spirit.maxOptionalPowersCount" :type="spirit.type" @confirm:selectedItems="onConfirmPowersDialog" @cancel="onCancelPowersDialog"/>
  <SpiritPowerInfo v-if="DialogSpiritPowerInfo.visible"/>

  <div v-if="DialogSpiritSheet.visible" class="overlay">
    <div class="sheet" @click.stop>
      <div class="sheet-header row">
        <button class="sheet-control" @click="showReleaseDialog()"><i class='bx bx-unlink'></i></button>
        <h1>{{ spirit.caption }} ({{ spirit.force }})</h1>
        <button class="sheet-control" @click="DialogSpiritSheet.hide"><i class='bx bxs-x-square'></i></button>
      </div>
      <div class="row">
        <div class="column">
          <div>Konsti</div>
          <div>{{  spirit.attributeTotal('BOD') }}</div>
        </div>
        <div class="column">
          <div>Geschick</div>
          <div>{{  spirit.attributeTotal('AGI') }}</div>
        </div>
        <div class="column">
          <div>Reaktion</div>
          <div>{{  spirit.attributeTotal('REA') }}</div>
        </div>
        <div class="column">
          <div>Stärke</div>
          <div>{{  spirit.attributeTotal('STR') }}</div>
        </div>
      </div>
      <div class="row powers">
        <div @click="showPowersDialog()" class="formula optional-powers">powers {{ spirit.optionalPowersCount }} / {{ spirit.maxOptionalPowersCount }}</div>
        <div class="formula" @click="DialogManageSpiritEdge.show">{{spirit.edge}} Edge</div>
      </div>

        <div class="toggle">
          <RadioButtons class="mode" v-model="selectedBoundMode" :options="BoundModes" group="bounded"/>
        </div>

        <div class="toggle">
          <RadioButtons class="mode" v-model="selectedSpiritPlane" :options="SpiritPlanes" group="planes"/>
        </div>

        <div class="box">
          <div class="left-header">Dienste</div>
          <div class="row services">
            <div class="mutator" @click="removeService">-</div>
            <h1>{{ services }}</h1>
            <div class="mutator" @click="addService">+</div>
          </div>
        </div>

        <div class="box">
          <div class="left-header">Initiative</div>
          <div class="row item">
            <div>Initiative</div>
            <button class="dice skill-dice" @click="DialogRollDice.setValues(
          {
            name: 'Initiative',
            value: spirit.initiative.pool,
            values: [
                {name: 'Initiative', value: spirit.initiative.pool},
                ]
          }
          ).show()">{{ spirit.initiative.pool }}
            </button>
          </div>
          <div class="row item">
            <div>Durchgänge</div>
            <strong>{{spirit.initiative.passes}}</strong>
          </div>
          <div class="row item">
            <div>Bewegung</div>
            <div>{{spirit.spiritType?.movement ?? ''}}</div>
          </div>

        </div>

        <div class="box">
          <div class="left-header">Widerstände</div>
          <div class="row item">
            <div>Panzerung</div>
            <button class="dice skill-dice" @click="DialogRollDice.setValues(
          {
            name: 'Panzerung',
            value: spirit.armor,
            values: [
                {name: '2 x Kraftstufe', value: spirit.force},
                ]
          }
          ).show()">{{ spirit.armor }}
            </button>
          </div>

          <div class="row item">
            <div>Widerstand: Bannen</div>
            <button class="dice skill-dice" @click="DialogRollDice.setValues(
          {
            name: 'Widerstand gegen Bannen',
            value: spirit.force + char.attributes.magic.total,
            values: [
                {name: 'MAG', value: char.attributes.magic.total},
                {name: 'Kraftstufe', value: spirit.force},
                ]
          }
          ).show()">{{ spirit.force + char.attributes.magic.total }}
            </button>
          </div>

          <div class="row item">
            <div>Widerstand: Binden</div>
            <button class="dice skill-dice" @click="DialogRollDice.setValues(
          {
            name: 'Widerstand gegen Binden',
            value: (spirit.force)*2,
            values: [
                {name: '2 x Kraftstufe', value: spirit.force},
                ]
          }
          ).show()">{{ (spirit.force)*2 }}
            </button>
          </div>

        </div>

        <div class="box">
          <div class="left-header">Skills</div>
          <div  v-for="(skill, index) in spirit.skills"  :key="index" class="item" >
            <div>
              {{ skill.name }} ({{ skill.rating }})
            </div>
            <div>
              <button class="dice" @click="DialogRollDice.setValues(
              {
                name: skill.name,
                value: skill.total,
                values: [
                    {name: skill.attribute, value: skill.attribute_value},
                    {name: skill.name, value: skill.rating},
                    ]
              }
              ).show()">{{ skill.total }}
              </button>
            </div>
          </div>

          <div  v-for="(power, index) in spirit.powers"  :key="index" class="item spirit-power">
            <div @click="DialogSpiritPowerInfo.setPower(power).show()">{{ power.name }}</div>
            <button v-if="powerHasPool(power)"  class="dice" @click="DialogRollDice.show()">X</button>
          </div>

        </div>

        <div class="box">
          <div class="left-header">Allergien</div>
          <div class="item">{{ spirit.spiritType?.flaws }}</div>
        </div>
    </div>

  </div>

</template>

<style scoped>

.powers {
  justify-content: space-between;
  padding: 6dvw 2dvw 0 2dvw;
  color: var(--accent-color)
}

.mode {
  height: 8vh;
}

.item {
  height: 5vh;
}

.services {
  justify-content: space-evenly;
  align-items: center;
}

.box {
  width: 100%;
  margin-top: 2vh;
}

.toggle {
  border: 1px solid var(--primary-color);
  border-radius: 1vh;
  margin: 2dvh 2dvw 0 2dvw;
}

.sheet-control {
  width: 4vh;
  height: 4vh;
  padding: 0;
  margin: 0;
  font-size: 3.8vh;
  color: var(--accent-color);
  border: none;
}

.sheet-header {
  padding: 0 2dvw 2vw 2dvw;
}

.column {
  width: 25%;
  text-align: center;
}

</style>/