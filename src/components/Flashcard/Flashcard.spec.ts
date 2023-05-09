import { mount } from "@vue/test-utils";
import { mockFlashcards } from "@/mocks/data";
import Flashcard from "./Flashcard.vue";
import FlashcardDelete from "../icons/FlashcardDelete.vue";
import FlashcardModify from "../icons/FlashcardModify.vue";
import { createTestingPinia } from "@pinia/testing";
import router from "@/router";

describe("Flashcard component", () => {
  const mountFlashcard = () =>
    mount(Flashcard, {
      global: {
        plugins: [createTestingPinia(), router],
      },
      props: {
        flashcard: mockFlashcards[0],
      },
    });

  it("should render language text 'English'", () => {
    const wrapper = mountFlashcard();
    const languageText = mockFlashcards[0].language;

    const language = wrapper.find(".card__language");

    expect(language.text()).toBe(languageText);
  });

  it("should render text 'Due date: 1/6/2023'", () => {
    const wrapper = mountFlashcard();
    const dueDateText = "Due date: 1/6/2023";

    const dueDate = wrapper.find(".card__due-date");

    expect(dueDate.text()).toBe(dueDateText);
  });

  it("should render front text 'Hello'", () => {
    const wrapper = mountFlashcard();
    const frontText = mockFlashcards[0].front;

    const front = wrapper.find(".card__front p");

    expect(front.text()).toBe(frontText);
  });

  it("should render back text 'Bonjour'", () => {
    const wrapper = mountFlashcard();
    const backText = mockFlashcards[0].back;

    const back = wrapper.find(".card__back p");

    expect(back.text()).toBe(backText);
  });

  it("should render FlashcardDelete and FlashcardModify icons components", () => {
    const wrapper = mountFlashcard();

    expect(wrapper.findComponent(FlashcardDelete).exists()).toBe(true);
    expect(wrapper.findComponent(FlashcardModify).exists()).toBe(true);
  });

  it("should toggle class card__flipped when it is flipped", async () => {
    const wrapper = mountFlashcard();
    const cardInner = wrapper.find(".card__inner");

    expect(cardInner.classes()).not.toContain("card__inner--flipped");

    await wrapper.find("article").trigger("click");
    await wrapper.vm.$nextTick();

    expect(cardInner.classes()).toContain("card__inner--flipped");
  });
});
