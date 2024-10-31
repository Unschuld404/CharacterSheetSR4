<script setup lang="ts">

import {char, data} from "@/composables/data";
import {DialogChangeKarma} from "@/composables/dialogs";
</script>

<template>

  <div class="collection">

    <div class="row">

      <div class="column">

        <div class="flex-scroll">

          <div class="box chummer">
            <h1>{{ char.name }}</h1>
            <img src="../assets/Kaya_1zu1.png" alt="Kaya Mugshot" style="width:100% ; min-height: 100%; object-fit: cover">
          </div>

          <div class="box appearance">
            <div class="line"><div>Rasse:</div><div>{{ char.metatype }}</div></div>
            <div class="line"><div>Laufen:</div><div>{{ char.movement.walk }}</div></div>
            <div class="line"><div>Schwimmen:</div><div>{{ char.movement.swim }}</div></div>
            <div class="line"><div>Fliegen:</div><div>{{ char.movement.fly }}</div></div>
            <div class="line"><div>Größe:</div><div>{{ char.height }}</div></div>
            <div class="line"><div>Gewicht:</div><div>{{ char.height }}</div></div>
            <div class="line"><div>Alter:</div><div>{{ char.age }}</div></div>
            <div class="line"><div>Geschlecht:</div><div>{{ char.sex }}</div></div>
            <div class="line"><div>Hautfarbe:</div><div>{{ char.skin }}</div></div>
            <div class="line"><div>Augenfarbe:</div><div>{{ char.eyes }}</div></div>
            <div class="line"><div>Frisur:</div><div>{{ char.hair }}</div></div>
          </div>

        </div>

      </div>

      <div class="column">

        <div class="flex-scroll">

          <div class="box social">
            <div class="lower-header">Sozial</div>
            <div class="line"><div>Lebensstil</div><div>Unterschicht</div></div>
            <div class="line"><div>Straßenruf</div><div>-</div></div>
            <div class="line"><div>Schlechter Ruf</div><div>-</div></div>
            <div class="line"><div>Prominenz</div><div>-</div></div>
          </div>

          <div class="box contacts">
            <div class="lower-header">Kontakte</div>
            <div class="line"><div>Taliskrämer</div><div>Stufe 3</div></div>
            <div class="line"><div>Schieber</div><div>Stufe 2</div></div>
          </div>

          <div class="box gifts">
            <div class="lower-header">Gaben</div>
            <div class="line"><div>Infrarotsicht</div><div></div></div>
            <div class="line"><div>Zauberer</div><div>Schamane</div></div>
            <div class="line"><div>Totem</div><div>Wolf</div></div>
            <div class="line"><div>Kampfzauber</div><div>+2</div></div>
            <div class="line"><div>Geister des Tieres</div><div>+2</div></div>
          </div>

          <div class="box handycaps">
            <div class="lower-header">Nachteile</div>
            <div class="line"><div>Allergie (selten, leicht)</div><div>Nickel</div></div>
            <div class="line"><div>Empfindliches Nervensystem</div><div>Tech</div></div>
            <div class="line"><div>Gremlins</div><div>Stufe 1</div></div>
            <div class="line"><div>Immunabstoßung</div><div></div></div>
            <div class="line"><div>Rückzug aus Kampf</div><div>WIL + CHA (3)</div></div>
          </div>

        </div>

      </div>

      <div class="column">

        <div class="flex-scroll">

          <div class="box commlink">
            <div class="lower-header">Kommlink</div>
            <div class="line"><div>Kommlink</div><div>Sony Emperor</div></div>
            <div class="line"><div>Prozessor</div><div>X</div></div>
            <div class="line"><div>System</div><div>X</div></div>
            <div class="line"><div>Firewall</div><div>X</div></div>
            <div class="line"><div>Signal</div><div>X</div></div>
            <div class="line"><div>Programme</div><div>X</div></div>
          </div>

          <div class="box armor">
            <div class="lower-header">Rüstung</div>
            <div class="line"><div>Panzerweste</div><div>6/8</div></div>
          </div>

          <div class="box cyberware">
            <div class="lower-header">Cyber- und Bioware</div>
            <div class="line"><div>nichts</div><div></div></div>
          </div>

          <div class="box initiation">
            <div class="lower-header">Initiation</div>
            <div class="line"><div>Magisches Refugium</div><div>Stufe 5</div></div>
            <div class="line"><div>Initiationsgrad</div><div>0</div></div>
          </div>

        </div>

      </div>

      <div class="column">

        <div class="flex-scroll">

          <div class="box Karma">
            <div class="lower-header">Karma</div>
            <button @click="DialogChangeKarma.show">Karma hinzufügen</button>
            <div class="line" style="border-bottom: none"><div>Gesamt</div><div>8</div></div>
            <div class="line" style="border-bottom: none"><div>Aktuell</div><div>4</div></div>
          </div>

          <div class="box description">
            <div>
              Kaya ist eine zwergische Schamanin mit wilden Dreads, die mit Federn und Blättern verziert sind.
              Ihre intensiven grünen Augen und die tätowierten Hände verleihen ihr eine einzigartige Ausstrahlung.
              Ihr Refugium, ein verlassenes Schwimmbad in einem Hochhaus, ist ein kleiner Bauernhof voller Hochbeete,
              Pflanzkübel und Tieren wie Hühnern, Kaninchen, Ziegen und Katzen. Innerhalb ihres Refugiums ist Kaya
              ausgeglichen, ruhig und zuckersüß, unterstützt von einem Wassergeist bei ihrer Arbeit.
            </div>
            <div class="lower-header">Beschreibung</div>
          </div>

          <div class="box background">
            <div>
              Kaya stammt aus einer von Konzernen geprägten Stadt, die sie mit ihrer toxischen Umgebung und dem
              Kapitalismus in Konflikt brachte. Diese Erfahrungen haben ihre antikapitalistische Haltung und ihren
              unruhigen, rüpelhaften Charakter außerhalb ihres Refugiums geprägt.
            </div>
            <div class="lower-header">Hintergrund</div>
          </div>

          <div class="box concept">
            <div>
              Kaya lebt ein Hippie/Boho-Leben, widmet sich der Natur und Selbstversorgung.
              Ihr Refugium dient als Oase der Ruhe und Balance, während sie draußen eine kompromisslose Kämpferin gegen
              die Konzerne ist. Ihr totemtier Wolf symbolisiert ihre innere Stärke und ihren Schutzinstinkt.
            </div>
            <div class="lower-header">Konzept</div>
          </div>

          <div class="box notes">
            <div>
              Ziele: Sabotage von Konzernen, idealerweise bezahlt, aber auch aus Prinzip.
              Verhalten außerhalb des Refugiums: Unausgeglichen, rüpelhaft, mit einem derben Humor über ihre Größe.
              <br>
              Erster Run: 10.000 nY + 4 Karma
            </div>
            <div class="lower-header">Nozizen</div>
          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<style scoped>

.column  {
  flex: 1;
  height: 85vh;
}

.row {
  gap: 2vh;
}

.box {
  padding: 1vh;
  padding-bottom: 4vh;
  width: 100%;
}

.chummer {
  height: 42vh;
  overflow: hidden;
  padding: 0;
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