
import { getHistory } from "@/lib/cookies";
import ClientTable from "./table";

export default function Page() {
  const initial = getHistory();
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Histórico</h1>
      <ClientTable initial={initial} />
    </div>
  );
}
