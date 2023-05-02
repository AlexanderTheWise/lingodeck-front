import { type UserState, type User } from "@/types";
import { setActivePinia, createPinia } from "pinia";
import useUserStore, { userInitialState } from "./userStore";

describe("A userStore", () => {
  setActivePinia(createPinia());

  const user: User = {
    id: "6446e979d78e19e8f9a0f3c6",
    token: "N6w1CVsWh4KpUCXO",
    username: "AlexanderTheWise",
  };

  const newUserState: UserState = {
    ...user,
    isLogged: true,
  };

  const userStore = useUserStore();

  it("should update user token, id, username and set login status to true, when calling loginUser with an user", () => {
    expect(userStore.user).toStrictEqual(userInitialState);

    userStore.loginUser(user);

    expect(userStore.user).toStrictEqual(newUserState);
  });

  it("should reset user to initial state when calling $reset", () => {
    expect(userStore.user).toStrictEqual(newUserState);

    userStore.$reset();

    expect(userStore.user).toStrictEqual(userInitialState);
  });
});
