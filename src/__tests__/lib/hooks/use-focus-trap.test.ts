import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFocusTrap } from "@/lib/hooks/use-focus-trap";

describe("useFocusTrap", () => {
  it("returns a ref object", () => {
    const { result } = renderHook(() => useFocusTrap(false));
    expect(result.current).toHaveProperty("current");
    expect(result.current.current).toBeNull();
  });

  it("does not focus when inactive", () => {
    const focusSpy = vi.spyOn(HTMLElement.prototype, "focus");
    renderHook(() => useFocusTrap(false));
    expect(focusSpy).not.toHaveBeenCalled();
    focusSpy.mockRestore();
  });
});
