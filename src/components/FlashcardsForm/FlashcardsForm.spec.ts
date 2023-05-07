import { mount } from "@vue/test-utils";
import FlashcardsForm from "./FlashcardsForm.vue";
import Filter from "../Filter/Filter.vue";
import type { NewOrModifiedCard } from "@/types";

describe("FlashcardsForm component", () => {
  const mountFlashcardsForm = () =>
    mount(FlashcardsForm, {
      slots: {
        default: "Modify",
      },
    });

  it("should render three inputs for the front, back and file, and a Filter component for the language", () => {
    const wrapper = mountFlashcardsForm();

    const [front, back, image] = wrapper.findAll("input");
    const filter = wrapper.findComponent(Filter);

    expect(front.element.placeholder).toBe("Add a word");
    expect(back.element.placeholder).toBe("Add a translation");
    expect(image.element.type).toBe("file");
    expect(filter.exists()).toBe(true);
  });

  it("should render a button 'Modify' and a link 'Cancel'", () => {
    const wrapper = mountFlashcardsForm();

    const [button, link] = wrapper.findAll(".flashcards-form__action");

    expect(button.text()).toBe("Modify");
    expect(link.text()).toBe("Cancel");
  });

  describe("when the front and back inputs receives 'hello', 'hola', 'English' and a file with name 'greeting.jpg'", () => {
    it("should emit submit with that info and enable the button", async () => {
      const wrapper = mountFlashcardsForm();
      const form = wrapper.find("form");
      const button = wrapper.find("button");
      const [front, back, image] = wrapper.findAll("input");
      const filter = wrapper.find(".filter");
      Object.defineProperty(image.element, "files", {
        value: [{ filename: "greeting.jpg" }],
      });
      const expectedCall: Partial<NewOrModifiedCard> = {
        front: "hello",
        back: "hola",
        language: "English",
      };

      expect(button.element.disabled).toBe(true);

      await front.setValue("hello");
      await back.setValue("hola");
      await filter.setValue("English");
      await image.trigger("change");

      expect(button.element.disabled).toBe(false);

      await button.trigger("click");
      await form.trigger("submit");

      expect(wrapper.emitted("submit")![0][0]).toStrictEqual({
        ...expectedCall,
        image: {
          filename: "greeting.jpg",
        },
      });
    });
  });
});
