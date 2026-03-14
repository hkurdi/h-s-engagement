import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Hamza & Sara | Engagement Celebration",
  description: "Luxury RSVP invitation for Hamza & Sara's engagement celebration.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
