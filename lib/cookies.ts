
import { cookies } from "next/headers";
import { CepResult } from "./format";

const COOKIE_NAME = "klab_history";

export function addToHistory(data: CepResult) {
  const store = cookies().get(COOKIE_NAME)?.value;
  let arr: CepResult[] = [];
  if (store) {
    try { arr = JSON.parse(store); } catch {}
  }
  arr.unshift(data);
  cookies().set({
    name: COOKIE_NAME,
    value: JSON.stringify(arr),
    httpOnly: false,
    path: "/",
  });
}
