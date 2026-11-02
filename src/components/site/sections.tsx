import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, Star, Smile, Clock, MapPin, Mail } from "lucide-react";
import before from "@/assets/teethdirty.png.asset.json";
import after from "@/assets/teethclean.png.asset.json";
import { clinic, waLink } from "@/config/clinic";
import { doctors, pricing, services, stats, testimonials, homeFaqs } from "@/data/content";
import { Accent, Accordion, ArchFrame, Arrow, BeforeAfter, CountUp, EASE, Eyebrow, Marquee, Reveal, SectionHeading, luxButton } from "./ui";
import { BookingForm } from "./BookingForm";
import { cn } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const words = ["Smiles", "designed", "with", "care,", "in", "the", "heart", "of", "Dubai."];
  return (
    <section ref={ref} className="grain relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-40">
      <div className="pointer-events-none absolute -right-40 top-10 h-[560px] w-[560px] rounded-full bg-aqua-soft blur-3xl" />
      <svg className="pointer-events-none absolute left-0 top-1/3 w-full text-gold/50" viewBox="0 0 1440 300" fill="none" aria-hidden><path d="M0 250 C 400 50, 900 350, 1440 80" stroke="currentColor" strokeWidth="1" /></svg>
      <div className="container-lux relative grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow>Dental Care Clinic, Dubai</Eyebrow>
          <h1 className="h1-lux">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span className={cn("inline-block", w === "care," && "font-light italic text-aqua")} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.06 * i }}>{w}&nbsp;</motion.span>
              </span>
            ))}
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-7 max-w-lg text-lg text-muted-foreground">General, cosmetic and restorative dentistry for the whole family, in a calm, comfortable setting.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className={luxButton()}>Book a Consultation<Arrow /></Link>
              <a href={clinic.phoneHref} className={luxButton({ variant: "outline" })}><Phone className="h-4 w-4" strokeWidth={1.5} />Call {clinic.phone}</a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><span className="flex text-gold">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</span><b className="text-ink">{clinic.rating}</b> Google · {clinic.reviews} reviews</span>
              <span className="h-4 w-px bg-line" />
              <span><b className="text-ink">18 years</b> in practice</span>
            </div>
          </Reveal>
        </div>
        <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[440px] lg:col-span-6 lg:max-w-[480px]">
          <motion.div style={{ y }} className="aspect-[4/5]">
            <ArchFrame src={doctors[0].photo} alt="Dr. Adnan Ahmad, Pretty Smile Dental Clinic" position="50% 15%" className="h-full bg-aqua-soft" eager />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="absolute -left-4 top-16 sm:-left-12">
            <div className="glass animate-bob rounded-2xl px-5 py-4 shadow-card">
              <p className="font-display text-2xl text-ink">4.6 <span className="text-gold">★</span></p>
              <p className="text-xs text-muted-foreground">Google rating</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="absolute -right-2 bottom-24 sm:-right-10">
            <div className="glass animate-bob rounded-2xl px-5 py-4 shadow-card [animation-delay:-3s]">
              <p className="font-display text-xl text-ink">Family dentistry</p>
              <p className="text-xs text-muted-foreground">Young and adult patients</p>
            </div>
          </motion.div>
          <div className="absolute -bottom-8 -left-6 h-28 w-28 rounded-full bg-ink">
            <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 text-gold-soft" aria-hidden>
              <defs><path id="circ" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" /></defs>
              <text fontSize="9.5" letterSpacing="2.4" fill="currentColor"><textPath href="#circ">PRETTY SMILE · DENTAL CLINIC ·</textPath></text>
            </svg>
            <Smile className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-gold" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustMarquee() {
  return (
    <div className="border-y border-line bg-sand">
      <Marquee items={["Google 4.6 ★ · 43 reviews", "18 years in practice", "2,786 happy smiles", "Cosmetic · Restorative · Family dentistry", "Sheikh Zayed Road, Trade Centre"]} />
    </div>
  );
}

