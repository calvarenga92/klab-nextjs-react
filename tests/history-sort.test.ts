
import { describe, it, expect } from "vitest";
import type { HistoryRecord } from "../lib/types";

function sortRecords(records: HistoryRecord[], key: keyof HistoryRecord, dir: "asc"|"desc") {
  const arr = [...records];
  const mult = dir === "asc" ? 1 : -1;
  arr.sort((a, b) => {
    let va: any = a[key];
    let vb: any = b[key];
    if (key === "tsISO") return (new Date(va).getTime() - new Date(vb).getTime()) * mult;
    if (va === null) return 1 * mult;
    if (vb === null) return -1 * mult;
    if (typeof va === "string") return va.localeCompare(vb) * mult;
    return (va - vb) * mult;
  });
  return arr;
}

describe("History sorting", () => {
  const data: HistoryRecord[] = [
    { tsISO: "2024-01-01T12:00:00Z", cep: "12345678", cidade: "A", estado: "SP", temperatureC: 25 },
    { tsISO: "2024-01-01T13:00:00Z", cep: "87654321", cidade: "B", estado: "RJ", temperatureC: 22 },
    { tsISO: "2024-01-01T11:00:00Z", cep: "00000000", cidade: "C", estado: "MG", temperatureC: 30 }
  ];
  it("sorts by tsISO desc", () => {
    const s = sortRecords(data, "tsISO", "desc");
    expect(s[0].cep).toBe("87654321");
  });
  it("sorts by cidade asc", () => {
    const s = sortRecords(data, "cidade", "asc");
    expect(s[0].cidade).toBe("A");
  });
  it("sorts by temperatureC asc", () => {
    const s = sortRecords(data, "temperatureC", "asc");
    expect(s[0].temperatureC).toBe(22);
  });
});
