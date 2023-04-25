import type { User, UserState } from "@/types";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const userInitialState: UserState = {
  id: "",
  isLogged: false,
  token: "",
  username: "",
};

const useUserStore = defineStore("user", () => {
  const user = reactive<UserState>({ ...userInitialState });

  function $reset() {
    Object.assign(user, userInitialState);
  }

  function loginUser(userPayload: User) {
    Object.assign<UserState, UserState>(user, {
      ...userPayload,
      isLogged: true,
    });
  }

  return { user, $reset, loginUser };
});

export default useUserStore;
