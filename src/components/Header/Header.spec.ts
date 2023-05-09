import { mount } from "@vue/test-utils";
import Header from "./Header.vue";
import { createTestingPinia } from "@pinia/testing";
import router from "@/router";
import Logo from "../icons/Logo.vue";
import CardsKanji from "../icons/CardsKanji.vue";
import Logout from "../icons/Logout.vue";
import Plus from "../icons/Plus.vue";

const logoutUser = vi.fn();
vi.mock("@/services/user/userServices", () => ({
  default: () => ({ logoutUser }),
}));

describe("Header component", () => {
  const mountHeader = (isLogged: boolean) =>
    mount(Header, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: { user: { user: { isLogged } } },
          }),
          router,
        ],
      },
    });

  it("should show a Logo component", () => {
    const wrapper = mountHeader(false);

    const logo = wrapper.findComponent(Logo);

    expect(logo.exists()).toBe(true);
  });

  describe("when isLogged is true", () => {
    it("should show two links to Flashcards and Create pages, and one button to Log out, with their respectives icons", () => {
      const wrapper = mountHeader(true);

      const [flashcards, create, logout] = wrapper.findAll("li");

      expect(flashcards.text()).toBe("Flashcards");
      expect(create.text()).toBe("Create card");
      expect(logout.text()).toBe("Log out");

      expect(flashcards.findComponent(CardsKanji).exists()).toBe(true);
      expect(create.findComponent(Plus).exists()).toBe(true);
      expect(logout.findComponent(Logout).exists()).toBe(true);
    });
  });

  describe("when the logout button is clicked", () => {
    it("should call logoutUser service function", async () => {
      const wrapper = mountHeader(true);

      const button = wrapper.find("button");
      await button.trigger("click");

      expect(logoutUser).toHaveBeenCalled();
    });
  });
});
