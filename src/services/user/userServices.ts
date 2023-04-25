import decodeToken from "jwt-decode";
import useUserStore from "@/store/user/userStore";
import {
  type LoginTokenPayload,
  type Token,
  type UserCredentials,
} from "@/types";

interface UserServices {
  loginUser: (userCredentials: UserCredentials) => Promise<void>;
}

const lingodeckBack: string = import.meta.env.VITE_LINGODECK_BACK;

const userServices = (): UserServices => {
  const userStore = useUserStore();

  const loginUser = async (userCredentials: UserCredentials) => {
    const response = await fetch(`${lingodeckBack}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userCredentials),
    });

    const { token } = (await response.json()) as Token;
    const tokenPayload = decodeToken<LoginTokenPayload>(token);
    localStorage.setItem("token", token);

    userStore.loginUser({ ...tokenPayload, token });
  };

  return { loginUser };
};

export default userServices;
