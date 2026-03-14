export type Language = "en" | "ar"

export type RSVPFormData = {
  full_name: string
  phone_number: string
  guest_count: number
  additional_guest_names: string[]
}

export type RSVPRecord = RSVPFormData & {
  id: string
  created_at: string
}

export type AdminDashboardData = {
  rsvps: RSVPRecord[]
  total_rsvps: number
  total_guests: number
}
