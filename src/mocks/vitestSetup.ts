import "vitest-canvas-mock";
import server from "./setupServer";

vi.mock("jwt-decode", () => ({
  default: vi.fn(),
}));

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
