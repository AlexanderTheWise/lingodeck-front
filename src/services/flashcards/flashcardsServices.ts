import useFlashcardsStore from "@/store/flashcard/flashcardStore";
import modalPayloads from "@/store/ui/modalPayloads";
import useUiStore from "@/store/ui/uiStore";
import useUserStore from "@/store/user/userStore";
import type {
  FlashcardsResponse,
  Flashcards,
  NewOrModifiedCard,
  FlashcardResponse,
} from "@/types";
import { useRouter } from "vue-router";

interface FlashcardsServices {
  getFlashcards: (
    limit: number,
    page: number,
    language: string,
    shouldReturn: boolean
  ) => Promise<void | Flashcards>;
  createFlashcard: (createdCard: NewOrModifiedCard) => Promise<void>;
  modifyFlashcard: (
    modifiedCard: NewOrModifiedCard,
    id: string
  ) => Promise<void>;
  deleteFlashcard: (id: string) => Promise<void>;
}

const lingodeckBack: string = import.meta.env.VITE_LINGODECK_BACK;
const isTesting = process.env.NODE_ENV === "test";

const flashcardsServices = (): FlashcardsServices => {
  const flashcardsStore = useFlashcardsStore();
  const uiStore = useUiStore();
  const router = useRouter();
  const { token } = useUserStore().user;

  const getFlashcards = async (
    limit: number,
    page: number,
    language: string,
    shouldReturn: boolean
  ): Promise<undefined | Flashcards> => {
    try {
      uiStore.setLoading();
      const response = fetch(
        `${lingodeckBack}/flashcards?limit=${limit}&page=${page}&language=${language}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!(await response).ok) throw new Error();

      const { flashcards } = (await (
        await response
      ).json()) as FlashcardsResponse;

      if (shouldReturn) {
        uiStore.unsetLoading();
        return flashcards;
      }

      flashcardsStore.loadFlashcards(flashcards);
      uiStore.unsetLoading();
    } catch (error) {
      uiStore.unsetLoading();

      uiStore.openModal(modalPayloads.errors.getFlashcardsError);
    }
  };

  const createFlashcard = async (createdCard: NewOrModifiedCard) => {
    try {
      uiStore.setLoading();
      const body = new FormData();

      Object.keys(createdCard).forEach((key) =>
        body.append(key, createdCard[key as keyof NewOrModifiedCard]!)
      );

      const response = await fetch(`${lingodeckBack}/flashcards`, {
        body: isTesting ? JSON.stringify(createdCard) : body,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error();

      const { flashcard } = (await (
        await response
      ).json()) as FlashcardResponse;

      flashcardsStore.addFlashcard({ ...flashcard });
      router.push({ name: "Flashcards" });
      uiStore.unsetLoading();
      uiStore.openModal(modalPayloads.confirm.createConfirm);
    } catch (error) {
      uiStore.unsetLoading();

      uiStore.openModal(modalPayloads.errors.createError);
    }
  };

  const modifyFlashcard = async (
    modifiedCard: NewOrModifiedCard,
    id: string
  ) => {
    try {
      uiStore.setLoading();
      const body = new FormData();

      Object.keys(modifiedCard).forEach((key) =>
        body.append(key, modifiedCard[key as keyof NewOrModifiedCard]!)
      );

      const response = await fetch(`${lingodeckBack}/flashcards/${id}`, {
        body: isTesting ? JSON.stringify(modifiedCard) : body,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error();

      const { flashcard } = (await (
        await response
      ).json()) as FlashcardResponse;

      flashcardsStore.modifyFlashcard(id, { ...flashcard });
      router.push({ name: "Flashcards" });
      uiStore.unsetLoading();
      uiStore.openModal(modalPayloads.confirm.modifyConfirm);
    } catch (error) {
      uiStore.unsetLoading();

      uiStore.openModal(modalPayloads.errors.modifyError);
    }
  };

  const deleteFlashcard = async (id: string) => {
    try {
      uiStore.setLoading();
      const response = await fetch(`${lingodeckBack}/flashcards/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error();

      flashcardsStore.deleteFlashcard(id);
      uiStore.unsetLoading();
      uiStore.openModal(modalPayloads.confirm.deleteConfirm);
    } catch (error) {
      uiStore.unsetLoading();

      uiStore.openModal(modalPayloads.errors.deleteError);
    }
  };

  return { getFlashcards, createFlashcard, modifyFlashcard, deleteFlashcard };
};

export default flashcardsServices;
