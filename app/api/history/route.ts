
import { NextResponse } from "next/server";
import { addHistory } from "@/lib/cookies";

export async function POST(req: Request) {
  const body = await req.json();
  const { tsISO, cep, cidade, estado, temperatureC } = body || {};
  if (!tsISO || !cep || !cidade || !estado) return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  const updated = addHistory({ tsISO, cep, cidade, estado, temperatureC: temperatureC ?? null });
  return NextResponse.json({ ok: true, count: updated.length });
}
