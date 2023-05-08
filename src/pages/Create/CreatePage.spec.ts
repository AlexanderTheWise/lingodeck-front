import { mount } from "@vue/test-utils";
import CreatePage from "./CreatePage.vue";
import FlashcardsForm from "@/components/FlashcardsForm/FlashcardsForm.vue";
import { createTestingPinia } from "@pinia/testing";
import router from "@/router";
import { expectedCall, fileValue, setFile } from "@/mocks/data";

const createFlashcard = vi.fn();
vi.mock("@/services/flashcards/flashcardsServices", () => ({
  default: () => ({
    createFlashcard,
  }),
}));

describe("CreatePage component", () => {
  const mountCreatePage = () =>
    mount(CreatePage, {
      global: {
        plugins: [createTestingPinia(), router],
      },
    });

  it("should render a FlashcardsForm component", () => {
    const wrapper = mountCreatePage();

    const flashcardsForm = wrapper.findComponent(FlashcardsForm);

    expect(flashcardsForm.exists()).toBe(true);
  });

  describe("when the value of inputs are set to front 'Dog', back 'Perro', language 'English' and a file, and the form is submitted", () => {
    it("should call createFlashcard with that info", async () => {
      const wrapper = mountCreatePage();
      const form = wrapper.find("form");
      const [front, back, image] = wrapper.findAll("input");
      const filter = wrapper.find(".filter");

      setFile(image.element);
      await front.setValue(expectedCall.front);
      await back.setValue(expectedCall.back);
      await filter.setValue(expectedCall.language);
      await image.trigger("change");
      await form.trigger("submit");

      expect(createFlashcard).toHaveBeenCalledWith({
        ...expectedCall,
        image: fileValue,
      });
    });
  });
});
