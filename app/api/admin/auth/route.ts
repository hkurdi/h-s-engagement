import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }))
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Admin password not configured." }, { status: 500 })
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set("admin-auth", "verified", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  })
  return response
}
