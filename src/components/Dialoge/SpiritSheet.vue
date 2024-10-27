<script setup lang="ts">
import {DialogRollDice, DialogSpiritSheet} from "@/composables/dialogs";
</script>/

<template>

  <div v-if="DialogSpiritSheet.visible" class="modal-overlay" @click="DialogSpiritSheet.hide">
    <div class="modal-content" @click.stop>

      <div class="plane row">
        <div>Aktuelle Ebene:</div>
        <div class="toggle">Toggle</div>
      </div>

      <h1 class="critter-name">Watcher Stufe 1</h1>

      <div class="row">

        <div class="scroll-box">

          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>
          <div class="item row">
            <div class="skill">Fertigkeit/Kraft</div>
            <div class="total-value">5</div>
          </div>


        </div>

        <div class="column">

          <div class="row">



          </div>

        </div>

      </div>

    </div>
  </div>

</template>

<style scoped>

.item {
  font-size: 3vh;
  line-height: 5vh;
  justify-content: space-between;
  align-items: center;
}

.total-value {
  line-height: 4vh;
}

.scroll-box {
  width: 40%;
  height: 65vh;
}

.plane {
  position: absolute;
  left: 20%;
  transform: translateX(-50%);
  top: 4vh;
  width: 30%;
  text-align: center;
  justify-content: space-evenly;
  align-items: center;
}

.toggle {
  left: 20%;
  background-color: var(--background-color);
  padding: 1vh;
  border-radius: 1vh;
  width: 40%;
  text-align: center;
}

.toggle:active {
  background-color: transparent;
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
}

.modal-overlay {
  z-index: 1000;
}

.modal-content {
  height: 80vh;
  width: 80vw;
  z-index: 1001;
  position: relative;
}

</style>/