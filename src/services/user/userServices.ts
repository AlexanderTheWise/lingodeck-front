import decodeToken from "jwt-decode";
import useUserStore from "@/store/user/userStore";
import {
  type LoginTokenPayload,
  type Token,
  type UserCredentials,
} from "@/types";
import useUiStore from "@/store/ui/uiStore";
import modalPayloads from "@/store/ui/modalPayloads";

type Service = (userCredentials: UserCredentials) => Promise<void>;
interface UserServices {
  loginUser: Service;
  registerUser: Service;
}

const lingodeckBack: string = import.meta.env.VITE_LINGODECK_BACK;

const userServices = (): UserServices => {
  const userStore = useUserStore();
  const uiStore = useUiStore();

  const loginUser = async (userCredentials: UserCredentials) => {
    try {
      uiStore.setLoading();
      const response = await fetch(`${lingodeckBack}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredentials),
      });

      if (!response.ok) throw new Error();

      const { token } = (await response.json()) as Token;
      const tokenPayload = decodeToken<LoginTokenPayload>(token);
      localStorage.setItem("token", token);

      userStore.loginUser({ ...tokenPayload, token });
      uiStore.unsetLoading();
    } catch (error) {
      uiStore.unsetLoading();
      uiStore.openModal(modalPayloads.errors.loginError);
    }
  };

  const registerUser = async (userCredentials: UserCredentials) => {
    try {
      uiStore.setLoading();
      const response = await fetch(`${lingodeckBack}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredentials),
      });

      if (!response.ok) throw new Error();

      uiStore.unsetLoading();
      uiStore.openModal(modalPayloads.confirm.registerConfirm);
    } catch (error) {
      uiStore.unsetLoading();

      uiStore.openModal(modalPayloads.errors.registerError);
    }
  };
  return { loginUser, registerUser };
};

export default userServices;
