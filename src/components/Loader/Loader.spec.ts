import { mount } from "@vue/test-utils";
import Loader from "./Loader.vue";
import { createTestingPinia } from "@pinia/testing";

describe("Loader component", () => {
  const mountLoader = (isLoading: boolean) =>
    mount(Loader, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: { ui: { ui: { isLoading } } },
          }),
        ],
      },
    });

  it("should render a loader when isLoading is true", () => {
    const wrapper = mountLoader(true);

    expect(wrapper.find(".loader").exists()).toBe(true);
  });

  it("should render nothing when isLoading is false", () => {
    const wrapper = mountLoader(false);

    expect(wrapper.find(".loader").exists()).toBe(false);
  });
});
