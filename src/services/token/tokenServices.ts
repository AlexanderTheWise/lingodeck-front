import decodeToken from "jwt-decode";
import { useRouter } from "vue-router";
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
    const router = useRouter();

    if (token) {
      const user = decodeToken<LoginTokenPayload>(token);

      userStore.loginUser({ ...user, token });
      router.push({ name: "Flashcards" });
    }
  },
  removeToken() {
    localStorage.removeItem("token");
  },
};

export default tokenServices;
