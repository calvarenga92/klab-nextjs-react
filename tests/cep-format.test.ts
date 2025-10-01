
import { describe, it, expect } from "vitest";
import { formatCEP, unmaskCEP } from "../lib/format";

describe("CEP formatting", () => {
  it("formats progressively", () => {
    expect(formatCEP("1")).toBe("1");
    expect(formatCEP("123")).toBe("12.3");
    expect(formatCEP("12345")).toBe("12.345");
    expect(formatCEP("12345678")).toBe("12.345-678");
  });
  it("unmasks", () => {
    expect(unmaskCEP("12.345-678")).toBe("12345678");
  });
});
