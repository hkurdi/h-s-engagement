"use client"

import { FormEvent, useState } from "react"

type AdminData = {
  total_rsvps: number
  total_guests: number
  rsvps: Array<{
    id: string
    full_name: string
    phone_number: string
    guest_count: number
    additional_guest_names: string[]
    created_at: string
  }>
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AdminData | null>(null)

  const authenticate = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const auth = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (!auth.ok) {
      setLoading(false)
      setError("Authentication failed.")
      return
    }

    const res = await fetch("/api/admin/rsvps")
    const json = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(json.error || "Failed to load dashboard.")
      return
    }

    setData(json)
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-6 py-14 text-[#f6f3ed]">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-serif text-4xl">Hamza Admin</h1>

        {!data ? (
          <form onSubmit={authenticate} className="mt-8 max-w-md rounded-3xl border border-white/15 bg-white/5 p-6">
            <label className="text-sm text-white/70">Admin Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-white/20 bg-black/30 px-4 py-2 outline-none" required />
            {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
            <button disabled={loading} className="mt-4 rounded-full border border-[#c6a664] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#c6a664]">
              {loading ? "Loading..." : "Unlock Dashboard"}
            </button>
          </form>
        ) : (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-white/60">Total RSVPs</p>
                <p className="mt-2 text-4xl font-semibold">{data.total_rsvps}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-white/60">Total Guests</p>
                <p className="mt-2 text-4xl font-semibold text-[#c6a664]">{data.total_guests}</p>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-white/5 text-white/70">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Guests</th>
                    <th className="px-4 py-3">Additional Names</th>
                    <th className="px-4 py-3">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="border-t border-white/10">
                      <td className="px-4 py-3">{rsvp.full_name}</td>
                      <td className="px-4 py-3">{rsvp.phone_number}</td>
                      <td className="px-4 py-3">{rsvp.guest_count}</td>
                      <td className="px-4 py-3">{rsvp.additional_guest_names.join(", ") || "—"}</td>
                      <td className="px-4 py-3">{new Date(rsvp.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
