<script setup lang="ts">
import {DialogRollDice} from "@/composables/dialogs";
import {char} from "@/composables/char";
</script>

<template>

  <div class="knowledge-skills transparent-box">
    <div class="left-header">Wissensfertigkeiten</div>
    <ul>
      <li v-for="skill in char.knowledgeSkills" :key="skill.name" class="item">

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

</style>