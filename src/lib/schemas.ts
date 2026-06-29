import { z } from "zod";
import { treatmentOptions } from "@/lib/content";

export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name")
    .max(80, "That name seems too long"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .max(30, "That number seems too long")
    .optional()
    .or(z.literal("")),
  treatment: z.enum(treatmentOptions, {
    message: "Please choose a treatment",
  }),
});

export type BookingValues = z.infer<typeof bookingSchema>;
