import type {
  Flashcard,
  Flashcards,
  LoginTokenPayload,
  Modal,
  ModalPayload,
  NewOrModifiedCard,
  UserCredentials,
  UserState,
} from "@/types";

export const mockUser: UserState = {
  username: "AlexanderTheWise",
  id: "64480e63025d69eb9df2b351",
  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
  isLogged: true,
};
export const mockCredentials: UserCredentials = {
  username: mockUser.username,
  password: "wiseuser",
};
export const mockTokenPayload: LoginTokenPayload = {
  username: mockUser.username,
  id: mockUser.id,
};

export const modalPayload: ModalPayload = {
  title: "Error!",
  message: "There was an error loading the flashcards. Refresh page",
  isError: true,
};

export const openedModal: Modal = {
  ...modalPayload,
  isOpened: true,
};

export const mockFlashcards: Flashcards = [
  {
    id: "1",
    front: "Hello",
    back: "Bonjour",
    imageInfo: {
      fileName: "hello.jpg",
      imageBackup: "https://via.placeholder.com/150",
    },
    language: "English",
    dueDate: "2023-06-01T00:00:00.000Z",
  },
  {
    id: "2",
    front: "Bon appétit",
    back: "Enjoy your meal",
    imageInfo: {
      fileName: "bon-appetit.jpg",
      imageBackup: "https://via.placeholder.com/150",
    },
    language: "French",
    dueDate: "2023-05-05T00:00:00.000Z",
  },
  {
    id: "3",
    front: "Thank you",
    back: "Gracias",
    imageInfo: {
      fileName: "thank-you.jpg",
      imageBackup: "https://via.placeholder.com/150",
    },
    language: "English",
    dueDate: "2023-05-15T00:00:00.000Z",
  },
];

export const newFlashcardInfo: Omit<Flashcard, "id"> = {
  front: "How are you?",
  back: "Comment allez-vous?",
  imageInfo: {
    fileName: "how-are-you.jpg",
    imageBackup: "https://via.placeholder.com/150",
  },
  language: "English",
  dueDate: "2023-05-20T00:00:00.000Z",
};

export const fileValue = {
  filename: "dog.jpg",
};

export const expectedCall: Partial<NewOrModifiedCard> = {
  front: "dog",
  back: "perro",
  language: "English",
};
