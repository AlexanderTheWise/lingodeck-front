<script setup lang="ts">
import useFlashcardsStore from "@/store/flashcard/flashcardStore";
import Cards from "../icons/Cards.vue";
import flashcardsServices from "@/services/flashcards/flashcardsServices";

await flashcardsServices().getFlashcards(1000, 1, "All", false);

const { dueToReviewCards } = useFlashcardsStore();
</script>

<template>
  <div class="flashcards-page__counter box-row centered-box">
    <p>Due to review: {{ dueToReviewCards.length }}</p>
    <Cards />
  </div>
</template>
