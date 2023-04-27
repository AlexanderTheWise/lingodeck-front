import { mount } from "@vue/test-utils";
import { describe, it } from "vitest";
import CredentialsForm from "./CredentialsForm.vue";
import type { UserCredentials } from "@/types";
import { mockUser } from "@/mocks/data";
import EyeOpen from "../icons/EyeOpen.vue";
import EyeClosed from "../icons/EyeClosed.vue";

describe("CredentialsForm component", () => {
  describe("receives slot purpose 'Log in'", () => {
    const credentialsFormMount = () =>
      mount(CredentialsForm, {
        slots: {
          purpose: "Log in",
        },
      });

    const credentials: UserCredentials = {
      username: mockUser.username,
      password: "wiseuser",
    };

    it("renders a title 'Log in To Continue' and submit button 'Log in'", ({
      expect,
    }) => {
      const wrapper = credentialsFormMount();

      const title = wrapper.find("legend");
      const button = wrapper.find(".credentials__button");

      expect(title.text()).toBe("Log in To Continue");
      expect(button.text()).toBe("Log in");
    });

    it("renders two inputs with 'Enter username/password' placeholders", ({
      expect,
    }) => {
      const wrapper = credentialsFormMount();

      const [username, password] = wrapper.findAll("input");

      expect(username.attributes("placeholder")).toBe("Enter username");
      expect(password.attributes("placeholder")).toBe("Enter password");
    });

    it("should unset disabled when setting username and password values with 'AlexanderTheWise' and 'wiseuser'", async ({
      expect,
    }) => {
      const wrapper = credentialsFormMount();

      const [username, password] = wrapper.findAll("input");
      const button = wrapper.find<HTMLButtonElement>(".credentials__button");

      expect(button.element.disabled).toBe(true);

      await username.setValue(credentials.username);
      await password.setValue(credentials.password);

      expect(button.element.disabled).toBe(false);
    });

    it("should show open eye and password text when clicking on eye toggle button", async ({
      expect,
    }) => {
      const wrapper = credentialsFormMount();

      const password = wrapper.findAll("input")[1];
      const button = wrapper.find(".credentials__eye-toggle");
      const getOpenedEye = () => button.findComponent(EyeOpen);
      const getClosedEye = () => button.findComponent(EyeClosed);

      expect(password.attributes("type")).toBe("password");
      expect(getOpenedEye().exists()).toBe(false);
      expect(getClosedEye().exists()).toBe(true);

      await button.trigger("click");

      expect(password.attributes("type")).toBe("text");
      expect(getOpenedEye().exists()).toBe(true);
      expect(getClosedEye().exists()).toBe(false);
    });

    it("should call submit with 'AlexanderTheWise' and 'wiseuser' when setting input values to those and submitting form", async ({
      expect,
    }) => {
      const wrapper = credentialsFormMount();

      const form = wrapper.find("form");
      const [username, password] = form.findAll("input");

      await username.setValue(credentials.username);
      await password.setValue(credentials.password);
      await form.trigger("submit");

      expect(wrapper.emitted("submit")![0][0]).toStrictEqual(credentials);
    });
  });
});
