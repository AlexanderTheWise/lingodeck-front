import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import flashcardsServices from "./flashcardsServices";
import useUiStore from "@/store/ui/uiStore";
import useFlashcardsStore from "@/store/flashcard/flashcardStore";
import { mockFlashcards } from "@/mocks/data";
import modalPayloads from "@/store/ui/modalPayloads";

afterEach(() => {
  vi.clearAllMocks();
});

setActivePinia(createTestingPinia({ stubActions: false }));
const { getFlashcards } = flashcardsServices();

const uiStore = useUiStore();
const flashcardsStore = useFlashcardsStore();

describe("getFlashcards service", () => {
  describe("when it is called with positive limit and page params", () => {
    it("should set and unset loading, and loadFlashcards with the flashcards of the api", async () => {
      await getFlashcards(3, 1, "All", false);

      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.unsetLoading).toHaveBeenCalled();
      expect(flashcardsStore.flashcards).toStrictEqual(mockFlashcards);
    });
  });

  describe("when it is called with negative limit and page params", () => {
    it("should set and unset loading, and call openModal with getFlashcardsError", async () => {
      await getFlashcards(-3, -1, "All", false);

      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.unsetLoading).toHaveBeenCalled();
      expect(uiStore.openModal).toHaveBeenCalledWith(
        modalPayloads.errors.getFlashcardsError
      );
    });
  });
});
