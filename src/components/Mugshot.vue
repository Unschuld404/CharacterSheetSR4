<script setup lang="ts">

import {char} from "@/composables/char";
import {DialogChangeKarma, DialogEdgeDiceResult} from "@/composables/dialogs";
</script>

<template>

  <div class="collection">

    <div class="box chummer">
      <h1>{{ char.name }}</h1>
    </div>

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

    <div class="row">

      <div class="box column">
          <div class="upper-header">KON</div>
          <strong>{{ char.attributes.body.total }}</strong>
        </div>
      <div class="box column">
        <div class="upper-header">GES</div>
        <strong>{{ char.attributes.agility.total }}</strong>
      </div>
      <div class="box column">
        <div class="upper-header">REA</div>
        <strong>{{ char.attributes.reaction.total }}</strong>
      </div>
      <div class="box column">
        <div class="upper-header">STR</div>
        <strong>{{ char.attributes.strength.total }}</strong>
      </div>
      <div class="box column">
        <div class="upper-header">CHA</div>
        <strong>{{ char.attributes.charisma.total }}</strong>
      </div>
      <div class="box column">
        <div class="upper-header">INT</div>
        <strong>{{ char.attributes.intuition.total }}</strong>
      </div>
      <div class="box column">
        <div class="upper-header">LOG</div>
        <strong>{{ char.attributes.logic.total }}</strong>
      </div>
      <div class="box column">
        <div class="upper-header">WIL</div>
        <strong>{{ char.attributes.willpower.total }}</strong>
      </div>
      <div class="box column">
        <div class="upper-header">EDG</div>
        <strong>{{ char.attributes.edge.total }}</strong>
      </div>
      <div class="box column">
        <div class="upper-header">MAG</div>
        <strong>{{ char.attributes.magic.total }}</strong>
      </div>

    </div>

    <div class="box contacts">
      <div class="upper-header">Rüstung</div>
      <p v-for="armor in char.armors" :key="armor.name">
        {{ armor.name }} ( {{ armor.values.ballistic }} / {{ armor.values.impact }}) <template v-if="armor.equipped"> - angelegt</template>
        <ul>
          <li v-for="mod in armor.mods"> {{ mod.name }}  ( {{ mod.rating }} )</li>
        </ul>
      </p>
    </div>

    <div class="box cyberware">
      <div class="upper-header">Cyber- und Bioware</div>
    </div>

    <div v-if="char.initiategrade > 0" class="box initiation">
      <div class="upper-header">Initiation</div>
      <div class="line"><div>Initiationsgrad {{char.initiategrade}}</div>
        <p v-for="metamagic in char.metamagics" :key="metamagic">
          {{ metamagic }}
        </p>
      </div>
    </div>

    <div class="box gifts">
      <div class="upper-header">Gaben</div>
      <p v-for="trait in char.traits">
        {{ trait }}
      </p>
    </div>

    <div class="box handicaps">
      <div class="upper-header">Nachteile</div>
      <p v-for="flaw in char.flaws">
        {{ flaw }}
      </p>
    </div>

    <div class="box karma">
      <div class="upper-header">Karma</div>
      <button class="confirm" @click="DialogChangeKarma.show">Karma hinzufügen</button>
      <div class="line" style="border-bottom: none"><div>Gesamt</div><div>8</div></div>
      <div class="line" style="border-bottom: none"><div>Aktuell</div><div>4</div></div>
    </div>

    <div class="box contacts">
      <div class="upper-header">Kontakte</div>
      <p v-for="contact in char.contacts" :key="contact.name">
          {{ contact.name }} ( {{ contact.rating }} )
      </p>
    </div>

    <div class="box contacts">
      <div class="upper-header">Lebensstil</div>
      <p v-for="lifestyle in char.lifestyles" :key="lifestyle.name">
        {{ lifestyle.name }} (  {{ lifestyle.cost }} ¥ für {{ lifestyle.months }} Monate )
      </p>
    </div>

    <div class="box social">
      <div class="upper-header">Sozial</div>
    </div>

    <div class="box description">
      <p>
        {{char.description}}
      </p>
      <div class="upper-header">Beschreibung</div>
    </div>

    <div class="box background">
      <p>
        {{char.background}}
      </p>
      <div class="upper-header">Hintergrund</div>
    </div>

    <div class="box concept">
      <p>
        {{char.concept}}
      </p>
      <div class="upper-header">Konzept</div>
    </div>

    <div class="box notes">
      <p>
        {{char.notes}}}
      </p>
      <div class="upper-header">Notizen</div>
    </div>


  </div>

</template>

<style scoped>

.box {
  min-height: 5vh;
}

.column {
  flex: 1;
  align-items: center;
  height: 8vh;
}

.confirm {
  width: 80%;
}

.karma {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.line {
  display: flex;
  justify-content: space-between;
}

</style>