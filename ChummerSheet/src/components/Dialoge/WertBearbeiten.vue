<script setup lang="ts">

  import {useModalStore} from "@/stores/modalStore";

  const modalStore = useModalStore();

</script>/

<template>

  <div class="modal-overlay">
    <div class="modal-content">

      <div class="dice-roll">
        <div class="boost">EDGE</div>
        <div class="dice-pool">57</div>
        <div class="modify">
          <i class='bx bx-chevron-up mod'></i>
          <i class='bx bx-chevron-down mod' ></i>
        </div>
      </div>
      <button class="confirm" @click="modalStore.closeModal">OK</button>

    </div>
  </div>

</template>