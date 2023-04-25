import { mockTokenPayload, mockUser } from "@/mocks/data";
import useUserStore from "@/store/user/userStore";
import decodeToken from "jwt-decode";
import { createPinia, setActivePinia } from "pinia";
import { describe, it, vi } from "vitest";
import tokenServices from "./tokenServices";

describe("getToken service function", () => {
  it("should update user state and set isLogged to true, when token exists in local storage", ({
    expect,
  }) => {
    setActivePinia(createPinia());
    vi.spyOn(Object.getPrototypeOf(localStorage), "getItem").mockReturnValue(
      mockUser.token
    );
    vi.mocked(decodeToken).mockReturnValue(mockTokenPayload);

    tokenServices.getToken();

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
