import useFlashcardsStore from "@/store/flashcard/flashcardStore";
import modalPayloads from "@/store/ui/modalPayloads";
import useUiStore from "@/store/ui/uiStore";
import useUserStore from "@/store/user/userStore";
import type { Flashcards } from "@/types";

interface FlashcardsServices {
  getFlashcards: (
    limit: number,
    page: number,
    language: string
  ) => Promise<void | Flashcards>;
}

const lingodeckBack: string = import.meta.env.VITE_LINGODECK_BACK;

const flashcardsServices = (): FlashcardsServices => {
  const flashcardsStore = useFlashcardsStore();
  const uiStore = useUiStore();
  const { token } = useUserStore().user;

  const getFlashcards = async (
    limit: number,
    page: number,
    language: string
  ) => {
    try {
      uiStore.setLoading();
      const response = fetch(
        `${lingodeckBack}/flashcards?limit=${limit}&page=${page}&$language=${language}`,
        {
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        }
      );

      if (!(await response).ok) throw new Error();

      const { flashcards } = (await (await response).json()) as {
        flashcards: Flashcards;
      };

      flashcardsStore.loadFlashcards(flashcards);
      uiStore.unsetLoading();
      return flashcards;
    } catch (error) {
      uiStore.unsetLoading();

      uiStore.openModal(modalPayloads.errors.getFlashcardsError);
    }
  };

  return { getFlashcards };
};

export default flashcardsServices;
