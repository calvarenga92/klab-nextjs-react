
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const uf = searchParams.get("uf");
  if (!city || !uf) return NextResponse.json({ error: "Cidade/UF inválidos" }, { status: 400 });

  const apiKey = process.env.ACCUWEATHER_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "API key não configurada" }, { status: 500 });

  const locUrl = `http://dataservice.accuweather.com/locations/v1/cities/BR/search?apikey=${apiKey}&q=${encodeURIComponent(city + "," + uf)}`;
  const locRes = await fetch(locUrl);
  const locData = await locRes.json();
  if (!Array.isArray(locData) || locData.length === 0) return NextResponse.json({ error: "Local não encontrado" }, { status: 404 });

  const locationKey = locData[0].Key;
  const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=pt-br&details=false`;
  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();
  if (!Array.isArray(weatherData) || weatherData.length === 0) return NextResponse.json({ error: "Clima não encontrado" }, { status: 404 });

  const current = weatherData[0];
  return NextResponse.json({
    temperatureC: current.Temperature.Metric.Value,
    weatherText: current.WeatherText
  });
}
