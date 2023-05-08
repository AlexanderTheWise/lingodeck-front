import type { ModalPayload } from "@/types";

type ModalPayloadSet = Record<string, ModalPayload>;
interface ModalPayloads {
  confirm: ModalPayloadSet;
  errors: ModalPayloadSet;
}

const modalPayloads: ModalPayloads = {
  confirm: {
    registerConfirm: {
      isError: false,
      title: "Successfully registered",
      message: "You can login now",
    },
    createConfirm: {
      isError: false,
      title: "Succesfully created",
      message: "The flashcard has been added to your deck",
    },
    modifyConfirm: {
      isError: false,
      title: "Succesfully modified",
      message: "The flashcard has been modified",
    },
    deleteConfirm: {
      isError: false,
      title: "Succesfully deleted",
      message: "Flashcard has been removed from your deck",
    },
  },
  errors: {
    loginError: {
      isError: true,
      title: "Couldn't login",
      message: "Please, try again",
    },
    registerError: {
      isError: true,
      title: "Couldn't register",
      message: "Please, try again",
    },
    getFlashcardsError: {
      isError: true,
      title: "Error getting flashcards",
      message: "Couldn't get the requested flashcards",
    },
    createError: {
      isError: true,
      title: "Error creating the flashcard",
      message: "Wasn't possible to create the flashcard",
    },
    modifyError: {
      isError: true,
      title: "Error modifying the flashcard",
      message: "Flashcard couldn't be modified",
    },
    deleteError: {
      isError: true,
      title: "Error deleting the flashcard",
      message: "Flashcard couldn't be deleted from your deck",
    },
  },
};

export default modalPayloads;
