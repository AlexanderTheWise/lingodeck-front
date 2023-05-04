import { rest } from "msw";
import { mockCredentials, mockUser } from "./data";
import { type UserCredentials } from "@/types";

const lingodeckBack: string = import.meta.env.VITE_LINGODECK_BACK;

const handlers = [
  rest.post(`${lingodeckBack}/user/login`, async (req, res, ctx) => {
    const { password, username } = await req.json<UserCredentials>();
    const areCorrect =
      mockCredentials.password === password &&
      mockCredentials.username == username;

    if (areCorrect) return res(ctx.json({ token: mockUser.token }));
    return res(ctx.status(400));
  }),
];

export default handlers;
