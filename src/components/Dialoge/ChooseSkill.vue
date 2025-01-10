<script setup lang="ts">

  import {char} from "@/composables/char";
  import {uploadSheet} from "@/composables/fetch";
  import {DialogChooseSkill} from "@/composables/dialogs";
  import {computed} from "vue";

  const knowledgeSkills = computed(() => char.knowledgeSkills.filter((skill) => skill.total > 0 || char.isSkillSelected(skill.name)));
  const activeSkills = computed(() => char.actionSkills.filter((skill) => skill.total > 0 || char.isSkillSelected(skill.name)));

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
        <li v-for="skill in knowledgeSkills" :key="skill.name" class="item">
          <template v-if="skill.rating == 0 && skill.type == 'Language'">
            <div>{{ skill.name }} ( nat )</div>
          </template>

          <template v-else>
            <div>{{ skill.name }}<strong> {{skill.total}} </strong> ( {{skill.rating}} )</div>
          </template>
          <input type="checkbox" class="favourite" :checked="char.isSkillSelected(skill.name)" @change="toggleSkill(skill.name)">
        </li>
      </ul>
    <strong>Aktionsfertigkeiten</strong>
    <ul>
      <li v-for="skill in activeSkills" :key="skill.name">
      <div class="item">
        <div>{{ skill.name }}<strong> {{skill.total}} </strong> ( {{skill.rating}} ) </div>
        <input type="checkbox" class="favourite" :checked="char.isSkillSelected(skill.name)" @change="toggleSkill(skill.name)">
      </div>
      </li>
    </ul>
    </div>
  </div>

</template>

<style scoped>

strong {
  padding-top: 1rem;
  padding-left: 2vw;
}

.dialog-box {
  height: 80dvh;
  width: 90dvw;
  overflow: scroll;
  padding: 0;
  align-items: normal;
}

.item {
  padding: 0 2vw;
}


</style>/