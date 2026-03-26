import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names and prefers later Tailwind classes", () => {
    const result = cn("p-2", "p-4", "text-center", "text-left");

    expect(result).toContain("p-4");
    expect(result).not.toContain("p-2");
    expect(result).toContain("text-left");
    expect(result).not.toContain("text-center");
  });
});
