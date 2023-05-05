<script setup lang="ts">
import Flashcard from "../Flashcard/Flashcard.vue";
import type { Flashcards } from "@/types";

defineProps<{
  flashcards: Flashcards;
}>();
</script>

<template>
  <ul class="cards box-column">
    <li
      v-for="flashcard in flashcards"
      :key="flashcard.id"
      class="box-row centered-box"
    >
      <Flashcard :flashcard="flashcard" />
    </li>
  </ul>
</template>

<style scoped>
@media (min-width: 700px) {
  .cards {
    display: grid;
    grid-template-columns: repeat(2, 320px);
    row-gap: 40px;
  }
}
</style>
