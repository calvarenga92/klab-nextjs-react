
import { describe, it, expect, vi } from "vitest";

vi.mock("next/headers", () => {
  let store = "";
  return {
    cookies: () => ({
      get: () => store ? { value: store } : undefined,
      set: ({ value }: any) => { store = value; }
    })
  };
});

describe("Cookie addHistory", () => {
  it("adds record to cookie", async () => {
    const { addHistory, getHistory } = await import("../lib/cookies");
    const rec = { tsISO: "2024-01-01T00:00:00Z", cep: "01001000", cidade: "São Paulo", estado: "SP", temperatureC: 25 };
    const updated = addHistory(rec);
    expect(updated.length).toBe(1);
    const hist = getHistory();
    expect(hist[0].cep).toBe("01001000");
  });
});
