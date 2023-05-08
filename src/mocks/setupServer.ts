import { setupServer } from "msw/node";
import { errorHandlers, handlers } from "./handlers";

const server = setupServer(...handlers);

export const setupFaultyServer = () => {
  server.use(...errorHandlers);
};

export default server;
