import { flushPromises, mount } from "@vue/test-utils";
import Counter from "./Counter.vue";
import { defineComponent } from "vue";
import { createTestingPinia } from "@pinia/testing";
import Cards from "../icons/Cards.vue";

describe("Counter component", () => {
  const TestComponent = defineComponent({
    template: "<Suspense><Counter/></Suspense>",
    components: { Counter },
  });

  it("should render text 'Due to review: 3' and Cards component icon", async () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    });

    await flushPromises();

    expect(wrapper.text()).toBe("Due to review: 3");
    expect(wrapper.findComponent(Cards).exists()).toBe(true);
  });
});
