
"use client";
import { useState } from "react";
import { formatCEP, unmaskCEP } from "@/lib/format";
import type { HistoryRecord } from "@/lib/types";

type CepResult = { cep: string; localidade: string; uf: string; logradouro?: string; bairro?: string; ddd?: string; erro?: boolean };
type WeatherResult = { temperatureC: number; weatherText: string };

export default function HomePage() {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{cep: CepResult, weather?: WeatherResult} | null>(null);
  console.log('HomePage: ', error);
  const onChange = (v: string) => setCep(formatCEP(v));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const raw = unmaskCEP(cep);
      const cepRes = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
      const cepJson = await cepRes.json();
      if (!cepRes.ok || cepJson?.erro) throw new Error(cepJson?.error || "CEP não encontrado");
      let weather: WeatherResult | undefined;
      try {
        const wRes = await fetch(`/api/weather?city=${encodeURIComponent(cepJson.localidade)}&uf=${cepJson.uf}`);
        const wJson = await wRes.json();
        if (wRes.ok) weather = wJson;
      } catch {}
      setResult({ cep: cepJson, weather });
      const rec: HistoryRecord = {
        tsISO: new Date().toISOString(),
        cep: cepJson.cep,
        cidade: cepJson.localidade,
        estado: cepJson.uf,
        temperatureC: weather ? weather.temperatureC : null
      };
      setError(null);
      await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(rec) });
    } catch (err: any) {
      console.log('eeee: ', error);
      setError(err.message || "Erro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border p-4">
        <h1 className="text-2xl font-semibold mb-2">KLAB-0003 Histórico</h1>
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            className="border rounded-xl px-4 py-3 flex-1 outline-none focus:ring-2"
            placeholder="12.345-678"
            value={cep}
            onChange={(e) => onChange(e.target.value)}
            inputMode="numeric"
            maxLength={10}
          />
          <button
            className="rounded-xl px-5 py-3 bg-black text-white disabled:opacity-50"
            disabled={loading || unmaskCEP(cep).length !== 8}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>
        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
      </div>

      {result && (
        <div className="rounded-2xl border p-4">
          <h2 className="text-xl font-semibold mb-2">Resultado</h2>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <div><span className="text-gray-500">CEP:</span> {result.cep.cep}</div>
            <div><span className="text-gray-500">Cidade:</span> {result.cep.localidade}</div>
            <div><span className="text-gray-500">Estado:</span> {result.cep.uf}</div>
            <div><span className="text-gray-500">Logradouro:</span> {result.cep.logradouro || "-"}</div>
            <div><span className="text-gray-500">Bairro:</span> {result.cep.bairro || "-"}</div>
            <div><span className="text-gray-500">DDD:</span> {result.cep.ddd || "-"}</div>
          </div>
          {result.weather && (
            <div className="mt-4 text-sm ">
              <h3 className="font-semibold">Clima atual</h3>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <div><span className="text-gray-500">Temperatura:</span> {result.weather.temperatureC}°C</div>
                <div><span className="text-gray-500">Condição:</span> {result.weather.weatherText}</div>
              </div>
            </div>
          )}
          <div className="mt-4 text-sm">
            <a className="underline" href="/historico">Ver histórico</a>
          </div>
        </div>
      )}
    </div>
  );
}
