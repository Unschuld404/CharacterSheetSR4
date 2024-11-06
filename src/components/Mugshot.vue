<script setup lang="ts">

import {char} from "@/composables/char";
import {DialogChangeKarma, DialogDiceResult, DialogEdgeDiceResult} from "@/composables/dialogs";
</script>

<template>

  <div class="collection">

      <div class="column optic">

        <div class="box chummer">
          <h1>{{ char.name }}</h1>
          <img src="../assets/Kaya_1zu1.png" alt="Kaya Mugshot" style="width:100% ; min-height: 100%; object-fit: cover" @click="DialogEdgeDiceResult.show">
        </div>

        <div class="flex-scroll">

          <div class="box appearance">
            <div class="line"><div>Rasse:</div><div>{{ char.metatype }}</div></div>
            <div class="line"><div>Laufen:</div><div>{{ char.movement.walk }} m</div></div>
            <div class="line"><div>Schwimmen:</div><div>{{ char.movement.swim }} m</div></div>
            <div class="line"><div>Fliegen:</div><div>{{ char.movement.fly }} m</div></div>
            <div class="line"><div>Größe:</div><div>{{ char.height }} m</div></div>
            <div class="line"><div>Gewicht:</div><div>{{ char.weight }}</div></div>
            <div class="line"><div>Alter:</div><div>{{ char.age }}</div></div>
            <div class="line"><div>Geschlecht:</div><div>{{ char.sex }}</div></div>
            <div class="line"><div>Hautfarbe:</div><div>{{ char.skin }}</div></div>
            <div class="line"><div>Augenfarbe:</div><div>{{ char.eyes }}</div></div>
            <div class="line"><div>Frisur:</div><div>{{ char.hair }}</div></div>
          </div>

        </div>

      </div>

      <div class="column board">
        <div class="row attributes">
          <div class="box column">
              <div class="lower-header">KON</div>
              <strong>{{ char.attributes.body.total }}</strong>
            </div>
          <div class="box column">
            <div class="lower-header">GES</div>
            <strong>{{ char.attributes.agility.total }}</strong>
          </div>
          <div class="box column">
            <div class="lower-header">REA</div>
            <strong>{{ char.attributes.reaction.total }}</strong>
          </div>
          <div class="box column">
            <div class="lower-header">STR</div>
            <strong>{{ char.attributes.strength.total }}</strong>
          </div>
          <div class="box column">
            <div class="lower-header">CHA</div>
            <strong>{{ char.attributes.charisma.total }}</strong>
          </div>
          <div class="box column">
            <div class="lower-header">INT</div>
            <strong>{{ char.attributes.intuition.total }}</strong>
          </div>
          <div class="box column">
            <div class="lower-header">LOG</div>
            <strong>{{ char.attributes.logic.total }}</strong>
          </div>
          <div class="box column">
            <div class="lower-header">WIL</div>
            <strong>{{ char.attributes.willpower.total }}</strong>
          </div>
          <div class="box column">
            <div class="lower-header">EDG</div>
            <strong>{{ char.attributes.edge.total }}</strong>
          </div>
          <div class="box column">
            <div class="lower-header">MAG</div>
            <strong>{{ char.attributes.magic.total }}</strong>
          </div>
        </div>
        <div class="row divers">
          <div class="column bonus">

            <div class="flex-scroll">

              <div class="box cyberware">
                <div class="lower-header">Cyber- und Bioware</div>
                <div class="line"><div>-</div><div></div></div>
              </div>

              <div v-if="char.initiategrade > 0" class="box initiation">
                <div class="lower-header">Initiation</div>
                <div class="line"><div>Initiationsgrad</div><div>{{char.initiategrade}}</div></div>
              </div>

              <div class="box gifts">
                <div class="lower-header">Gaben</div>
                <div class="line"><div>Infrarotsicht</div><div></div></div>
                <div class="line"><div>Zauberer</div><div>-</div></div>
                <div class="line"><div>Totem</div><div>-</div></div>
                <div class="line"><div>Kampfzauber</div><div>-</div></div>
                <div class="line"><div>Geister des Tieres</div><div>-</div></div>
              </div>

              <div class="box handicaps">
                <div class="lower-header">Nachteile</div>
                <div class="line"><div>Allergie (selten, leicht)</div><div>-</div></div>
                <div class="line"><div>Empfindliches Nervensystem</div><div>-</div></div>
                <div class="line"><div>Gremlins</div><div>-</div></div>
                <div class="line"><div>Immunabstoßung</div><div>-</div></div>
                <div class="line"><div>Rückzug aus Kampf</div><div>-</div></div>
              </div>

            </div>

          </div>

          <div class="column equip">

            <div class="flex-scroll">

              <div class="box description">
                <div>
                  {{char.description}}
                </div>
                <div class="lower-header">Beschreibung</div>
              </div>

              <div class="box background">
                <div>
                  {{char.background}}
                </div>
                <div class="lower-header">Hintergrund</div>
              </div>

              <div class="box concept">
                <div>
                  {{char.concept}}
                </div>
                <div class="lower-header">Konzept</div>
              </div>

              <div class="box notes">
                <div>
                  {{char.notes}}}
                </div>
                <div class="lower-header">Notizen</div>
              </div>

            </div>

          </div>

          <div class="column karma">

            <div class="flex-scroll">

              <div class="box Karma">
                <div class="lower-header">Karma</div>
                <button @click="DialogChangeKarma.show">Karma hinzufügen</button>
                <div class="line" style="border-bottom: none"><div>Gesamt</div><div>8</div></div>
                <div class="line" style="border-bottom: none"><div>Aktuell</div><div>4</div></div>
              </div>

              <div class="box contacts">
                <div class="lower-header">Kontakte</div>
                <div class="line"><div>-</div><div>-</div></div>
                <div class="line"><div>-</div><div>-</div></div>
              </div>

              <div class="box social">
                <div class="lower-header">Sozial</div>
                <div class="line"><div>Lebensstil</div><div>-</div></div>
                <div class="line"><div>Straßenruf</div><div>{{char.totalstreetcred}}</div></div>
                <div class="line"><div>Schlechter Ruf</div><div>{{char.totalnotoriety}}</div></div>
                <div class="line"><div>Prominenz</div><div>{{char.totalpublicawareness}}</div></div>
              </div>

            </div>

          </div>
        </div>
      </div>

  </div>

