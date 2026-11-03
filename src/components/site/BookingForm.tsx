import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle, Mail } from "lucide-react";
import { clinic, waLink } from "@/config/clinic";
import { services, doctors } from "@/data/content";
import { luxButton } from "./ui";
import { cn } from "@/lib/utils";

type Fields = { name: string; phone: string; email: string; service: string; doctor: string; day: string; time: string; message: string };

export function validateBooking(f: Pick<Fields, "name" | "phone" | "email">) {
  const e: Record<string, string> = {};
  if (f.name.trim().length < 2) e["name"] = "Please enter your full name.";
  if (!/^\+?[\d\s()-]{7,}$/.test(f.phone.trim())) e["phone"] = "Please enter a valid phone number.";
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e["email"] = "Please enter a valid email.";
  return e;
}

export function buildSummary(f: Fields) {
  return [
    "Appointment request, Pretty Smile Dental Clinic",
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    f.email && `Email: ${f.email}`,
    f.service && `Service: ${f.service}`,
    f.doctor && `Dentist: ${f.doctor}`,
    (f.day || f.time) && `Preferred: ${f.day} ${f.time}`.trim(),
    f.message && `Message: ${f.message}`,
  ].filter(Boolean).join("\n");
}

const inputCls = "h-14 w-full rounded-2xl border border-line bg-paper px-4 text-base text-ink outline-none transition focus:border-gold focus:shadow-[0_2px_0_0_var(--gold)]";

export function BookingForm({ defaultService = "", defaultDoctor = "", compact }: { defaultService?: string; defaultDoctor?: string; compact?: boolean }) {
  const [f, setF] = useState<Fields>({ name: "", phone: "", email: "", service: defaultService, doctor: defaultDoctor, day: "", time: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  if (done) {
    const summary = buildSummary(f);
    return (
      <div className="py-6 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink">
          <Check className="h-8 w-8" strokeWidth={1.5} />
        </motion.div>
        <h3 className="h3-lux">Your request is ready.</h3>
        <p className="mt-2 text-muted-foreground">Tap a button to send it to the clinic.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a className={luxButton()} href={waLink(summary)} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" />Send via WhatsApp</a>
          <a className={luxButton({ variant: "outline" })} href={`mailto:${clinic.email}?subject=${encodeURIComponent("Appointment request")}&body=${encodeURIComponent(summary)}`}><Mail className="h-4 w-4" />Send via email</a>
        </div>
        <button type="button" onClick={() => setDone(false)} className="link-grow mt-5 text-sm text-muted-foreground">Edit details</button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const errs = validateBooking(f);
        setErrors(errs);
        if (!Object.keys(errs).length) setDone(true);
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      <Field label="Full name *" error={errors["name"]}><input className={inputCls} value={f.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors["name"]} /></Field>
      <Field label="Phone *" error={errors["phone"]}><input className={inputCls} value={f.phone} onChange={set("phone")} type="tel" autoComplete="tel" aria-invalid={!!errors["phone"]} /></Field>
      {!compact && <Field label="Email" error={errors["email"]}><input className={inputCls} value={f.email} onChange={set("email")} type="email" autoComplete="email" /></Field>}
      <Field label="Service" className={compact ? "" : ""}>
        <select className={inputCls} value={f.service} onChange={set("service")}>
          <option value="">General consultation</option>
          {services.map((s) => <option key={s.slug}>{s.title}</option>)}
        </select>
      </Field>
      {!compact && (
        <>
          <Field label="Dentist">
            <select className={inputCls} value={f.doctor} onChange={set("doctor")}>
              <option value="">No preference</option>
              {doctors.map((d) => <option key={d.slug}>{d.name}</option>)}
            </select>
          </Field>
          <Field label="Preferred day"><input className={inputCls} value={f.day} onChange={set("day")} type="date" /></Field>
          <Field label="Preferred time">
            <select className={inputCls} value={f.time} onChange={set("time")}>
              <option value="">Any time</option><option>Morning</option><option>Afternoon</option><option>Evening</option>
            </select>
          </Field>
          <Field label="Message" className="sm:col-span-2"><textarea className={cn(inputCls, "h-28 py-3")} value={f.message} onChange={set("message")} /></Field>
        </>
      )}
      <div className="sm:col-span-2">
        <button type="submit" className={cn(luxButton(), "w-full")}>Request an appointment</button>
      </div>
    </form>
  );
}

function Field({ label, error, children, className }: { label: string; error?: string | undefined; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block text-sm font-medium text-ink", className)}>
      <span className="mb-2 block">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-destructive">{error}</span>}
    </label>
  );
}
