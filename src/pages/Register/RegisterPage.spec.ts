import { mount } from "@vue/test-utils";
import RegisterPage from "./RegisterPage.vue";
import { createTestingPinia } from "@pinia/testing";
import { mockCredentials } from "@/mocks/data";
import router from "@/router";

const registerUser = vi.fn();
vi.mock("@/services/user/userServices", () => ({
  default: () => ({
    registerUser,
  }),
}));

describe("RegisterPage component", () => {
  const mountRegisterPage = () =>
    mount(RegisterPage, {
      global: {
        plugins: [createTestingPinia(), router],
      },
    });

  it("should render a fieldset legend 'Sign up To Continue'", () => {
    const wrapper = mountRegisterPage();
    const fieldsetText = "Sign up To Continue";

    const title = wrapper.find("legend");

    expect(title.text()).toBe(fieldsetText);
  });

  it("should render a button with text 'Sign up'", () => {
    const wrapper = mountRegisterPage();
    const buttonText = "Sign up";

    const button = wrapper.find(".credentials__button");

    expect(button.text()).toBe(buttonText);
  });

  it("should render a text 'Already have an account? Log in!'", () => {
    const wrapper = mountRegisterPage();
    const redirectionText = "Already have an account? Log in!";

    const redirection = wrapper.find(".credentials-page__redirection");

    expect(redirection.text()).toBe(redirectionText);
  });

  it("should call registerUser with 'AlexanderTheWise' and 'wiseuser' when setting input values to those and submitting form", async () => {
    const wrapper = mountRegisterPage();

    const form = wrapper.find("form");
    const [username, password] = form.findAll("input");

    await username.setValue(mockCredentials.username);
    await password.setValue(mockCredentials.password);
    await form.trigger("submit");

    expect(registerUser).toHaveBeenCalledWith(mockCredentials);
  });
});
