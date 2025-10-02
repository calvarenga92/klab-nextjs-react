
import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border shadow-sm p-4 bg-white">{children}</div>
  );
}
