import { describe, it, expect } from "vitest";
import { formatCurrency, formatNumber, formatPercent, truncate, slugify } from "@/lib/utils/format";

describe("format utilities", () => {
  describe("formatCurrency", () => {
    it("formats USD with no decimals", () => {
      expect(formatCurrency(1234)).toBe("$1,234");
    });

    it("handles zero", () => {
      expect(formatCurrency(0)).toBe("$0");
    });
  });

  describe("formatNumber", () => {
    it("formats with commas", () => {
      expect(formatNumber(1234567)).toBe("1,234,567");
    });
  });

  describe("formatPercent", () => {
    it("formats as percentage with sign", () => {
      expect(formatPercent(8.5)).toBe("+8.5%");
    });

    it("formats negative percentage", () => {
      expect(formatPercent(-3)).toBe("-3.0%");
    });
  });

  describe("truncate", () => {
    it("truncates long strings", () => {
      expect(truncate("Hello World", 5)).toBe("Hello...");
    });

    it("does not truncate short strings", () => {
      expect(truncate("Hi", 10)).toBe("Hi");
    });
  });

  describe("slugify", () => {
    it("converts to slug", () => {
      expect(slugify("Hello World")).toBe("hello-world");
    });

    it("removes special characters", () => {
      expect(slugify("Hello! @World#")).toBe("hello-world");
    });
  });
});
