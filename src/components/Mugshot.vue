<script setup lang="ts">

import {char} from "@/composables/char";
import {DialogChangeKarma} from "@/composables/dialogs";
</script>

<template>

  <div class="content">

    <div class="transparent-box chummer">
      <h1>{{ char.name }}</h1>
    </div>

    <div class="transparent-box appearance">
      <div class="left-header">Allgemein</div>
      <p class="line"><span>Rasse:</span><span>{{ char.metatype }}</span></p>
      <p class="line"><span>Laufen:</span><span>{{ char.movement.walk }} m</span></p>
      <p class="line"><span>Schwimmen:</span><span>{{ char.movement.swim }} m</span></p>
      <p class="line"><span>Fliegen:</span><span>{{ char.movement.fly }} m</span></p>
      <p class="line"><span>Größe:</span><span>{{ char.height }} m</span></p>
      <p class="line"><span>Gewicht:</span><span>{{ char.weight }}</span></p>
      <p class="line"><span>Alter:</span><span>{{ char.age }}</span></p>
      <p class="line"><span>Geschlecht:</span><span>{{ char.sex }}</span></p>
      <p class="line"><span>Hautfarbe:</span><span>{{ char.skin }}</span></p>
      <p class="line"><span>Augenfarbe:</span><span>{{ char.eyes }}</span></p>
      <p class="line"><span>Frisur:</span><span>{{ char.hair }}</span></p>
    </div>

    <div class="row">

      <div class="transparent-box column">
          <div class="upper-header">KON</div>
          <strong>{{ char.attributes.body.total }}</strong>
        </div>
      <div class="transparent-box column">
        <div class="upper-header">GES</div>
        <strong>{{ char.attributes.agility.total }}</strong>
      </div>
      <div class="transparent-box column">
        <div class="upper-header">REA</div>
        <strong>{{ char.attributes.reaction.total }}</strong>
      </div>
      <div class="transparent-box column">
        <div class="upper-header">STR</div>
        <strong>{{ char.attributes.strength.total }}</strong>
      </div>
      <div class="transparent-box column">
        <div class="upper-header">CHA</div>
        <strong>{{ char.attributes.charisma.total }}</strong>
      </div>
      <div class="transparent-box column">
        <div class="upper-header">INT</div>
        <strong>{{ char.attributes.intuition.total }}</strong>
      </div>
      <div class="transparent-box column">
        <div class="upper-header">LOG</div>
        <strong>{{ char.attributes.logic.total }}</strong>
      </div>
      <div class="transparent-box column">
        <div class="upper-header">WIL</div>
        <strong>{{ char.attributes.willpower.total }}</strong>
      </div>
      <div class="transparent-box column">
        <div class="upper-header">EDG</div>
        <strong>{{ char.attributes.edge.total }}</strong>
      </div>
      <div class="transparent-box column">
        <div class="upper-header">MAG</div>
        <strong>{{ char.attributes.magic.total }}</strong>
      </div>

    </div>

    <div class="transparent-box">
      <div class="left-header">Rüstung</div>
      <div v-for="armor in char.armors" :key="armor.name" class="armor">
        {{ armor.name }} ( {{ armor.values.ballistic }} / {{ armor.values.impact }}) <template v-if="armor.equipped"> - angelegt</template>
        <ul>
          <li v-for="mod in armor.mods"> {{ mod.name }}  ( {{ mod.rating }} )</li>
        </ul>
      </div>
    </div>

    <div class="transparent-box">
      <div class="left-header">Cyber- und Bioware</div>
    </div>

    <div v-if="char.initiategrade > 0" class="transparent-box">
      <div class="left-header-header">Initiation</div>
      <div class="line"><div>Initiationsgrad {{char.initiategrade}}</div>
        <p v-for="metamagic in char.metamagics" :key="metamagic">
          {{ metamagic }}
        </p>
      </div>
    </div>

    <div class="transparent-box">
      <div class="left-header">Gaben</div>
      <p v-for="trait in char.traits">
        {{ trait }}
      </p>
    </div>

    <div class="transparent-box">
      <div class="left-header">Nachteile</div>
      <p v-for="flaw in char.flaws">
        {{ flaw }}
      </p>
    </div>

    <div class="transparent-box">
      <div class="left-header">Karma</div>
      <button class="confirm" @click="DialogChangeKarma.show">Karma hinzufügen</button>
      <p class="line" style="border-bottom: none"><span>Gesamt</span><span>8</span></p>
      <p class="line" style="border-bottom: none"><span>Aktuell</span><span>4</span></p>
    </div>

    <div class="transparent-box">
      <div class="left-header">Kontakte</div>
      <p v-for="contact in char.contacts" :key="contact.name">
          {{ contact.name }} ( {{ contact.rating }} )
      </p>
    </div>

    <div class="transparent-box">
      <div class="left-header">Lebensstil</div>
      <p v-for="lifestyle in char.lifestyles" :key="lifestyle.name">
        {{ lifestyle.name }} (  {{ lifestyle.cost }} ¥ für {{ lifestyle.months }} Monate )
      </p>
    </div>

    <div class="transparent-box">
      <div class="left-header">Sozial</div>
    </div>

    <div class="transparent-box">
      <p>
        {{char.description}}
      </p>
      <div class="left-header">Beschreibung</div>
    </div>

    <div class="transparent-box">
      <p>
        {{char.background}}
      </p>
      <div class="left-header">Hintergrund</div>
    </div>

    <div class="transparent-box">
      <p>
        {{char.concept}}
      </p>
      <div class="left-header">Konzept</div>
    </div>

    <div class="transparent-box">
      <p>
        {{char.notes}}}
      </p>
      <div class="left-header">Notizen</div>
    </div>


  </div>

</template>

<style scoped>

p {
  margin-left: 2dvw;
  margin-right: 2dvw;
}

.armor {
  margin-left: 2dvw;
}

.column {
  flex: 1;
  align-items: center;
  height: 8vh;
}

.line {
  display: flex;
  justify-content: space-between;
}

.chummer {
  padding-top: 2vh;
}

.left-header {
  margin-top: 1vh;
}

</style>