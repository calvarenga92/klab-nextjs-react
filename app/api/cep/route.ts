
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cep = (searchParams.get("cep") || "").replace(/\D/g, "");
  if (cep.length !== 8) return NextResponse.json({ error: "CEP inválido" }, { status: 400 });
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { cache: "no-store" });
  const data = await res.json();
  return NextResponse.json(data);
}