</template>

<style scoped>

strong {
  text-align: center;
  margin-top: 1vh;
  line-height: 2vh;
}

.column {
  height: 100%;
}

.flex-scroll {
  height: 75vh;
  padding-right: 0;
}

.attributes {
  margin-bottom: 2vh;
  gap: 2vh;
}

.divers {
  height: 100%;
}

.bonus {
  flex: 1;
  height: 100%;
  margin-right: 2vh;
}

.equip {
  flex: 1;
  height: 100%;
  margin-right: 2vh;
}

.karma {
  flex: 1;
  height: 100%;
}

.optic {
  flex: 1;
  height: 100%;
  width: 100%;
  margin-right: 2vh;
}

.board {
  flex: 3;
  height: 100%;
}

.collection{
  height: 85vh;
  display: flex;
}

.box {
  padding-bottom: 4vh;
  width: 100%;
}

.chummer {
  overflow: hidden;
  padding: 0;
  margin-bottom: 2vh;
  height: 77vh;
}

.appearance {
  padding-bottom: 1vh;
}

.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5vh;
  border-bottom: 1px solid var(--background-color);
}

.line:last-child {
  border-bottom: none;
}

button {
  background-color: var(--background-color);
  border-radius: 1vh;
  font-size: 3vh;
  font-weight: bold;
  color: var(--accent-color);
  padding: 2vh;
  margin-bottom: 2vh;
  width: 100%;
  border: none;
}

</style>