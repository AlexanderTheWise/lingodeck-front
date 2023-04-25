import { rest } from "msw";
import { mockUser } from "./data";

const lingodeckBack: string = import.meta.env.VITE_LINGODECK_BACK;

const handlers = [
  rest.post(`${lingodeckBack}/user/login`, async (req, res, ctx) => {
    return res(ctx.json({ token: mockUser.token }));
  }),
];

export default handlers;
