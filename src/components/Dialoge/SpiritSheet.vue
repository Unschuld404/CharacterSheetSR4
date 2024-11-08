<script setup lang="ts">
import {DialogManageSpiritEdge, DialogRollDice, DialogSpiritPowerInfo, DialogSpiritSheet} from "@/composables/dialogs";
import {computed, ref} from "vue";
import RadioButtons from "@/components/RadioButtons.vue";
import ReleaseSpirit from "@/components/Dialoge/ReleaseSpirit.vue";
import {char} from "@/composables/char";
import ChooseSpiritPowers from "@/components/Dialoge/ChooseSpiritPowers.vue";
import {BoundModes, powerHasPool, SpiritPlanes} from "@/composables/spirits";
import SpiritPowerInfo from "@/components/Dialoge/SpiritPowerInfo.vue";
import SpiritSchadensmonitor from "@/components/SpiritSchadensmonitor.vue";

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
    <div class="modal-content" @click.stop>

      <div class="box row spirit">
        <div class="name">
          {{ spirit.caption }} - Stufe {{ spirit.force }}
        </div>
        <div @click="showPowersDialog()" class="formula optional-powers">powers {{ spirit.optionalPowersCount }} / {{ spirit.maxOptionalPowersCount }}</div>
        <div class="dice" @click="showReleaseDialog()"><i class='bx bx-unlink'></i></div>

        <div class="formula" @click="DialogManageSpiritEdge.show">{{spirit.edge}} Edge</div>
      </div>

      <div class="content">

        <div class="column skill-column">
          <div class="skills box">

            <div class="scroll-box">
              <div  v-for="(skill, index) in spirit.skills"  :key="index" class="item" >
                <div>
                  {{ skill.name }}
                </div>
                <div class="value">
                  + {{ skill.attribute_value }} {{ skill.attribute }}
                </div>
                <div>
                  <div class="dice skill-dice" @click="DialogRollDice.setName(skill.name).setDiceCount(skill.total).show()">{{ skill.total }}</div>
                </div>
              </div>

              <div  v-for="(power, index) in spirit.powers"  :key="index" class="item spirit-power" @click="DialogSpiritPowerInfo.setPower(power).show()">
                <div class="formula">{{ power.name }}</div>
                <div v-if="powerHasPool(power)"  class="dice skill-dice" @click="DialogRollDice.show()">{{ spirit.force }}</div>
              </div>
            </div>

          </div>
        </div>

        <div class="column">

          <div class="plane toggle">
            <RadioButtons class="mode" v-model="selectedSpiritPlane" :options="SpiritPlanes" group="planes"/>
          </div>
          <div class="binding toggle">
            <RadioButtons class="mode" v-model="selectedBoundMode" :options="BoundModes" group="bounded"/><br>
          </div>
          <div class="box damage">
            <SpiritSchadensmonitor/>
            <div class="lower-header">
              Schadensmonitor
            </div>
          </div>

        </div>

      <div class="column">

        <div class="box initiative">
          <div class="item-special">
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
          <div class="item-special">
            <div>Durchgänge</div>
            <strong>{{spirit.initiative.passes}}</strong>
          </div>
          <div class="item-special">
            <div>Bewegung</div>
            <div>{{spirit.spiritType?.movement ?? ''}}</div>
          </div>
        </div>
        <div class="box resistance">

          <div class="item-special">
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

          <div class="item-special">
            <div>Widerstand: Bannen</div>
            <button class="dice skill-dice" @click="DialogRollDice.setValues(
              {
                name: 'Widerstand gegen Bannen',
                value: spirit.force + char.attributes.magic.total,
                values: [
                    {name: 'MAG', value: char.attributes.magic},
                    {name: 'Kraftstufe', value: spirit.force},
                    ]
              }
              ).show()">{{ spirit.force + char.attributes.magic.total }}
            </button>
          </div>

          <div class="item-special">
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
        <div class="box flaws">
          <div>{{ spirit.spiritType?.flaws }}</div>

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
      </div>

    </div>

      </div>

  </div>

</template>

<style scoped>

.flaws {
  flex: 1;
}

.optional-powers {
  position: absolute;
  left: 10vh;
}

.value {
  position: absolute;
  right: 7vh;
}

.toggle {
  border: 1px solid var(--font-color);
  border-radius: 1vh;
}

i {
  margin-top: 0.4vh;
}

.mode {
  height: 100%;
}

.mod {
  align-content: center;
  justify-content: space-evenly;
  margin-bottom: 1vh;
}

.spirit{
  width: 100%;
  height: 8vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vh;
}

.item-special {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2vh;
  padding-right: 2vh;
  height: 4vh;
}

.box {
  align-content: center;
  text-align: center;
}

.resistance {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;
}

.binding{
  flex: 1;
}

.service{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.plane {
  flex: 1;
}

.initiative {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;
}

.name {
  position: absolute;
  font-size: 4vh;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
}

.scroll-box {
  height: 100%;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7vh;
}

strong {
  width: 4vh;
  text-align: center;
}

.skills{
  height: 100%;
}

.column {
  flex: 1;
  gap: 2vh;
}

.skill-column{
  flex: 1.3;
}

.content{
  display: flex;
  height: 65vh;
  margin-top: 2vh;
  position: relative;
  gap: 2vh;
}

.modal-overlay {
  z-index: 1000;
  background-color: var(--background-color);
}

.modal-content {
  height: 80vh;
  width: 90vw;
  margin-top: 10vh;
  z-index: 1001;
  position: relative;
  background-color: transparent;
  border: none;
  bottom: 5vh;
}

</style>/