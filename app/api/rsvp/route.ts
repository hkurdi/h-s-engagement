import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { rsvpSchema } from "@/lib/validation/rsvp"

export async function POST(req: Request) {
  try {
    const payload = await req.json()
    const parsed = rsvpSchema.safeParse(payload)

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]
      return NextResponse.json({ error: firstIssue.message, issues: parsed.error.issues }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("rsvps")
      .upsert(parsed.data, { onConflict: "phone_number" })
      .select("id, created_at")
      .single()

    if (error) {
      return NextResponse.json({ error: "Failed to save RSVP." }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }
}
