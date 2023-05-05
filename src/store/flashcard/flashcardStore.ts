import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Flashcard, Flashcards } from "@/types";

export const flashcardsInitialState: Flashcards = [];

const useFlashcardsStore = defineStore("flashcards", () => {
  const flashcards = ref<Flashcards>(
    JSON.parse(JSON.stringify(flashcardsInitialState))
  );

  const dueToReviewCards = computed(() =>
    flashcards.value.filter(({ dueDate }) => Date() >= dueDate)
  );

  function loadFlashcards(flashcardsPayload: Flashcards) {
    flashcards.value = flashcardsPayload;
  }

  function modifyFlashcard(
    cardId: string,
    newFlashcardInfo: Omit<Flashcard, "id">
  ) {
    Object.assign(
      flashcards.value.find(({ id }) => id === cardId)!,
      newFlashcardInfo
    );
  }

  function deleteFlashcard(cardId: string) {
    flashcards.value = flashcards.value.filter(({ id }) => id !== cardId);
  }

  function addFlashcard(flashcard: Flashcard) {
    flashcards.value.push(flashcard);
  }

  return {
    dueToReviewCards,
    flashcards,
    loadFlashcards,
    modifyFlashcard,
    addFlashcard,
    deleteFlashcard,
  };
});

export default useFlashcardsStore;
