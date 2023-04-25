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
