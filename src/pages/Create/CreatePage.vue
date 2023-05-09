<script setup lang="ts">
import flashcardsServices from "@/services/flashcards/flashcardsServices";
import FlashcardsForm from "@/components/FlashcardsForm/FlashcardsForm.vue";

const { createFlashcard } = flashcardsServices();
</script>

<template>
  <div class="box-column centered-box">
    <FlashcardsForm @submit="createFlashcard">Create</FlashcardsForm>
  </div>
</template>
