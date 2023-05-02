import { createPinia, setActivePinia } from "pinia";
import useUiStore, { uiInitialState } from "./uiStore";
import { modalPayload, openedModal } from "@/mocks/data";

setActivePinia(createPinia());

const uiStore = useUiStore();

describe("openModal action", () => {
  it("should update modal isError, title and message with modal payload and set isOpened to true", ({
    expect,
  }) => {
    uiStore.openModal(modalPayload);

    expect(uiStore.ui.modal).toStrictEqual(openedModal);
  });
});

describe("closeModal action", () => {
  it("should reset modal title, message and isOpened, and keep last isError value, in this case, true", ({
    expect,
  }) => {
    expect(uiStore.ui.modal).toStrictEqual(openedModal);

    uiStore.closeModal();

    expect(uiStore.ui.modal).toStrictEqual({
      ...uiInitialState.modal,
      isError: modalPayload.isError,
    });
  });
});

describe("closeEyes action", () => {
  it("should set openEyes to false", ({ expect }) => {
    expect(uiStore.ui.openEyes).toBe(true);

    uiStore.closeEyes();

    expect(uiStore.ui.openEyes).toBe(false);
  });
});

describe("openEyes action", () => {
  it("should set openEyes to true", ({ expect }) => {
    expect(uiStore.ui.openEyes).toBe(false);

    uiStore.openEyes();

    expect(uiStore.ui.openEyes).toBe(true);
  });
});

describe("setLoading action", () => {
  it("should set isLoading to true", ({ expect }) => {
    expect(uiStore.ui.isLoading).toBe(false);

    uiStore.setLoading();

    expect(uiStore.ui.isLoading).toBe(true);
  });
});

describe("unsetLoading action", () => {
  it("should set isLoading to false", ({ expect }) => {
    expect(uiStore.ui.isLoading).toBe(true);

    uiStore.unsetLoading();

    expect(uiStore.ui.isLoading).toBe(false);
  });
});
