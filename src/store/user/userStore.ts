import type { User, UserState } from "@/types";
import { defineStore } from "pinia";
import { reactive } from "vue";
import patchState from "../patchState";

export const userInitialState: UserState = {
  id: "",
  isLogged: false,
  token: "",
  username: "",
};

const useUserStore = defineStore("user", () => {
  const user = reactive<UserState>({ ...userInitialState });

  function $reset() {
    patchState(user, { ...userInitialState });
  }

  function loginUser(userPayload: User) {
    patchState(user, {
      ...userPayload,
      isLogged: true,
    });
  }

  return { user, $reset, loginUser };
});

export default useUserStore;
