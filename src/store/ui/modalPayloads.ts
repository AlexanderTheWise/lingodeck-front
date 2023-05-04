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
  },
};

export default modalPayloads;
