<script setup lang="ts">

import {computed} from "vue";
import {char} from "@/composables/data";
import {DialogRollDice} from "@/composables/dialogs";

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

    <div class="scroll-box">

      <div class="item" v-for="skill in skills" :key="skill.name">
       <div>{{ skill.name }}</div>
        <div class="value" ><strong>{{ skill.rating }}</strong> + {{ skill.attribute }} {{ skill.attribute_value }}</div>
        <button class="dice" @click="DialogRollDice.setName(skill.name).setDiceCount(skill.total).show()">{{ skill.total }}</button>
      </div>
    </div>

    <div class="lower-header">Fähigkeiten</div>
  </div>

</template>

<style scoped>

  .box {
    height: 100%;
  }

  .value {
    width: 30%;
  }

  .item {
    display: flex;
    height: 6vh;
    line-height: 6vh;
    justify-content: space-between;
  }

  button {
    position: relative;
    top: 1vh;
  }

</style>