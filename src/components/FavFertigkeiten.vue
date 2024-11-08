<script setup lang="ts">

import {computed} from "vue";
import {char} from "@/composables/char";
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

        <template v-if="skill.rating == 0 && skill.type == 'Language'">
          <div>{{ skill.name }} ( nat )</div>
        </template>

        <template v-else>
          <div>{{ skill.name }} ( {{skill.rating}} )</div>

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

    <div class="lower-header">Fähigkeiten</div>
  </div>

</template>

<style scoped>

  .box {
    height: 100%;
  }

  .value {
    width: 30%;
    position: absolute;
    right: 2vh;
  }

  .item {
    display: flex;
    height: 6vh;
    line-height: 6vh;
    justify-content: space-between;
    position: relative;
  }

  button {
    position: relative;
    top: 1vh;
  }

</style>