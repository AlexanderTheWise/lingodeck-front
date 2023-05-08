import { mockTokenPayload, mockUser } from "@/mocks/data";
import useUserStore from "@/store/user/userStore";
import decodeToken from "jwt-decode";
import { createPinia, setActivePinia } from "pinia";
import tokenServices from "./tokenServices";

const push = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({ push }),
}));

describe("getToken service function", () => {
  it("should update user state and set isLogged to true, and redirect to Flashcards page when token exists in local storage", ({
    expect,
  }) => {
    setActivePinia(createPinia());
    vi.spyOn(Object.getPrototypeOf(localStorage), "getItem").mockReturnValue(
      mockUser.token
    );
    vi.mocked(decodeToken).mockReturnValue(mockTokenPayload);

    tokenServices.getToken();
    expect(push).toHaveBeenCalledWith({
      name: "Flashcards",
    });
    expect(useUserStore().user).toStrictEqual(mockUser);
  });
});

describe("removeToken service function", () => {
  it("should call removeItem with 'token'", ({ expect }) => {
    const removeItemSpy = vi.spyOn(
      Object.getPrototypeOf(localStorage),
      "removeItem"
    );
    const argument = "token";

    tokenServices.removeToken();

    expect(removeItemSpy).toHaveBeenCalledWith(argument);
  });
});
