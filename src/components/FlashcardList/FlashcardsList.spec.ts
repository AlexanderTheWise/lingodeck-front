import { mount } from "@vue/test-utils";
import FlashcardsList from "./FlashcardsList.vue";
import { mockFlashcards } from "@/mocks/data";
import FlashcardModify from "../icons/FlashcardModify.vue";
import FlashcardDelete from "../icons/FlashcardDelete.vue";
import { createTestingPinia } from "@pinia/testing";
import router from "@/router";

const flashcards = mockFlashcards.slice(1, 3);

describe("FlashcardsList component", () => {
  const mountFlashcardsList = () =>
    mount(FlashcardsList, {
      global: {
        plugins: [createTestingPinia(), router],
      },
      props: {
        flashcards,
      },
    });

  it("should render four languages tags texts (2) 'French', (2)'English'", () => {
    const wrapper = mountFlashcardsList();

    const languages = wrapper.findAll(".card__language");

    languages
      .slice(0, 2)
      .forEach((language) =>
        expect(language.text()).toBe(flashcards[0].language)
      );

    languages
      .slice(2, 4)
      .forEach((language) =>
        expect(language.text()).toBe(flashcards[1].language)
      );
  });

  it("should render four due dates texts 'Due date: 15/5/2023', 'Due date: 5/5/2023'", () => {
    const wrapper = mountFlashcardsList();
    const dueDatesTexts = ["5/5/2023", "15/5/2023"];

    const dueDates = wrapper.findAll(".card__due-date");

    dueDates
      .slice(0, 2)
      .forEach((dueDate) =>
        expect(dueDate.text()).toBe(`Due date: ${dueDatesTexts[0]}`)
      );

    dueDates
      .slice(2, 4)
      .forEach((dueDate) =>
        expect(dueDate.text()).toBe(`Due date: ${dueDatesTexts[1]}`)
      );
  });

  it("should render two fronts texts 'Bon appétit', 'Thank you'", () => {
    const wrapper = mountFlashcardsList();

    const fronts = wrapper.findAll(".card__front p");

    fronts.forEach((front, index) =>
      expect(front.text()).toBe(flashcards[index].front)
    );
  });

  it("should render four FlashcardModify and four FlashcardDelete icons", () => {
    const wrapper = mountFlashcardsList();
    const commonIconsLength = 4;

    const flashcardsModifies = wrapper.findAllComponents(FlashcardModify);
    const flashcardsDeletes = wrapper.findAllComponents(FlashcardDelete);

    expect(flashcardsModifies.length).toBe(commonIconsLength);
    expect(flashcardsDeletes.length).toBe(commonIconsLength);
  });
});
