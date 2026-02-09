import { describe, it, expect } from "vitest";
import { z } from "zod";
import { mapZodErrors, flattenZodErrors } from "@/lib/validation/map-zod-errors";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

describe("mapZodErrors", () => {
  it("maps zod errors to field-level messages", () => {
    const result = schema.safeParse({ name: "", email: "bad" });
    if (!result.success) {
      const mapped = mapZodErrors(result.error);
      expect(mapped.name).toBeDefined();
      expect(mapped.email).toBeDefined();
    }
  });
});

describe("flattenZodErrors", () => {
  it("flattens zod errors to string array", () => {
    const result = schema.safeParse({ name: "", email: "bad" });
    if (!result.success) {
      const flat = flattenZodErrors(result.error);
      expect(flat.length).toBeGreaterThan(0);
      expect(typeof flat[0]).toBe("string");
    }
  });
});
