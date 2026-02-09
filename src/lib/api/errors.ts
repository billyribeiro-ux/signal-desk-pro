export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
    public details?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ErrorEnvelope {
  error: {
    message: string;
    code: string;
    status: number;
    details?: Record<string, string[]>;
  };
}

export function createErrorEnvelope(
  message: string,
  code: string,
  status: number,
  details?: Record<string, string[]>,
): ErrorEnvelope {
  return {
    error: { message, code, status, details },
  };
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function mapFormErrors(
  error: ApiError,
): Record<string, { message: string }> {
  if (!error.details) return {};
  const mapped: Record<string, { message: string }> = {};
  for (const [field, messages] of Object.entries(error.details)) {
    mapped[field] = { message: messages[0] ?? "Invalid value" };
  }
  return mapped;
}
