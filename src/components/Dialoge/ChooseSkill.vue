<script setup lang="ts">

  import {char} from "@/composables/char";
  import {uploadSheet} from "@/composables/fetch";
  import {DialogChooseSkill} from "@/composables/dialogs";

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

</script>/

<template>

  <div v-if="DialogChooseSkill.visible" class="overlay" @click="DialogChooseSkill.hide">
    <div class="dialog-box column" @click.stop>
      <strong>Wissensfertigkeiten</strong>
      <ul>
        <li v-for="skill in char.knowledgeSkills" :key="skill.name" class="item">
          <template v-if="skill.rating == 0 && skill.type == 'Language'">
            <div>{{ skill.name }} ( nat )</div>
          </template>

          <template v-else>
            <div>{{ skill.name }} ( {{skill.rating}} )</div>
          </template>
          <input type="checkbox" class="favourite" :checked="char.isSkillSelected(skill.name)" @change="toggleSkill(skill.name)">
        </li>
      </ul>
    <strong>Aktionsfertigkeiten</strong>
    <ul>
      <li v-for="skill in char.actionSkills" :key="skill.name">
      <div class="item">
        <div>{{ skill.name }} ( {{skill.rating}} )</div>
        <input type="checkbox" class="favourite" :checked="char.isSkillSelected(skill.name)" @change="toggleSkill(skill.name)">
      </div>
      </li>
    </ul>
    </div>
  </div>

</template>

<style scoped>

strong {
  padding-left: 4dvw;
  padding-top: 4vh;
}

.dialog-box {
  height: 80dvh;
  width: 90dvw;
  overflow: scroll;
  padding-top: 0;
}

.item {
  padding-left: 4dvw;
  padding-right: 4dvw;
}

</style>/