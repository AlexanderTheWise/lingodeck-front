import decodeToken from "jwt-decode";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import userServices from "./userServices";
import useUserStore from "@/store/user/userStore";
import { mockCredentials, mockTokenPayload, mockUser } from "@/mocks/data";
import useUiStore from "@/store/ui/uiStore";
import modalPayloads from "@/store/ui/modalPayloads";

afterEach(() => {
  vi.clearAllMocks();
});

describe("loginUser service function", () => {
  setActivePinia(createTestingPinia({ stubActions: false }));

  const userStore = useUserStore();
  const uiStore = useUiStore();
  vi.mocked(decodeToken).mockReturnValue(mockTokenPayload);

  describe("when called with correct username and password", () => {
    it("should update user state and set isLogged to true, and set and unset the loader", async ({
      expect,
    }) => {
      await userServices().loginUser({
        username: mockCredentials.username,
        password: mockCredentials.password,
      });

      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(userStore.user).toStrictEqual(mockUser);
      expect(uiStore.unsetLoading).toHaveBeenCalled();
    });
  });

  describe("when called with incorrect username or password", () => {
    it("should set and unset the loader and call openModal with loginError", async () => {
      await userServices().loginUser({
        username: "AlexanderTheSilly",
        password: "user2",
      });

      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.unsetLoading).toHaveBeenCalled();
      expect(uiStore.openModal).toHaveBeenLastCalledWith(
        modalPayloads.errors.loginError
      );
    });
  });
});
