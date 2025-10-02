
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
  let list = getHistory();
  list = list.filter(r => r.cep !== rec.cep);
  list.unshift(rec);
  if (list.length > 10) list = list.slice(0, 10);
  setHistory(list);
  return list;
}
