<script setup lang="ts">
import {char} from "@/composables/char";
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

  <div class="box">
    <div class="scroll-box">
      <ul>
        <li v-for="skill in skills" :key="skill.name" class="item">
          <input type="checkbox" class="favourite" :checked="char.isSkillSelected(skill.name)" @change="toggleSkill(skill.name)">
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
        </li>
      </ul>
    </div>
    <div class="lower-header">Aktionsfertigkeiten</div>
  </div>

</template>

<style scoped>

.item {
  display: flex;
  height: 7vh;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-left: 5vh;
}

.favourite {
  position: absolute;
  left: 0;
  bottom: 2vh;
}

</style>