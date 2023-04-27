// USER
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

// UI

export interface ModalPayload {
  title: string;
  message: string;
  isError: boolean;
}
export interface Modal extends ModalPayload {
  isOpened: boolean;
}

export interface UiState {
  openEyes: boolean;
  isLoading: boolean;
  modal: Modal;
}
