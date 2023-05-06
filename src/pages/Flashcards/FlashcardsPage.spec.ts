import { flushPromises, mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import languages from "../../assets/languages.json";
import FlashcardsPage from "./FlashcardsPage.vue";
import Next from "@/components/icons/Next.vue";
import Previous from "@/components/icons/Previous.vue";
import Cards from "@/components/icons/Cards.vue";

describe("FlashcardsPage component", () => {
  const mountFlashcardsPage = () =>
    mount(FlashcardsPage, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    });

  it("should render a filter with a list of languages", () => {
    const wrapper = mountFlashcardsPage();

    const options = wrapper.findAll("option");

    options.forEach((option, index) =>
      expect(option.text()).toBe(languages[index].name)
    );
  });

  it("should render two pagination buttons and they should contain Next and Previous icons components", () => {
    const wrapper = mountFlashcardsPage();

    const next = wrapper.find(".flashcards-page__next");
    const previous = wrapper.find(".flashcards-page__previous");

    expect(next.findComponent(Next).exists()).toBe(true);
    expect(previous.findComponent(Previous).exists()).toBe(true);
  });

  it("should render text 'Due to review: 3' and Cards icon component", async () => {
    const wrapper = mountFlashcardsPage();
    const dueToReviewText = "Due to review: 3";

    await flushPromises();
    const dueToReview = wrapper.find(".flashcards-page__counter");

    expect(dueToReview.text()).toBe(dueToReviewText);
    expect(dueToReview.findComponent(Cards).exists()).toBe(true);
  });

  it("should render three card components", async () => {
    const wrapper = mountFlashcardsPage();

    await flushPromises();
    const flashcards = wrapper.findAll(".card");

    expect(flashcards.length).toBe(3);
  });

  it("when the next button is clicked one time and the language is changed, it should return to page 1", async () => {
    const wrapper = mountFlashcardsPage();
    const next = wrapper.find(".flashcards-page__next");
    const languages = wrapper.find(".flashcards-page__filter");
    const page = wrapper.find(".flashcards-page__pagination");

    await next.trigger("click");

    expect(page.text()).toBe("2");

    await languages.setValue("English");

    expect(page.text()).toBe("1");
  });

  it("should not decrease page num on first page, no matter how many times the previous button is clicked", async () => {
    const wrapper = mountFlashcardsPage();
    const previous = wrapper.find(".flashcards-page__previous");
    const page = wrapper.find(".flashcards-page__pagination");

    await previous.trigger("click");
    await previous.trigger("click");
    await previous.trigger("click");

    expect(page.text()).toBe("1");
  });

  it("should return to old page when the in the new page there's no flashcards, for example, page 3", async () => {
    const wrapper = mountFlashcardsPage();
    const next = wrapper.find(".flashcards-page__next");
    const page = wrapper.find(".flashcards-page__pagination");

    await next.trigger("click");
    await flushPromises();

    expect(page.text()).toBe("2");

    await next.trigger("click");
    await flushPromises();

    expect(page.text()).toBe("2");
  });
});
