import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import flashcardsServices from "./flashcardsServices";
import useUiStore from "@/store/ui/uiStore";
import useFlashcardsStore from "@/store/flashcard/flashcardStore";
import { mockFlashcards } from "@/mocks/data";
import modalPayloads from "@/store/ui/modalPayloads";
import type { NewOrModifiedCard } from "@/types";
import { setupFaultyServer } from "@/mocks/setupServer";

afterEach(() => {
  vi.clearAllMocks();
});

const push = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({ push }),
}));

setActivePinia(createTestingPinia({ stubActions: false }));
const { getFlashcards, createFlashcard, deleteFlashcard, modifyFlashcard } =
  flashcardsServices();

const uiStore = useUiStore();
const flashcardsStore = useFlashcardsStore();

afterEach(() => {
  flashcardsStore.flashcards = [];
});

const { back, front, language } = mockFlashcards[1];
const createdFlashcard: NewOrModifiedCard = {
  back,
  front,
  language,
  image: new File([""], ""),
};

describe("createFlashcard service", () => {
  describe("when it is called with a new flashcard", () => {
    it("should set and unset loading, redirect to flashcards page, add the flashcard to the store and call openModal with createConfirm", async () => {
      await createFlashcard(createdFlashcard);

      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.unsetLoading).toHaveBeenCalled();
      expect(push).toHaveBeenCalledWith({ name: "Flashcards" });
      expect(flashcardsStore.flashcards).toStrictEqual([mockFlashcards[0]]);
      expect(uiStore.openModal).toHaveBeenCalledWith(
        modalPayloads.confirm.createConfirm
      );
    });
  });

  describe("when the server returns an error creating the flashcard", () => {
    it("should set and unset loading and open modal with createError", async () => {
      setupFaultyServer();

      await createFlashcard(createdFlashcard);

      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.unsetLoading).toHaveBeenCalled();
      expect(uiStore.openModal).toHaveBeenCalledWith(
        modalPayloads.errors.createError
      );
    });
  });
});

describe("deleteFlashcard service", () => {
  describe("when it receives an id", () => {
    it("should set and unset oading, remove the flashcard with the given id, and open modal with deleteConfirm", async () => {
      flashcardsStore.flashcards = [mockFlashcards[0]];

      await deleteFlashcard(mockFlashcards[0].id);

      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.unsetLoading).toHaveBeenCalled();
      expect(flashcardsStore.flashcards).toStrictEqual([]);
      expect(uiStore.openModal).toHaveBeenCalledWith(
        modalPayloads.confirm.deleteConfirm
      );
    });
  });

  describe("when the response returns a error status", () => {
    it("should set and unset loading and open modal with deleteError", async () => {
      setupFaultyServer();
      await deleteFlashcard("1");

      expect(uiStore.openModal).toHaveBeenCalledWith(
        modalPayloads.errors.deleteError
      );
      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.unsetLoading).toHaveBeenCalled();
    });
  });
});

describe("modifyFlashcard service", () => {
  describe("when it receives and new flashcard info", () => {
    it("should set and unset loading, modify flashcard with that id, redirect to Flashcards page, open modal with modifyConfirm", async () => {
      flashcardsStore.flashcards = [mockFlashcards[0]];

      await modifyFlashcard({ ...createdFlashcard }, "1");

      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.unsetLoading).toHaveBeenCalled();
      expect(uiStore.openModal).toHaveBeenCalledWith(
        modalPayloads.confirm.modifyConfirm
      );
      expect(push).toHaveBeenLastCalledWith({ name: "Flashcards" });
      expect(flashcardsStore.flashcards[0]).toStrictEqual({
        ...mockFlashcards[1],
        id: "1",
      });
    });
  });

  describe("when the response returns an status error", () => {
    it("should set and unset loading and open modal with modifyError", async () => {
      setupFaultyServer();
      await modifyFlashcard({ ...createdFlashcard }, "1");

      expect(uiStore.openModal).toHaveBeenCalledWith(
        modalPayloads.errors.modifyError
      );
      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.unsetLoading).toHaveBeenCalled();
    });
  });
});

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
