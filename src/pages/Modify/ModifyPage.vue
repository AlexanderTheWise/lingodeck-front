<script setup lang="ts">
import FlashcardsForm from "@/components/FlashcardsForm/FlashcardsForm.vue";
import flashcardsServices from "@/services/flashcards/flashcardsServices";
import { useRoute } from "vue-router";

const route = useRoute();
const { modifyFlashcard } = flashcardsServices();
</script>

<template>
  <div class="box-column centered-box">
    <FlashcardsForm
      @submit="(flashcard) => modifyFlashcard(flashcard, route.params.id as string)"
      >Modify</FlashcardsForm
    >
  </div>
</template>
