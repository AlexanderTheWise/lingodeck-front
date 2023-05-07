import { computed, reactive } from "vue";
import type { NewOrModifiedCard } from "@/types";

export default function useFlashcardsForm() {
  const newFlashcard = reactive<NewOrModifiedCard>({
    back: "",
    front: "",
    language: "All",
    image: null,
  });

  const areCorrect = computed(
    () =>
      /^[a-zA-Z]{1,24}$/.test(newFlashcard.back) &&
      /^[a-zA-Z]{1,24}$/.test(newFlashcard.front) &&
      newFlashcard.image !== null
  );

  function changeLanguage(language: string) {
    newFlashcard.language = language;
  }

  function changeFile(event: Event) {
    newFlashcard.image = (event.target as HTMLInputElement).files![0];
  }

  return { newFlashcard, changeLanguage, changeFile, areCorrect };
}
