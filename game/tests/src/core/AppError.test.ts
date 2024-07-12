import { AppError } from "@core/AppError";

jest.mock("@core/Config", () => {
  return {
    Config: jest.fn().mockImplementation(() => ({
      get: jest.fn().mockReturnValue("development"), // Mock the environment as "development"
    })),
  };
});

describe("AppError", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Static Methods", () => {
    const errorMethods = [
      { method: "BadRequest", status: 400 },
      { method: "Unauthorized", status: 401 },
      { method: "Forbidden", status: 403 },
      { method: "NotFound", status: 404 },
      { method: "MethodNotAllowed", status: 405 },
      { method: "Conflict", status: 409 },
      { method: "UnprocessableEntity", status: 422 },
      { method: "TooManyRequests", status: 429 },
      { method: "InternalServerError", status: 500 },
      { method: "NotImplemented", status: 501 },
      { method: "BadGateway", status: 502 },
      { method: "ServiceUnavailable", status: 503 },
      { method: "GatewayTimeout", status: 504 },
    ] as const;

    errorMethods.forEach(({ method, status }) => {
      it(`should create ${method} instance with default message and status ${status}`, () => {
        const error = AppError[method]();

        expect(error instanceof AppError).toBeTruthy();
        expect(error.message).toBeDefined();
        expect(error.status).toBe(status);
      });

      it(`should create ${method} instance with custom message`, () => {
        const customMessage = "Custom Error Message";
        const error = AppError[method](customMessage);

        expect(error instanceof AppError).toBeTruthy();
        expect(error.message).toBe(customMessage);
        expect(error.status).toBe(status);
      });
    });
  });
});
