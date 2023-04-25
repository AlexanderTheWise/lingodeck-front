import { beforeAll, afterEach, afterAll } from "vitest";
import server from "./setupServer";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
