import decodeToken from "jwt-decode";
import useUserStore from "@/store/user/userStore";
import type { LoginTokenPayload } from "@/types";

interface TokenServices {
  getToken: () => void;
  removeToken: () => void;
}

const tokenServices: TokenServices = {
  getToken() {
    const userStore = useUserStore();
    const token = localStorage.getItem("token");

    if (token) {
      const user = decodeToken<LoginTokenPayload>(token);

      userStore.loginUser({ ...user, token });
    }
  },
  removeToken() {
    localStorage.removeItem("token");
  },
};

export default tokenServices;
