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

// FLASHCARDS

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  imageInfo: {
    fileName: string;
    imageBackup: string;
  };
  language: string;
  dueDate: string;
}

export interface NewOrModifiedCard
  extends Omit<Flashcard, "imageInfo" | "id" | "dueDate"> {
  image: File | null;
}

export type Flashcards = Flashcard[];
