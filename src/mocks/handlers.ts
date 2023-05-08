import { rest } from "msw";
import { mockFlashcards, mockUser } from "./data";
import type { FlashcardResponse } from "@/types";

const lingodeckBack: string = import.meta.env.VITE_LINGODECK_BACK;

export const handlers = [
  rest.post(`${lingodeckBack}/user/login`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ token: mockUser.token }))
  ),
  rest.post(`${lingodeckBack}/user/register`, (req, res, ctx) =>
    res(ctx.status(201))
  ),
  rest.get(`${lingodeckBack}/flashcards`, (req, res, ctx) => {
    const limit = +req.url.searchParams.get("limit")!;
    const page = +req.url.searchParams.get("page")!;

    if (page === 3) {
      return res(ctx.status(200), ctx.json({ flashcards: [] }));
    }

    if (page >= 1 && limit >= 1) {
      return res(ctx.status(200), ctx.json({ flashcards: mockFlashcards }));
    }
    return res(ctx.status(400));
  }),
  rest.post(`${lingodeckBack}/flashcards`, async (req, res, ctx) =>
    res(
      ctx.status(201),
      ctx.json<FlashcardResponse>({
        flashcard: mockFlashcards[0],
      })
    )
  ),
  rest.delete(`${lingodeckBack}/flashcards/1`, (req, res, ctx) =>
    res(ctx.status(200))
  ),
  rest.patch(`${lingodeckBack}/flashcards/1`, (req, res, ctx) =>
    res(
      ctx.json<FlashcardResponse>({
        flashcard: { ...mockFlashcards[1], id: mockFlashcards[0].id },
      })
    )
  ),
];

export const errorHandlers = [
  rest.post(`${lingodeckBack}/user/login`, (_req, res, ctx) =>
    res(ctx.status(400))
  ),
  rest.post(`${lingodeckBack}/user/register`, (_req, res, ctx) =>
    res(ctx.status(400))
  ),
  rest.post(`${lingodeckBack}/flashcards`, (_req, res, ctx) =>
    res(ctx.status(400))
  ),
  rest.delete(`${lingodeckBack}/flashcards/1`, (req, res, ctx) =>
    res(ctx.status(400))
  ),
  rest.patch(`${lingodeckBack}/flashcards/1`, (req, res, ctx) =>
    res(ctx.status(400))
  ),
];
