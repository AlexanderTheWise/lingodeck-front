import type { ModalPayload } from "@/types";

interface ModalPayloads {
  errors: Record<string, ModalPayload>;
}

const modalPayloads: ModalPayloads = {
  errors: {
    loginError: {
      isError: true,
      title: "Couldn't login",
      message: "Please, try again",
    },
  },
};

export default modalPayloads;
