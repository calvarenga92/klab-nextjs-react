
import { cookies } from "next/headers";
import { HistoryRecord } from "./types";

const COOKIE_NAME = "klab_history";

export function getHistory(): HistoryRecord[] {
  const c = cookies().get(COOKIE_NAME)?.value;
  if (!c) return [];
  try { const arr = JSON.parse(c); return Array.isArray(arr) ? arr : []; } catch { return []; }
}
export function setHistory(records: HistoryRecord[]) {
  cookies().set({ name: COOKIE_NAME, value: JSON.stringify(records), httpOnly: false, path: "/", sameSite: "lax" });
}
export function addHistory(rec: HistoryRecord) {
  const list = getHistory();
  list.unshift(rec);
  setHistory(list);
  return list;
}
