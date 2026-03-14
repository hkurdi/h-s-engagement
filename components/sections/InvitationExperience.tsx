"use client"

import Image from "next/image"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { RSVPForm } from "@/components/forms/RSVPForm"
import { eventContent } from "@/data/config"

export function InvitationExperience() {
  const [opened, setOpened] = useState(false)

  return (
    <main className="bg-[#0f0f0f] text-[#f6f3ed]">
      <AnimatePresence>
        {!opened && (
          <motion.section
            key="intro"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 grid place-items-center bg-[#0f0f0f] px-6"
          >
            <button
              type="button"
              onClick={() => setOpened(true)}
              className="group relative w-[min(88vw,420px)] rounded-sm border border-[#c6a664]/35 bg-[#f6f3ed] p-4 text-[#0f0f0f] shadow-2xl"
            >
              <p className="text-center font-serif text-xl text-[#c6a664]">{eventContent.opening.bismillah}</p>
              <div className="mt-5 rounded-sm border border-black/10 bg-[#efe9dc] p-8 transition duration-500 group-hover:-translate-y-2">
                <p className="text-center font-serif text-4xl">H & S</p>
                <p className="mt-3 text-center text-xs uppercase tracking-[0.25em] text-black/60">Tap to open invitation</p>
              </div>
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="relative min-h-screen px-6 pb-20 pt-28 text-center">
        <p className="font-serif text-lg text-[#c6a664]/80">{eventContent.opening.bismillah}</p>
        <h1 className="mt-8 font-serif text-5xl sm:text-7xl">{eventContent.couple.names}</h1>
        <p className="mt-5 text-3xl" dir="rtl">{eventContent.couple.arabicType}</p>
        <p className="mt-1 text-sm uppercase tracking-[0.35em] text-[#f6f3ed]/70">{eventContent.couple.englishType}</p>

        <div className="mx-auto mt-10 w-[220px] overflow-hidden rounded-t-[120px] border border-[#c6a664]/35 p-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-[110px]">
            <Image src={eventContent.imagery.hero} alt="Couple portrait placeholder" fill className="object-cover grayscale" priority />
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-[30px] border border-[#c6a664]/20 bg-[#111]/70 p-8 sm:p-12">
          <p className="text-3xl leading-[1.8]" dir="rtl">{eventContent.ayah.arabic}</p>
          <p className="mx-auto mt-5 max-w-2xl text-sm italic text-[#f6f3ed]/75">“{eventContent.ayah.english}”</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#c6a664]">{eventContent.ayah.reference}</p>
        </div>
      </section>

      <section className="grid gap-10 px-6 pb-20 lg:grid-cols-2 lg:px-16">
        <div className="rounded-[30px] border border-[#c6a664]/20 bg-[#111] p-7 sm:p-10">
          <h2 className="font-serif text-3xl">Event Details</h2>
          <div className="mt-6 space-y-4 text-[#f6f3ed]/82">
            <p>{eventContent.event.dateLabel}</p>
            <p>{eventContent.event.timeLabel}</p>
            <p>{eventContent.event.city}</p>
            <p className="font-serif text-xl text-[#c6a664]">{eventContent.event.venue}</p>
            <p>{eventContent.event.address}</p>
            <a href={eventContent.event.mapsUrl} target="_blank" className="inline-block rounded-full border border-[#c6a664] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#c6a664]">Open in Google Maps</a>
          </div>
        </div>
        <div className="overflow-hidden rounded-[30px] border border-[#c6a664]/20">
          <iframe title="Chateau Crystale map" src={eventContent.event.mapsEmbed} className="h-[360px] w-full lg:h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      <section id="rsvp" className="px-6 pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl">{eventContent.rsvp.title}</h2>
          <p className="mt-2 text-[#f6f3ed]/70">{eventContent.rsvp.subtitle}</p>
          <RSVPForm />
        </div>
      </section>
    </main>
  )
}
