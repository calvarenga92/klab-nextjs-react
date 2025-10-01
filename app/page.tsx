
"use client";
import { useState } from "react";
import { formatCEP, unmaskCEP, type CepResult } from "@/lib/format";

type WeatherResult = { temperatureC: number; weatherText: string };

export default function HomePage() {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CepResult | null>(null);
  const [weather, setWeather] = useState<WeatherResult | null>(null);

  const onChange = (v: string) => setCep(formatCEP(v));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setData(null);
    setWeather(null);
    try {
      const raw = unmaskCEP(cep);
      const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
      const json = await res.json();
      if (!res.ok || json?.erro) throw new Error(json?.error || "CEP não encontrado");
      setData(json);
      const wRes = await fetch(`/api/weather?city=${encodeURIComponent(json.localidade)}&uf=${json.uf}`);
      const wJson = await wRes.json();
      if (wRes.ok) setWeather(wJson);
    } catch (err: any) {
      setError(err.message || "Erro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border p-4">
        <h1 className="text-2xl font-semibold mb-2">Pesquisar CEP + Clima</h1>
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
      {data && (
        <div className="rounded-2xl border p-4">
          <h2 className="text-xl font-semibold mb-2">Resultado</h2>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <div><span className="text-gray-500">CEP:</span> {data.cep}</div>
            <div><span className="text-gray-500">Cidade:</span> {data.localidade}</div>
            <div><span className="text-gray-500">Estado:</span> {data.uf}</div>
            <div><span className="text-gray-500">Logradouro:</span> {data.logradouro || "-"}</div>
            <div><span className="text-gray-500">Bairro:</span> {data.bairro || "-"}</div>
            <div><span className="text-gray-500">DDD:</span> {data.ddd || "-"}</div>
          </div>
          {weather && (
            <div className="mt-4">
              <h3 className="font-semibold">Clima atual</h3>
              <p>{weather.temperatureC}°C - {weather.weatherText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
