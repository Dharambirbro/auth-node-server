export const errors = {
    BAD_REQUEST: { code: 400, message: "Invalid request. Please check your input." },
    UNAUTHORIZED: { code: 401, message: "Authentication required. Please log in." },
    FORBIDDEN: { code: 403, message: "Access denied. You do not have permission to access this resource." },
    NOT_FOUND: { code: 404, message: "The requested resource could not be found." },
    METHOD_NOT_ALLOWED: { code: 405, message: "HTTP method not allowed on this endpoint." },
    CONFLICT: { code: 409, message: "A conflict occurred. The resource already exists." },
    UNPROCESSABLE_ENTITY: { code: 422, message: "Invalid data. Please verify your input and try again." },
    TOO_MANY_REQUESTS: { code: 429, message: "Too many requests. Please try again later." },
    INTERNAL_SERVER_ERROR: { code: 500, message: "An unexpected error occurred. Please try again later." },
    NOT_IMPLEMENTED: { code: 501, message: "This feature is not implemented yet." },
    BAD_GATEWAY: { code: 502, message: "Bad gateway. Please try again later." },
    SERVICE_UNAVAILABLE: { code: 503, message: "The service is currently unavailable. Please try again later." },
    GATEWAY_TIMEOUT: { code: 504, message: "The server did not respond in time. Please try again later." },
  };
  