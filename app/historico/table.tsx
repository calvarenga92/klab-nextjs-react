
"use client";
import { useMemo, useState } from "react";
import type { HistoryRecord } from "@/lib/types";
import DateCell from "../components/DateCell";

type Props = { initial: HistoryRecord[] };
type SortKey = keyof Pick<HistoryRecord, "tsISO" | "cep" | "cidade" | "estado" | "temperatureC">;
type SortDir = "asc" | "desc";

export default function ClientTable({ initial }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("tsISO");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const data = useMemo(() => {
    const arr = [...initial];
    arr.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      let va: any = a[sortKey];
      let vb: any = b[sortKey];
      if (sortKey === "tsISO") return (new Date(va).getTime() - new Date(vb).getTime()) * dir;
      if (va === null) return 1 * dir;
      if (vb === null) return -1 * dir;
      if (typeof va === "string") return va.localeCompare(vb) * dir;
      return (va - vb) * dir;
    });
    return arr;
  }, [initial, sortKey, sortDir]);

  function onSort(k: SortKey) { if (k === sortKey) setSortDir(d => d === "asc" ? "desc" : "asc"); else { setSortKey(k); setSortDir("asc"); } }
  const Th = ({k, label}:{k: SortKey, label: string}) => (
    <th className="cursor-pointer text-left px-3 py-2" onClick={() => onSort(k)}>
      <span className="underline">{label}</span>{sortKey === k ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <Th k="tsISO" label="Hora da Consulta" />
            <Th k="cep" label="CEP" />
            <Th k="cidade" label="Cidade" />
            <Th k="estado" label="Estado" />
            <Th k="temperatureC" label="Temperatura (°C)" />
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i} className="odd:bg-white even:bg-gray-50">
              <td className="px-3 py-2"><DateCell iso={r.tsISO} /></td>
              <td className="px-3 py-2">{r.cep}</td>
              <td className="px-3 py-2">{r.cidade}</td>
              <td className="px-3 py-2">{r.estado}</td>
              <td className="px-3 py-2">{r.temperatureC ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
