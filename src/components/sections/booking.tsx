"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { MapPin, Clock, Mail, Check } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookingSchema, type BookingValues } from "@/lib/schemas";
import { treatmentOptions } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const facts = [
  { icon: MapPin, label: "Studio", value: "24 Passeig de Gràcia, Barcelona" },
  { icon: Clock, label: "Hours", value: "Mon–Fri · 8.30–18.00" },
  { icon: Mail, label: "Direct", value: siteConfig.email },
];

export function Booking() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  const onSubmit = async (values: BookingValues) => {
    // Simulate a network request to a booking endpoint.
    await new Promise((r) => setTimeout(r, 900));
    toast.success("Consultation requested", {
      description: `Thank you, ${values.name.split(" ")[0]}. We'll reply within one working day.`,
      icon: <Check className="size-4" />,
    });
    reset();
  };

  return (
    <section id="booking" aria-label="Book a consultation" className="bg-hero-copper grain relative isolate text-ivory">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-36">
        {/* Lead */}
        <div className="flex flex-col">
          <Reveal as="span" className="text-sm font-medium uppercase tracking-[0.18em] text-gold">
            (08) — Begin
          </Reveal>
          <Reveal
            as="div"
            delay={1}
            className="mt-5 font-display text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[1.02] tracking-tight"
          >
            Let&apos;s design your{" "}
            <span className="text-copper-bright italic">best smile.</span>
          </Reveal>
          <Reveal as="p" delay={2} className="mt-6 max-w-md text-cream/70">
            A first consultation is unhurried and obligation-free — 45 minutes, a 3D scan,
            and a clear plan you can take home.
          </Reveal>

          <ul className="mt-10 flex flex-col gap-5">
            {facts.map((f) => (
              <Reveal as="li" key={f.label} className="flex items-start gap-4">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5">
                  <f.icon className="size-4 text-gold" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.14em] text-cream/50">{f.label}</p>
                  <p className="text-ivory">{f.value}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Form */}
        <Reveal as="div" delay={1}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-8"
          >
            <Field id="name" label="Full name" error={errors.name?.message}>
              <Input
                id="name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                className="h-12 border-white/15 bg-white/5 text-ivory placeholder:text-cream/30"
                placeholder="Jane Marlowe"
                {...register("name")}
              />
            </Field>

            <Field id="email" label="Email" error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                className="h-12 border-white/15 bg-white/5 text-ivory placeholder:text-cream/30"
                placeholder="jane@email.com"
                {...register("email")}
              />
            </Field>

            <Field id="phone" label="Phone (optional)" error={errors.phone?.message}>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                className="h-12 border-white/15 bg-white/5 text-ivory placeholder:text-cream/30"
                placeholder="+34 600 000 000"
                {...register("phone")}
              />
            </Field>

            <Field id="treatment" label="Interested in" error={errors.treatment?.message}>
              <Controller
                control={control}
                name="treatment"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="treatment"
                      aria-invalid={!!errors.treatment}
                      className="h-12 w-full border-white/15 bg-white/5 text-ivory data-[placeholder]:text-cream/40"
                    >
                      <SelectValue placeholder="Choose a treatment" />
                    </SelectTrigger>
                    <SelectContent>
                      {treatmentOptions.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-12 w-full rounded-full bg-copper text-base font-medium text-primary-foreground transition-colors hover:bg-copper-bright disabled:opacity-70"
            >
              {isSubmitting ? "Sending…" : "Request consultation"}
            </Button>
            <p className="text-center text-xs text-cream/45">
              We reply within one working day. No call centres, ever.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm text-cream/70">
        {label}
      </Label>
      {children}
      {error && (
        <p role="alert" className="text-sm text-[#ff9b7a]">
          {error}
        </p>
      )}
    </div>
  );
}
