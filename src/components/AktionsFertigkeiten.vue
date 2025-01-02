<script setup lang="ts">
  import {char} from "@/composables/char";
  import {DialogRollDice} from "@/composables/dialogs";
</script>

<template>

  <div class="box">
    <div class="left-header">Aktionsfertigkeiten</div>
    <ul>
      <li v-for="skill in char.actionSkills" :key="skill.name" class="item">

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