import decodeToken from "jwt-decode";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import userServices from "./userServices";
import useUserStore from "@/store/user/userStore";
import { mockCredentials, mockTokenPayload, mockUser } from "@/mocks/data";
import useUiStore from "@/store/ui/uiStore";
import modalPayloads from "@/store/ui/modalPayloads";
import { setupFaultyServer } from "@/mocks/setupServer";

afterEach(() => {
  vi.clearAllMocks();
});

const push = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({ push }),
}));

setActivePinia(createTestingPinia({ stubActions: false }));
const userStore = useUserStore();
const uiStore = useUiStore();

const { loginUser, registerUser } = userServices();

describe("loginUser service function", () => {
  vi.mocked(decodeToken).mockReturnValue(mockTokenPayload);

  it("should update user state and set isLogged to true, and set and unset the loader", async ({
    expect,
  }) => {
    await loginUser(mockCredentials);

    expect(uiStore.setLoading).toHaveBeenCalled();
    expect(userStore.user).toStrictEqual(mockUser);
    expect(uiStore.unsetLoading).toHaveBeenCalled();
  });

  describe("when the response return an error status", () => {
    it("should set and unset the loader and call openModal with loginError", async () => {
      setupFaultyServer();
      await loginUser(mockCredentials);

      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.unsetLoading).toHaveBeenCalled();
      expect(uiStore.openModal).toHaveBeenLastCalledWith(
        modalPayloads.errors.loginError
      );
    });
  });
});

describe("registerUser service function", () => {
  it("should set and unset loading, call openModal with registerConfirm and redirect user to login page", async () => {
    await registerUser(mockCredentials);

    expect(uiStore.setLoading).toHaveBeenCalled();
    expect(uiStore.unsetLoading).toHaveBeenCalled();
    expect(uiStore.openModal).toHaveBeenCalledWith(
      modalPayloads.confirm.registerConfirm
    );
    expect(push).toHaveBeenCalledWith({ name: "Log in" });
  });

  describe("when the response returns an error status", () => {
    it("should set and unset loading and call openModal with registerError", async () => {
      setupFaultyServer();
      await registerUser(mockCredentials);

      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.unsetLoading).toHaveBeenCalled();
      expect(uiStore.openModal).toHaveBeenCalledWith(
        modalPayloads.errors.registerError
      );
    });
  });
});
