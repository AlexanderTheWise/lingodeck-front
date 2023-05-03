import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { type Mock } from "vitest";
import FormEyes from "./FormEyes.vue";
import Lottie from "lottie-web";
import useUiStore from "@/store/ui/uiStore";

describe("FormEyes component", () => {
  const mountFormEyes = () =>
    mount(FormEyes, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
      attachTo: document.body,
    });

  const playSegments = vi.fn();
  (vi.spyOn(Lottie, "loadAnimation") as Mock).mockReturnValue({
    playSegments,
  });

  it("should show two eyes", ({ expect }) => {
    const wrapper = mountFormEyes();

    const eyes = wrapper.findAll(".eye");

    expect(eyes.length).toBe(2);
    wrapper.unmount();
  });

  it("should play 20 to 1 frames when setting openEyes to false", async ({
    expect,
  }) => {
    const wrapper = mountFormEyes();

    useUiStore().closeEyes();
    await wrapper.vm.$nextTick();

    playSegments.mock.calls.forEach((call) =>
      expect(call[0]).toStrictEqual([20, 1])
    );
    wrapper.unmount();
  });

  it("should play 1 to 20 frames when setting openEyes to true if the eyes are closed", async ({
    expect,
  }) => {
    const wrapper = mountFormEyes();

    useUiStore().closeEyes();
    await wrapper.vm.$nextTick();
    playSegments.mockClear();

    useUiStore().openEyes();
    await wrapper.vm.$nextTick();

    playSegments.mock.calls.forEach((call) =>
      expect(call[0]).toStrictEqual([1, 20])
    );
    wrapper.unmount();
  });
});
