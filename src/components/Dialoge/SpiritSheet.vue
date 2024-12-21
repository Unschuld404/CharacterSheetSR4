<script setup lang="ts">
import {DialogManageSpiritEdge, DialogRollDice, DialogSpiritPowerInfo, DialogSpiritSheet} from "@/composables/dialogs";
import {computed, ref} from "vue";
import RadioButtons from "@/components/RadioButtons.vue";
import ReleaseSpirit from "@/components/Dialoge/ReleaseSpirit.vue";
import {char} from "@/composables/char";
import ChooseSpiritPowers from "@/components/Dialoge/ChooseSpiritPowers.vue";
import {BoundModes, powerHasPool, SpiritPlanes} from "@/composables/spirits";
import SpiritPowerInfo from "@/components/Dialoge/SpiritPowerInfo.vue";

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

  <ChooseSpiritPowers v-if="powersDialogVisible" :count="spirit.maxOptionalPowersCount" :type="spirit.type" @confirm:selectedItems="onConfirmPowersDialog" @cancel="onCancelPowersDialog"/>

  <SpiritPowerInfo v-if="DialogSpiritPowerInfo.visible"/>

  <div v-if="DialogSpiritSheet.visible" class="modal-overlay" @click="DialogSpiritSheet.hide">

    <div class="column">

      <div class="modal-content" @click.stop>

        <div class="column">
          <h1 class="name">{{ spirit.caption }} ({{ spirit.force }})</h1>
          <div class="row">
            <div @click="showPowersDialog()" class="formula optional-powers">powers {{ spirit.optionalPowersCount }} / {{ spirit.maxOptionalPowersCount }}</div>
            <div class="formula" @click="DialogManageSpiritEdge.show">{{spirit.edge}} Edge</div>
            <div class="dice" @click="showReleaseDialog()"><i class='bx bx-unlink'></i></div>
          </div>
        </div>

        <div class="content">

          <div class="column gap">

            <div class="binding toggle">
              <RadioButtons class="mode" v-model="selectedBoundMode" :options="BoundModes" group="bounded"/>
            </div>

            <div class="plane toggle">
              <RadioButtons class="mode" v-model="selectedSpiritPlane" :options="SpiritPlanes" group="planes"/>
            </div>

            <div class="box service">
              <div class="row mod">
                <div class="mutator" @click="removeService">-</div>
                <h1>{{ services }}</h1>
                <div class="mutator" @click="addService">+</div>
              </div>
              <div class="lower-header">
                Dienste
              </div>
            </div>

            <div class="box initiative">

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

            <div class="box resistance">

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

            <div class="skills box">

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

              <div  v-for="(power, index) in spirit.powers"  :key="index" class="item spirit-power" @click="DialogSpiritPowerInfo.setPower(power).show()">
                <div class="formula">{{ power.name }}</div>
                <div v-if="powerHasPool(power)"  class="dice skill-dice" @click="DialogRollDice.show()">X</div>
              </div>

            </div>

            <div class="box flaws">
              <div>{{ spirit.spiritType?.flaws }}</div>
            </div>

          </div>

        </div>

      </div>

      <i class='bx bx-chevron-down'></i>

    </div>

  </div>

</template>

<style scoped>

strong {
  padding-right: 1vh;
}

.gap {
  gap: 10px;
}

.mode {
  height: 5vh;
}

.mod {
  margin-left: 5vw;
  margin-right: 5vw;
  height: 10vh;
  align-items: center;
}

.item {
  height: 5vh;
}

.row {
  justify-content: space-between;
}

.toggle {
  border: 1px solid var(--font-color);
  border-radius: 1vh;
}

.modal-overlay {
  z-index: 1000;
  background-color: var(--background-color);
}

.modal-content {
  height: 75vh;
  margin-top: 70px;
  width: 100vw;
  z-index: 1001;
  position: relative;
  background-color: transparent;
  border: none;
  bottom: 5vh;
  overflow: scroll;
}

</style>/