export function Welcome() {
  return (
    <section className="grain section-pad">
      <div className="container-lux grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <div className="arch aspect-[4/5] max-w-md shadow-card"><BeforeAfter before={before.url} after={after.url} /></div>
          <p className="mt-4 text-xs text-muted-foreground">Results vary by patient. Real patient photo.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Eyebrow>We care about your teeth</Eyebrow>
          <h2 className="h2-lux">A dental visit should feel <Accent>calm</Accent>, never stressful.</h2>
          <p className="mt-6 text-muted-foreground">We sincerely believe that visiting a dentist shouldn't be a frightening or stressful experience. That's why we provide a comfortable, relaxing experience for all our young and adult patients.</p>
          <Link to="/contact" className={cn(luxButton(), "mt-9")}>Book a Consultation<Arrow /></Link>
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesStack() {
  const bgs = ["bg-sand", "bg-paper", "bg-ink-grad"];
  return (
    <section className="section-pad">
      <div className="container-lux grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-40">
            <Eyebrow>Our treatments</Eyebrow>
            <h2 className="h2-lux">Care for every <Accent>smile</Accent></h2>
            <p className="mt-5 max-w-sm text-muted-foreground">From routine fillings to cosmetic whitening, every treatment is gentle, explained clearly and planned around you.</p>
            <Link to="/services" className="link-grow mt-8 inline-flex items-center gap-2 font-medium text-ink">View all services <Arrow /></Link>
          </div>
        </div>
        <div className="lg:col-span-7">
          {services.map((s, i) => {
            const dark = i % 3 === 2;
            return (
              <div key={s.slug} className="mb-6 lg:sticky" style={{ top: `${140 + i * 24}px` }}>
                <Reveal>
                  <article className={cn("flex min-h-[300px] flex-col rounded-[28px] p-8 shadow-card lg:min-h-[360px] lg:p-10", bgs[i % 3], dark && "text-ivory")}>
                    <div className="flex items-start justify-between">
                      <span className="font-display text-4xl text-gold">0{i + 1}</span>
                      <span className={cn("flex h-14 w-14 items-center justify-center rounded-full", dark ? "bg-ivory/10 text-gold-soft" : "bg-aqua-soft text-ink")}><s.icon className="h-6 w-6" strokeWidth={1.5} /></span>
                    </div>
                    <h3 className={cn("h3-lux mt-auto pt-10", dark && "text-ivory")}>{s.title}</h3>
                    <p className={cn("mt-3 max-w-md line-clamp-2", dark ? "text-ivory/75" : "text-muted-foreground")}>{s.short}</p>
                    <Link to="/services/$slug" params={{ slug: s.slug }} className={cn("group mt-6 inline-flex items-center gap-2 font-medium", dark ? "text-gold-soft" : "text-ink")}>Learn more <Arrow /></Link>
                  </article>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DoctorsPreview() {
  return (
    <section className="section-pad bg-sand">
      <div className="container-lux">
        <SectionHeading eyebrow="Our team" title={<>Meet your <Accent>dentists</Accent></>} />
        <div className="grid gap-10 md:grid-cols-2">
          {doctors.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.1}>
              <article className="group rounded-[28px] bg-paper p-6 shadow-card lg:p-8">
                <div className="relative mx-auto aspect-[4/5] max-w-xs">
                  <div className="arch h-full bg-aqua-soft"><img src={d.photo} alt={`${d.name}, dentist at Pretty Smile`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" style={{ objectPosition: d.position }} /></div>
                  <svg className="pointer-events-none absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)]" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden>
                    <path d="M2 123 V50 A48 48 0 0 1 98 50 V123 Z" fill="none" stroke="var(--gold)" strokeWidth="0.6" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1" className="[stroke-dashoffset:1] transition-[stroke-dashoffset] duration-1000 group-hover:[stroke-dashoffset:0]" />
                  </svg>
                </div>
                <h3 className="h3-lux mt-8">{d.name}</h3>
                <p className="text-sm text-muted-foreground">{d.title}</p>
                <div className="mt-4 flex flex-wrap gap-2">{d.chips.slice(0, 3).map((c) => <span key={c} className="rounded-full border border-gold/60 px-3 py-1 text-xs text-ink">{c}</span>)}</div>
                <p className="mt-4 text-muted-foreground">{d.short}</p>
                <Link to="/doctors" className="link-grow mt-5 inline-flex items-center gap-2 font-medium text-ink">Read more <Arrow /></Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsBand() {
  return (
    <section className="bg-ink-grad relative overflow-hidden py-24">
      <Smile className="pointer-events-none absolute -right-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 text-ivory/5" strokeWidth={0.5} />
      <div className="container-lux relative grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:divide-x lg:divide-gold/30">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-5xl text-gold-soft lg:text-6xl"><CountUp to={s.value} />{s.label.startsWith("Years") ? "" : "+"}</p>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-ivory/75">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FirstVisit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const steps = [
    { t: "Book", d: "Call, WhatsApp or use the form. We'll find a time that suits you." },
    { t: "Meet your dentist", d: "A relaxed conversation and a gentle check-up, no rush." },
    { t: "Understand your plan", d: "Clear options and an honest price before anything begins." },
    { t: "Begin, at your pace", d: "Treatment starts only when you feel ready." },
  ];
  return (
    <section className="grain section-pad">
      <div className="container-lux">
        <SectionHeading eyebrow="What to expect" title={<>Your first visit, <Accent>simply</Accent></>} />
        <div ref={ref} className="relative grid gap-10 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-line lg:block">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-gold" />
          </div>
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08} className="relative flex gap-6 lg:block">
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold bg-ivory font-display text-xl text-ink">{i + 1}</span>
              <div><h3 className="h3-lux lg:mt-6">{s.t}</h3><p className="mt-2 text-muted-foreground">{s.d}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section className="section-pad">
      <div className="container-lux">
        <SectionHeading center eyebrow="Transparent pricing" title={<>Honest prices, <Accent>clearly</Accent> shown</>} text="Starting from, final plan after consultation." />
        <div className="grid items-center gap-6 md:grid-cols-3">
          {pricing.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className={cn(p.featured && "order-first md:order-none")}>
              <div className={cn("rounded-[28px] bg-paper p-9 text-center shadow-card", p.featured && "border border-gold md:-translate-y-4 md:py-12")}>
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">Starting from</p>
                <p className="mt-2 font-display text-6xl text-ink">{p.price}<span className="ml-2 text-lg text-muted-foreground">{p.suffix}</span></p>
                <p className="mt-5 text-sm text-muted-foreground">First visit? Enjoy a welcoming discount on us.</p>
                <Link to="/contact" className={cn(luxButton({ variant: p.featured ? "primary" : "outline", size: "sm" }), "mt-7")}>Request an appointment</Link>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">First visit at Pretty Smile Dental? Enjoy a welcoming discount on us. Final plan and price are confirmed after your consultation.</p>
      </div>
    </section>
  );
}

export function Reviews() {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (pause) return;
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [pause]);
  return (
    <section className="bg-ink-grad section-pad overflow-hidden">
      <div className="container-lux grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow dark>Patient reviews</Eyebrow>
          <p className="font-display text-8xl text-ivory">4.6</p>
          <p className="mt-2 flex text-gold">{[...Array(5)].map((_, k) => <Star key={k} className="h-5 w-5 fill-current" />)}</p>
          <p className="mt-3 text-ivory/75">{clinic.reviews} Google reviews</p>
          <a href={clinic.mapsUrl} target="_blank" rel="noreferrer" className="link-grow mt-6 inline-flex items-center gap-2 text-gold-soft">Read more on Google <Arrow /></a>
        </div>
        <div className="lg:col-span-8" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
          <motion.div
            className="flex cursor-grab gap-6 active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => { if (info.offset.x < -60) setI((v) => Math.min(testimonials.length - 1, v + 1)); if (info.offset.x > 60) setI((v) => Math.max(0, v - 1)); }}
            animate={{ x: `calc(${-i} * (min(100%, 460px) + 24px))` }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {testimonials.map((t) => (
              <figure key={t.name} className="glass-dark w-full max-w-[460px] shrink-0 rounded-[28px] p-8 lg:p-10">
                <blockquote className="font-display text-2xl leading-snug text-ivory">“{t.text}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold font-medium text-ink">{t.name.split(" ").map((n) => n[0]).join("")}</span>
                  <span><span className="block font-medium text-ivory">{t.name}</span><span className="text-sm text-ivory/60">Happy patient</span></span>
                </figcaption>
              </figure>
            ))}
          </motion.div>
          <div className="mt-8 flex gap-2">
            {testimonials.map((t, k) => <button key={t.name} type="button" aria-label={`Show review ${k + 1}`} onClick={() => setI(k)} className={cn("h-2 rounded-full transition-all", k === i ? "w-8 bg-gold" : "w-2 bg-ivory/30")} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function EmergencyBand() {
  return (
    <section className="bg-ink py-6">
      <div className="container-lux">
        <div className="relative overflow-hidden rounded-[28px] border border-gold/40 bg-gold/10 p-10 lg:flex lg:items-center lg:justify-between lg:p-14">
          <div className="max-w-xl">
            <h2 className="h2-lux text-ivory">Tooth pain or a chipped tooth? <Accent dark>Call us now</Accent>.</h2>
            <p className="mt-4 text-ivory/75">Call us and we will help assess the situation and advise you on the best options.</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <a href={clinic.emergencyHref} className={luxButton({ variant: "gold" })}><Phone className="h-4 w-4" />{clinic.emergency}</a>
            <a href={waLink("Hello, I have a dental emergency.")} className={luxButton({ variant: "outlineGold" })}><MessageCircle className="h-4 w-4" />WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQ({ items = homeFaqs, title }: { items?: { q: string; a: string }[]; title?: React.ReactNode }) {
  return (
    <section className="section-pad bg-sand">
      <div className="container-lux grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><Eyebrow>FAQ</Eyebrow><h2 className="h2-lux">{title ?? <>Good <Accent>questions</Accent></>}</h2></div>
        <div className="lg:col-span-8"><Accordion items={items} /></div>
      </div>
    </section>
  );
}

export function InfoList() {
  return (
    <ul className="grid gap-4 text-sm sm:grid-cols-2">
      <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />{clinic.address}</li>
      <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} /><span><a className="link-grow" href={clinic.phoneHref}>{clinic.phone}</a><br />Emergency <a className="link-grow" href={clinic.emergencyHref}>{clinic.emergency}</a></span></li>
      <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} /><a className="link-grow" href={`mailto:${clinic.email}`}>{clinic.email}</a></li>
      <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} /><span>{clinic.hours.map((h) => <span key={h.day} className="block">{h.day}: {h.time}</span>)}</span></li>
    </ul>
  );
}

export function MapEmbed({ className }: { className?: string }) {
  return <iframe title="Pretty Smile Dental Clinic on Google Maps" src={clinic.mapEmbed} loading="lazy" className={cn("w-full rounded-[28px] border-0 grayscale transition duration-700 hover:grayscale-0", className)} />;
}

export function ContactPreview() {
  return (
    <section className="grain section-pad">
      <div className="container-lux grid gap-12 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Book a visit</Eyebrow>
          <h2 className="h2-lux mb-8">Let's plan your <Accent>smile</Accent></h2>
          <div className="rounded-[28px] bg-paper p-6 shadow-card lg:p-8"><BookingForm compact /></div>
        </Reveal>
        <Reveal delay={0.1}>
          <MapEmbed className="h-[380px]" />
          <div className="mt-8"><InfoList /></div>
        </Reveal>
      </div>
    </section>
  );
}

export function CTABand() {
  return (
    <section className="section-pad">
      <div className="container-lux text-center">
        <Reveal>
          <h2 className="h2-lux mx-auto max-w-3xl">Ready for a calmer kind of <Accent>dental visit</Accent>?</h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className={luxButton()}>Book a Consultation<Arrow /></Link>
            <a href={waLink()} className={luxButton({ variant: "outline" })}><MessageCircle className="h-4 w-4" />WhatsApp us</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    }),
  };
}

export function seo(title: string, description: string, path: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${clinic.website}${path}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${clinic.website}${path}` }],
  };
}
