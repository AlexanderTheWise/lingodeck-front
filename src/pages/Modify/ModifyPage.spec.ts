import { mount } from "@vue/test-utils";
import ModifyPage from "./ModifyPage.vue";
import { createTestingPinia } from "@pinia/testing";
import router from "@/router";
import FlashcardsForm from "@/components/FlashcardsForm/FlashcardsForm.vue";
import { expectedCall, fileValue } from "@/mocks/data";

const modifyFlashcard = vi.fn();
vi.mock("@/services/flashcards/flashcardsServices", () => ({
  default: () => ({ modifyFlashcard }),
}));

describe("ModifyPage component", () => {
  const mountModifyPage = () =>
    mount(ModifyPage, {
      global: {
        plugins: [createTestingPinia(), router],
      },
    });

  it("should render FlashcardsForm component", () => {
    const wrapper = mountModifyPage();

    const flashcardsFormComponent = wrapper.findComponent(FlashcardsForm);

    expect(flashcardsFormComponent.exists()).toBe(true);
  });

  describe("when the value of inputs are set to front 'Dog', back 'Perro', language 'English' and a file, and the form is submitted", () => {
    it("should call modifyFlashcard with that info and the page id", async () => {
      router.push("/modify/1");
      await router.isReady();
      const wrapper = mountModifyPage();
      const form = wrapper.find("form");
      const [front, back, image] = wrapper.findAll("input");
      const filter = wrapper.find(".filter");

      Object.defineProperty(image.element, "files", {
        value: [fileValue],
      });

      await front.setValue(expectedCall.front);
      await back.setValue(expectedCall.back);
      await filter.setValue(expectedCall.language);
      await image.trigger("change");
      await form.trigger("submit");

      expect(modifyFlashcard).toHaveBeenCalledWith(
        { ...expectedCall, image: fileValue },
        "1"
      );
    });
  });
});
