"use client"

import { FormEvent, useMemo, useState } from "react"

type FormState = {
  full_name: string
  phone_number: string
  guest_count: number
  additional_guest_names: string[]
}

const initialState: FormState = {
  full_name: "",
  phone_number: "",
  guest_count: 1,
  additional_guest_names: [],
}

export function RSVPForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const additionalCount = useMemo(() => Math.max(0, form.guest_count - 1), [form.guest_count])

  const updateGuestCount = (value: number) => {
    const guestCount = Number.isFinite(value) && value > 0 ? value : 1
    setForm((prev) => {
      const names = [...prev.additional_guest_names]
      names.length = Math.max(0, guestCount - 1)
      return { ...prev, guest_count: guestCount, additional_guest_names: names.map((n) => n || "") }
    })
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    const payload = {
      ...form,
      additional_guest_names: form.additional_guest_names.map((v) => v.trim()).filter(Boolean),
    }

    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const json = await res.json()
    setSubmitting(false)

    if (!res.ok) {
      setError(json.error || "Unable to submit RSVP.")
      return
    }

    setSuccess(true)
    setForm(initialState)
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-10 w-full max-w-xl space-y-5 rounded-[28px] border border-black/10 bg-[#f7f4ef] p-6 sm:p-9">
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-black/55">Full Name</label>
        <input value={form.full_name} onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))} className="w-full border-b border-black/25 bg-transparent px-0 py-2 text-lg outline-none" required />
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-black/55">Phone Number</label>
        <input value={form.phone_number} onChange={(e) => setForm((p) => ({ ...p, phone_number: e.target.value }))} className="w-full border-b border-black/25 bg-transparent px-0 py-2 text-lg outline-none" required />
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-black/55">Total Number of Guests</label>
        <input type="number" min={1} value={form.guest_count} onChange={(e) => updateGuestCount(Number(e.target.value))} className="w-full border-b border-black/25 bg-transparent px-0 py-2 text-lg outline-none" required />
        <p className="mt-2 text-sm text-black/60">Total includes you. If you are attending with 2 additional guests, enter 3 as the total.</p>
      </div>
      {additionalCount > 0 && (
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-black/55">Names of Additional Guests</p>
          {Array.from({ length: additionalCount }).map((_, i) => (
            <input
              key={i}
              value={form.additional_guest_names[i] || ""}
              onChange={(e) =>
                setForm((prev) => {
                  const names = [...prev.additional_guest_names]
                  names[i] = e.target.value
                  return { ...prev, additional_guest_names: names }
                })
              }
              className="w-full border-b border-black/25 bg-transparent px-0 py-2 text-lg outline-none"
              placeholder={`Guest ${i + 1}`}
              required
            />
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-700">{error}</p>}
      {success && <p className="text-sm text-emerald-700">Thank you for your RSVP. We look forward to celebrating with you.</p>}

      <button disabled={submitting} className="mt-4 w-full rounded-full border border-black bg-black px-5 py-3 text-sm tracking-[0.18em] text-[#f6f3ed] uppercase transition hover:bg-transparent hover:text-black disabled:opacity-60">
        {submitting ? "Sending..." : "Confirm Attendance"}
      </button>
    </form>
  )
}
