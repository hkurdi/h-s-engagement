import { z } from "zod"

export const rsvpSchema = z
  .object({
    full_name: z.string().trim().min(2, "Please enter your full name"),
    phone_number: z
      .string()
      .trim()
      .min(7, "Please enter a valid phone number")
      .max(30, "Phone number is too long"),
    guest_count: z.coerce.number().int().min(1, "Guest count must be at least 1"),
    additional_guest_names: z.array(z.string().trim().min(1)).default([]),
  })
  .superRefine((value, ctx) => {
    const expected = Math.max(0, value.guest_count - 1)
    if (value.additional_guest_names.length !== expected) {
      ctx.addIssue({
        code: "custom",
        path: ["additional_guest_names"],
        message: `Please provide exactly ${expected} additional guest name${expected === 1 ? "" : "s"}`,
      })
    }
  })

export type RSVPInput = z.infer<typeof rsvpSchema>
