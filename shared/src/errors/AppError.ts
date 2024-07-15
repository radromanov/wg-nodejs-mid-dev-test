import "dotenv/config";

export class AppError extends Error {
  status: number;
  trace: string | null;

  private constructor(message: string, status: number) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, AppError.prototype);

    this.status = status;
    this.trace =
      process.env.NODE_ENV === "production"
        ? null
        : this.stack || "Unknown stack trace";
  }

  static BadRequest(message = "Bad Request") {
    return new AppError(message, 400);
  }

  static Unauthorized(message = "Unauthorized") {
    return new AppError(message, 401);
  }

  static Forbidden(message = "Forbidden") {
    return new AppError(message, 403);
  }

  static NotFound(message = "Not Found") {
    return new AppError(message, 404);
  }

  static MethodNotAllowed(message = "Method Not Allowed") {
    return new AppError(message, 405);
  }

  static Conflict(message = "Conflict") {
    return new AppError(message, 409);
  }

  static UnprocessableEntity(message = "Unprocessable Entity") {
    return new AppError(message, 422);
  }

  static TooManyRequests(message = "Too Many Requests") {
    return new AppError(message, 429);
  }

  static InternalServerError(message = "Internal Server Error") {
    return new AppError(message, 500);
  }

  static NotImplemented(message = "Not Implemented") {
    return new AppError(message, 501);
  }

  static BadGateway(message = "Bad Gateway") {
    return new AppError(message, 502);
  }

  static ServiceUnavailable(message = "Service Unavailable") {
    return new AppError(message, 503);
  }

  static GatewayTimeout(message = "Gateway Timeout") {
    return new AppError(message, 504);
  }
}
