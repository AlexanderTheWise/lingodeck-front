import { mount } from "@vue/test-utils";
import LoginPage from "./LoginPage.vue";
import { createTestingPinia } from "@pinia/testing";
import Lottie from "lottie-web";
import type { Mock } from "vitest";
import { mockCredentials } from "@/mocks/data";

const loginUser = vi.fn();
vi.mock("@/services/user/userServices", () => ({
  default: () => ({
    loginUser,
  }),
}));

describe("LoginPage component", () => {
  const mountLoginpage = () =>
    mount(LoginPage, {
      attachTo: document.body,
      slots: {
        default: "Log in",
      },
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    });

  const playSegments = vi.fn();
  (vi.spyOn(Lottie, "loadAnimation") as Mock).mockReturnValue({
    playSegments,
  });

  it("should show two eyes", () => {
    const wrapper = mountLoginpage();

    const eyes = wrapper.findAll(".eye");

    expect(eyes.length).toBe(2);
    expect(eyes.every((eye) => eye.isVisible())).toBe(true);
    wrapper.unmount();
  });

  it("should play 20 to 1 frame segment when eye toggle button is clicked initially 2 times", async () => {
    const wrapper = mountLoginpage();

    const eyeToggle = wrapper.find(".credentials__eye-toggle");
    await eyeToggle.trigger("click");
    await eyeToggle.trigger("click");
    await wrapper.vm.$nextTick();

    playSegments.mock.calls.forEach((call) =>
      expect(call[0]).toStrictEqual([20, 1])
    );
    wrapper.unmount();
  });

  it("should enable the submit button when we write an alphanumeric and 8-14 characters username and password", async () => {
    const wrapper = mountLoginpage();

    const [username, password] = wrapper.findAll("input");
    const button = wrapper.find<HTMLButtonElement>(".credentials__button");

    expect(button.element.disabled).toBe(true);

    await username.setValue(mockCredentials.username);
    await password.setValue(mockCredentials.password);

    expect(button.element.disabled).toBe(false);
  });

  it("should call loginUser with 'AlexanderTheWise' and 'wiseuser' when setting input values to those and submitting form", async ({
    expect,
  }) => {
    const wrapper = mountLoginpage();

    const form = wrapper.find("form");
    const [username, password] = form.findAll("input");

    await username.setValue(mockCredentials.username);
    await password.setValue(mockCredentials.password);
    await form.trigger("submit");

    expect(loginUser.mock.lastCall[0]).toStrictEqual(mockCredentials);
  });
});
