export interface LoginTokenPayload {
  id: string;
  username: string;
}

export interface User extends LoginTokenPayload {
  token: string;
}

export interface UserState extends User {
  isLogged: boolean;
}

export interface UserCredentials extends Pick<LoginTokenPayload, "username"> {
  password: string;
}

export type Token = Pick<User, "token">;
