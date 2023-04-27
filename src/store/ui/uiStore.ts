import { defineStore } from "pinia";
import { reactive } from "vue";
import type { ModalPayload, UiState } from "@/types";
import patchState from "../patchState";

export const uiInitialState: UiState = {
  isLoading: false,
  openEyes: false,
  modal: {
    isError: false,
    isOpened: false,
    message: "",
    title: "",
  },
};

const useUiStore = defineStore("ui", () => {
  const ui = reactive<UiState>(uiInitialState);

  function openEyes() {
    patchState(ui, { ...ui, openEyes: true });
  }

  function closeEyes() {
    patchState(ui, { ...ui, openEyes: false });
  }

  function openModal(modalPayload: ModalPayload) {
    patchState(ui, { ...ui, modal: { ...modalPayload, isOpened: true } });
  }

  function closeModal() {
    patchState(ui, {
      ...ui,
      modal: { ...uiInitialState.modal, isError: ui.modal.isError },
    });
  }

  function setLoading() {
    patchState(ui, { ...ui, isLoading: true });
  }

  function unsetLoading() {
    patchState(ui, { ...ui, isLoading: false });
  }

  return {
    ui,
    openEyes,
    closeEyes,
    openModal,
    closeModal,
    setLoading,
    unsetLoading,
  };
});

export default useUiStore;
