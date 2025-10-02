"use client";
import { useMemo, useState } from "react";
import type { HistoryRecord } from "@/lib/types";

type SortKey = keyof Pick<
  HistoryRecord,
  "tsISO" | "cep" | "cidade" | "estado" | "temperatureC"
>;
type SortDir = "asc" | "desc";

export default function ClientTable({ initial }: { initial: HistoryRecord[] }) {
  // sem ordenação inicial: mantém a ordem recebida
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const onSort = (k: SortKey) => {
    if (sortKey === k) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir("asc");
    }
  };

  const data = useMemo(() => {
    const arr = [...initial];
    if (!sortKey) return arr;

    const cmp = (a: HistoryRecord, b: HistoryRecord) => {
      const pick = (r: HistoryRecord) => {
        switch (sortKey) {
          case "tsISO":
            return Date.parse(r.tsISO);
          case "temperatureC":
            return r.temperatureC ?? Number.NEGATIVE_INFINITY;
          case "cep":
            return r.cep;
          case "cidade":
            return r.cidade;
          case "estado":
            return r.estado;
        }
      };
      const av = pick(a);
      const bv = pick(b);
      if (typeof av === "number" && typeof bv === "number") return av - bv;
      return String(av).localeCompare(String(bv), "pt-BR", { sensitivity: "base" });
    };

    arr.sort((a, b) => {
      const res = cmp(a, b);
      return sortDir === "asc" ? res : -res;
    });
    return arr;
  }, [initial, sortKey, sortDir]);

  const Th = ({ label, field }: { label: string; field: SortKey }) => {
    const active = sortKey === field;
    return (
      <th
        data-testid={`th-${field}`}
        className="cursor-pointer text-left px-3 py-2 select-none"
        onClick={() => onSort(field)}
      >
        <span className={active ? "underline" : ""}>
          {label}
          {active ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
        </span>
      </th>
    );
  };

  return (
    <div className="overflow-x-auto rounded-xl border shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <Th field="tsISO" label="Hora da Consulta" />
            <Th field="cep" label="CEP" />
            <Th field="cidade" label="Cidade" />
            <Th field="estado" label="Estado" />
            <Th field="temperatureC" label="Temperatura (°C)" />
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((r, i) => (
            <tr key={`${r.cep}-${r.tsISO}-${i}`} className="hover:bg-gray-50">
              <td className="px-3 py-2">
                {new Date(r.tsISO).toLocaleString("pt-BR")}
              </td>
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
