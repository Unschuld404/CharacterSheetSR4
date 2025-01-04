<script setup lang="ts">

import {computed} from "vue";
import {char} from "@/composables/char";
import {DialogChooseSkill, DialogRollDice} from "@/composables/dialogs";

const skills = computed(() => {
  let list = [];

  for (const skill of char.actionSkills)
  {
    if (char.isSkillSelected(skill.name))
    {
      list.push(skill);
    }
  }

  for (const skill of char.knowledgeSkills)
  {
    if (char.isSkillSelected(skill.name))
    {
      list.push(skill);
    }
  }

  return list;
});

</script>

<template>

  <div class="box">

    <strong class="category" @click="DialogChooseSkill.show">Fähigkeiten <i class='bx bxs-cog'></i></strong>
    <div>
      <div class="item" v-for="skill in skills" :key="skill.name">

        <template v-if="skill.rating == 0 && skill.type == 'Language'">
          <div>{{ skill.name }} ( nat )</div>
        </template>

        <template v-else>
          <div>{{ skill.name }} ({{skill.rating}})</div>

          <button class="dice" @click="DialogRollDice.setValues(
              {
                name: skill.name,
                value: skill.total,
                values: [
                    {name: skill.attribute, value: skill.attribute_value},
                    {name: skill.name, value: skill.rating},
                    ]
              }
              ).show()">{{ skill.total }}
          </button>
        </template>

      </div>
    </div>

  </div>

</template>

<style scoped>


.box {
  padding: 0.5rem 0;
}

.dice {
  margin-right: 3vw;
}

</style>