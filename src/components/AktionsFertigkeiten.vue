<script setup lang="ts">
import {char} from "@/composables/data";
import {DialogRollDice} from "@/composables/dialogs";
import {uploadSheet} from "@/composables/fetch";
import {computed} from "vue";

const skills = computed(() => {
  return char.actionSkills.filter(skill => skill.total > 0 || char.isSkillSelected(skill.name));
});

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

  <div class="action-skills box">
    <div class="scroll-box">
      <ul>
        <li v-for="skill in skills" :key="skill.name" class="item row">
          <input type="checkbox" class="favourite" :checked="char.isSkillSelected(skill.name)" @change="toggleSkill(skill.name)">
          <div class="name">{{ skill.name }}</div>
          <div class="value"><strong>{{ skill.rating }}</strong> + {{ skill.attribute }} {{ skill.attribute_value }}</div>
          <button class="dice" @click="DialogRollDice.setName(skill.name).setDiceCount(skill.total).show()">{{ skill.total }}</button>
        </li>
      </ul>
    </div>
    <div class="lower-header">Aktionsfertigkeiten</div>
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