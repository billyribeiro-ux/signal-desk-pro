import type { ZodError } from "zod";

export function mapZodErrors(error: ZodError): Record<string, string[]> {
  const mapped: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (!mapped[path]) mapped[path] = [];
    mapped[path].push(issue.message);
  }
  return mapped;
}

export function flattenZodErrors(error: ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.join(".");
    return path ? `${path}: ${issue.message}` : issue.message;
  });
}
