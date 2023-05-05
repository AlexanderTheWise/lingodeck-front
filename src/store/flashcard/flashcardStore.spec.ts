import { createPinia, setActivePinia } from "pinia";
import useFlashcardsStore from "./flashcardStore";
import { mockFlashcards, newFlashcardInfo } from "@/mocks/data";

setActivePinia(createPinia());

const flashcardStore = useFlashcardsStore();

describe("loadFlashcards action", () => {
  it("should add fill the list of flashcards with the given flashcards input", () => {
    flashcardStore.loadFlashcards([...mockFlashcards.slice(0, 2)]);

    expect(flashcardStore.flashcards).toStrictEqual(mockFlashcards.slice(0, 2));
  });
});

describe("addFlashcard action", () => {
  it("should add a flashcard to the current flashcard list", () => {
    flashcardStore.addFlashcard({ ...mockFlashcards[2] });

    expect(flashcardStore.flashcards).toStrictEqual(mockFlashcards);
  });
});

describe("modifyFlashcard action", () => {
  it("should modify the flashcard with the given id with the given new info", () => {
    flashcardStore.modifyFlashcard("1", { ...newFlashcardInfo });

    expect(flashcardStore.flashcards[0]).toStrictEqual(
      expect.objectContaining(newFlashcardInfo)
    );
  });
});

describe("deleteFlashcard action", () => {
  it("should delete the flashcard with the given id input from the list", () => {
    flashcardStore.deleteFlashcard("1");

    expect(flashcardStore.flashcards).toStrictEqual(mockFlashcards.slice(1, 3));
  });
});
