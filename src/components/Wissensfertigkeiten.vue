<script setup lang="ts">
import {DialogRollDice} from "@/composables/dialogs";
import {char} from "@/composables/char";
import {uploadSheet} from "@/composables/fetch";
import {computed} from "vue";

function toggleSkill(value: string)
{
  if (char.isSkillSelected(value))
  {
    char.unselectSkill(value);
  }
  else
  {
    char.selectSkill(value);
  }

  uploadSheet().then();
}

</script>

<template>

  <div class="knowledge-skills box">
    <div class="scrollbox">
      <ul>
        <li v-for="skill in char.knowledgeSkills" :key="skill.name" class="item row">
          <input type="checkbox" class="favourite" :checked="char.isSkillSelected(skill.name)" @change="toggleSkill(skill.name)">
          <div class="name">{{ skill.name }}</div>

          <template v-if="skill.rating == 0 && skill.type == 'Language'">
            <div>NAT</div>
          </template>

          <template v-else>
            <div class="value" ><strong>{{ skill.rating }}</strong> + {{ skill.attribute }} {{ skill.attribute_value }}</div>
            <button class="dice" @click="DialogRollDice.setName(skill.name).setDiceCount(skill.total).show()">{{ skill.total }}</button>
          </template>

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