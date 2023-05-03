import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Modal from "./Modal.vue";
import type { Modal as ModalState } from "@/types";
import useUiStore, { uiInitialState } from "@/store/ui/uiStore";

describe("Modal component", () => {
  const mountModal = (modal: ModalState) =>
    mount(Modal, {
      attachTo: document.body,
      global: {
        plugins: [
          createTestingPinia({
            initialState: { ui: { ui: { modal } } },
            stubActions: false,
          }),
        ],
      },
    });

  const dialogPrototype = HTMLDialogElement.prototype;
  dialogPrototype.close = () => {};
  dialogPrototype.showModal = () => {};

  const errorModal: ModalState = {
    isError: true,
    isOpened: true,
    message: "Flashcard couldn't be added to your deck",
    title: "Unsuccesfully added",
  };

  it("should render a error modal with 'errorModal' info and 'modal-error' class", () => {
    const wrapper = mountModal(errorModal);
    const modal = wrapper.find("dialog");

    expect(wrapper.html().includes(errorModal.title)).toBe(true);
    expect(wrapper.html().includes(errorModal.message)).toBe(true);
    expect(modal.classes()).toContain("modal--error");
    wrapper.unmount();
  });

  it("should render a close button", () => {
    const wrapper = mountModal(errorModal);

    const button = wrapper.find(".modal__button");

    expect(button.exists()).toBe(true);
    wrapper.unmount();
  });

  it("should render a normal modal with only modal class when isError is false", () => {
    const wrapper = mountModal({ ...errorModal, isError: false });

    expect(wrapper.classes()).toStrictEqual(["modal"]);
    wrapper.unmount();
  });

  it("should close the modal when the button is clicked", async () => {
    const closeSpy = vi.spyOn(dialogPrototype, "close");
    const wrapper = mountModal(errorModal);

    const button = wrapper.find(".modal__button");
    await button.trigger("click");

    expect(closeSpy).toHaveBeenCalled();
  });

  it("should open the modal when calling openModal", async () => {
    const showModalSpy = vi.spyOn(dialogPrototype, "showModal");
    const wrapper = mountModal(
      JSON.parse(JSON.stringify(uiInitialState.modal))
    );
    useUiStore().openModal({ ...errorModal });
    await wrapper.vm.$nextTick();

    expect(showModalSpy).toHaveBeenCalled();
  });
});
