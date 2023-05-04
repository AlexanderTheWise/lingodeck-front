import { mount } from "@vue/test-utils";
import LoginPage from "./LoginPage.vue";
import { createTestingPinia } from "@pinia/testing";
import Lottie from "lottie-web";
import type { Mock } from "vitest";
import { mockCredentials } from "@/mocks/data";
import router from "@/router";

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
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
          router,
        ],
      },
    });

  const playSegments = vi.fn();
  (vi.spyOn(Lottie, "loadAnimation") as Mock).mockReturnValue({
    playSegments,
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

  it("should render a fieldset legend 'Log in To Continue'", () => {
    const wrapper = mountLoginpage();
    const fieldsetText = "Log in To Continue";

    const title = wrapper.find("legend");

    expect(title.text()).toBe(fieldsetText);
  });

  it("should render a button with text 'Log in'", () => {
    const wrapper = mountLoginpage();
    const buttonText = "Log in";

    const button = wrapper.find(".credentials__button");

    expect(button.text()).toBe(buttonText);
  });

  it("should render a text 'Doesn't have an account? Sign up!'", () => {
    const wrapper = mountLoginpage();
    const redirectionText = "Doesn't have an account? Sign up!";

    const redirection = wrapper.find(".credentials-page__redirection");

    expect(redirection.text()).toBe(redirectionText);
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
