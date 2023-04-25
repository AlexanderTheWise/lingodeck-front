import type { LoginTokenPayload, UserState } from "@/types";

export const mockUser: UserState = {
  username: "AlexanderTheWise",
  id: "64480e63025d69eb9df2b351",
  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
  isLogged: true,
};

export const mockTokenPayload: LoginTokenPayload = {
  username: mockUser.username,
  id: mockUser.id,
};
