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

  <div class="transparent-box">
    <div class="left-header">Aktionsfertigkeiten</div>
    <ul>
      <li v-for="skill in char.actionSkills" :key="skill.name" class="item">
        <input type="checkbox" class="favourite" :checked="char.isSkillSelected(skill.name)" @change="toggleSkill(skill.name)">

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

      </li>
    </ul>
  </div>

</template>

<style scoped>

.item {
  padding-left: 5vh;
}

.favourite {
  position: absolute;
  left: 0;
}

</style>