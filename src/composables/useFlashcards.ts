import { ref, watch } from "vue";
import flashcardsServices from "@/services/flashcards/flashcardsServices";
import type { Flashcards } from "@/types";

export default function useFlashcards() {
  const flashcards = ref<Flashcards>([]);
  const page = ref(1);
  const language = ref("All");
  const { getFlashcards } = flashcardsServices();

  watch(
    [page, language],
    async ([newPage, newLanguage], [, oldLanguage]) => {
      if (newLanguage !== oldLanguage) {
        page.value = 1;
      }

      flashcards.value = (await getFlashcards(4, newPage, newLanguage, true))!;

      if (flashcards.value.length == 0 && newPage > 1) {
        --page.value;
      }
    },
    { immediate: true }
  );

  return { flashcards, page, language };
}
