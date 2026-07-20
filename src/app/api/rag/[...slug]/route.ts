import { NextRequest, NextResponse } from "next/server"
import { getToken } from "@auth/core/jwt"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8787"

export async function POST(req: NextRequest) {
  const slug = req.nextUrl.pathname.replace("/api/rag/", "")
  const targetUrl = `${API_URL}/api/rag/${slug}`

  const token = await getToken({ req, secret: process.env.AUTH_SECRET ?? process.env.JWT_SECRET ?? "fallback-secret" })

  const body = await req.json()
  const headers: Record<string, string> = { "Content-Type": "application/json" }

  if (token) {
    const rawJwt = await getToken({ req, secret: process.env.AUTH_SECRET ?? "fallback-secret", raw: true })
    if (rawJwt) {
      headers["Authorization"] = `Bearer ${rawJwt}`
    }
  }

  try {
    const res = await fetch(targetUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: "Backend unreachable" }, { status: 502 })
  }
}
