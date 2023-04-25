import decodeToken from "jwt-decode";
import { createPinia, setActivePinia } from "pinia";
import { describe, it, vi } from "vitest";
import userServices from "./userServices";
import useUserStore from "@/store/user/userStore";
import { mockUser } from "@/mocks/data";

vi.mock("jwt-decode", () => ({
  default: vi.fn(),
}));

describe("loginUser service function", () => {
  setActivePinia(createPinia());

  const userStore = useUserStore();

  it("should update user state and set isLogged to true, when called with correct username and password", async ({
    expect,
  }) => {
    vi.mocked(decodeToken).mockReturnValue(mockTokenPayload);

    await userServices().loginUser({
      username: mockTokenPayload.username,
      password: "user1",
    });

    expect(userStore.user).toStrictEqual(mockUser);
  });
});
