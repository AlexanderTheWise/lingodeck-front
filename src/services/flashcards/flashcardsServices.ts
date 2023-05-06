import useFlashcardsStore from "@/store/flashcard/flashcardStore";
import modalPayloads from "@/store/ui/modalPayloads";
import useUiStore from "@/store/ui/uiStore";
import useUserStore from "@/store/user/userStore";
import type { Flashcards } from "@/types";

interface FlashcardsServices {
  getFlashcards: (
    limit: number,
    page: number,
    language: string,
    shouldReturn: boolean
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

      const { flashcards } = (await (await response).json()) as {
        flashcards: Flashcards;
      };

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

  return { getFlashcards };
};

export default flashcardsServices;
