import decodeToken from "jwt-decode";
import useUserStore from "@/store/user/userStore";
import {
  type LoginTokenPayload,
  type Token,
  type UserCredentials,
} from "@/types";
import useUiStore from "@/store/ui/uiStore";

interface UserServices {
  loginUser: (userCredentials: UserCredentials) => Promise<void>;
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

      const { token } = (await response.json()) as Token;
      const tokenPayload = decodeToken<LoginTokenPayload>(token);
      localStorage.setItem("token", token);

      userStore.loginUser({ ...tokenPayload, token });
      uiStore.unsetLoading();
    } catch (error) {
      uiStore.unsetLoading();
      uiStore.openModal({
        isError: true,
        title: "Couldn't login",
        message: "Please, try again",
      });
    }
  };

  return { loginUser };
};

export default userServices;
