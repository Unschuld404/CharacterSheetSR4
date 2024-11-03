<script setup lang="ts">
import {char} from "@/composables/char";
import {DialogRollDice} from "@/composables/dialogs";
</script>

<template>

  <div class="box">

    <div class="scroll-box">

      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <h2>Gegenstandsname</h2>
          <p>Anzahl</p>
        </div>
        <div class="row">
          <h3>Gegenstandsgruppe</h3>
        </div>
      </div>

    </div>

    <div class="lower-header">Inventar</div>

  </div>

</template>

<style scoped>

.item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1vh;
}

.row {
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 2vh;
  color: var(--accent-color);
  font-weight: normal;
}

.box {
  height: 73vh;
  overflow: scroll;
}


</style>