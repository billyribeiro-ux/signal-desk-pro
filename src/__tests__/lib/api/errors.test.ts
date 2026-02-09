import { describe, it, expect } from "vitest";
import { ApiError, createErrorEnvelope, isApiError, mapFormErrors } from "@/lib/api/errors";

describe("ApiError", () => {
  it("creates an error with message, status, and code", () => {
    const err = new ApiError("Not found", 404, "NOT_FOUND");
    expect(err.message).toBe("Not found");
    expect(err.status).toBe(404);
    expect(err.code).toBe("NOT_FOUND");
    expect(err).toBeInstanceOf(Error);
  });
});

describe("createErrorEnvelope", () => {
  it("creates an error envelope", () => {
    const envelope = createErrorEnvelope("Something went wrong", "ERR_UNKNOWN", 500);
    expect(envelope.error.message).toBe("Something went wrong");
    expect(envelope.error.code).toBe("ERR_UNKNOWN");
    expect(envelope.error.status).toBe(500);
  });
});

describe("isApiError", () => {
  it("returns true for ApiError instances", () => {
    expect(isApiError(new ApiError("fail", 500, "ERR"))).toBe(true);
  });

  it("returns false for regular errors", () => {
    expect(isApiError(new Error("fail"))).toBe(false);
  });
});

describe("mapFormErrors", () => {
  it("maps field errors from details", () => {
    const err = new ApiError("Validation failed", 422, "VALIDATION", {
      name: ["Name is required"],
      email: ["Invalid email"],
    });
    const result = mapFormErrors(err);
    expect(result).toEqual({
      name: { message: "Name is required" },
      email: { message: "Invalid email" },
    });
  });

  it("returns empty object when no details", () => {
    const err = new ApiError("Fail", 500, "ERR");
    expect(mapFormErrors(err)).toEqual({});
  });
});
