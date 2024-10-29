<script setup lang="ts">
import {DialogRollDice} from "@/composables/dialogs";
import {char} from "@/composables/data";
</script>

<template>

  <div class="knowledge-skills box">
    <div class="scrollbox">
      <ul>
        <li v-for="skill in char.knowledgeSkills" :key="skill.name" class="item row">
          <input type="checkbox" class="favourite">
          <div class="name">{{ skill.name }}</div>
          <div class="value" ><strong>{{ skill.rating }}</strong> + {{ skill.attribute }} {{ skill.attribute_value }}</div>
          <button class="dice" @click="DialogRollDice.setName(skill.name).setDiceCount(skill.total).show()">{{ skill.total }}</button>
        </li>
      </ul>
    </div>
    <div class="lower-header">Wissensfertigkeiten</div>
  </div>

</template>

<style scoped>

.row {
  justify-content: space-between;
  align-items: center;
}

.favourite {
  position: relative;
  bottom: 2vh;
}

.name {
  width: 40vh;
}

.value {
  width: 10vh;
  text-align: center;
}

</style>