import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET() {
  const cookieStore = await cookies()
  if (cookieStore.get("admin-auth")?.value !== "verified") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("rsvps")
    .select("id, full_name, phone_number, guest_count, additional_guest_names, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: "Could not fetch RSVPs." }, { status: 500 })
  }

  const totalGuests = data.reduce((sum, row) => sum + row.guest_count, 0)

  return NextResponse.json({
    total_rsvps: data.length,
    total_guests: totalGuests,
    rsvps: data,
  })
}
