import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUp, Clock, Facebook, Instagram, Mail, Menu, MessageCircle, Phone, X, ChevronDown, CalendarCheck } from "lucide-react";
import { useState, type ReactNode } from "react";
import logo from "@/assets/logo-wide.png.asset.json";
import logoWhite from "@/assets/logo-wide-white.png.asset.json";
import { clinic, waLink } from "@/config/clinic";
import { services } from "@/data/content";
import { Arrow, EASE, luxButton } from "./ui";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/doctors", label: "Doctors" },
  { to: "/contact", label: "Contact" },
] as const;

function UtilityBar() {
  return (
    <div className="relative z-[55] hidden h-[38px] bg-ink text-[13px] text-ivory/85 md:block">
      <div className="container-lux flex h-full items-center justify-between">
        <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />{clinic.hoursShort}</span>
        <span className="flex items-center gap-6">
          <a href={clinic.phoneHref} className="link-grow flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />{clinic.phone}</a>
          <a href={`mailto:${clinic.email}`} className="link-grow flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />{clinic.email}</a>
        </span>
      </div>
    </div>
  );
}

function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 300 && y - prev > 6);
    if (prev - y > 2) setHidden(false);
  });

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gold" style={{ scaleX: progress }} />
      <motion.header
        animate={{ y: hidden && !open ? -120 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="sticky top-4 z-50 px-3 md:px-6"
      >
        <div className={cn("glass mx-auto flex max-w-[1240px] items-center justify-between rounded-full pl-6 pr-2 shadow-card transition-all duration-500", scrolled ? "h-16 backdrop-blur-2xl" : "h-[76px]")}>
          <Link to="/" aria-label="Pretty Smile Dental Clinic home"><img src={logo.url} alt="Pretty Smile Dental Clinic" width={180} height={28} className="h-7 w-auto" /></Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {nav.map((n) => {
              const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
              const link = (
                <Link to={n.to} className={cn("relative py-2 text-[15px] font-medium text-ink", "after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300", active ? "after:w-full" : "after:w-0 hover:after:w-full")}>
                  {n.label}{n.to === "/services" && <ChevronDown className="ml-1 inline h-3.5 w-3.5" strokeWidth={1.5} />}
                </Link>
              );
              if (n.to !== "/services") return <div key={n.to}>{link}</div>;
              return (
                <div key={n.to} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)} onFocus={() => setMega(true)} onBlur={() => setMega(false)}>
                  {link}
                  <AnimatePresence>
                    {mega && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3, ease: EASE }} className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4">
                        <div className="grid grid-cols-2 gap-1 rounded-[28px] bg-paper p-3 shadow-card">
                          {services.map((s) => (
                            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group flex items-start gap-3 rounded-2xl p-3 transition hover:bg-sand">
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-aqua-soft text-ink ring-gold transition group-hover:ring-1"><s.icon className="h-4 w-4" strokeWidth={1.5} /></span>
                              <span><span className="block text-sm font-medium text-ink">{s.title}</span><span className="block text-xs leading-snug text-muted-foreground">{s.summary}</span></span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/contact" className={cn(luxButton({ size: "sm" }), "hidden sm:inline-flex")}>Book a Consultation<Arrow /></Link>
            <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="flex h-12 w-12 items-center justify-center rounded-full text-ink lg:hidden"><Menu className="h-6 w-6" strokeWidth={1.5} /></button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-ink-grad fixed inset-0 z-[70] flex flex-col p-6 lg:hidden">
            <div className="flex items-center justify-between">
              <img src={logoWhite.url} alt="Pretty Smile Dental Clinic" className="h-7 w-auto" />
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="flex h-12 w-12 items-center justify-center rounded-full text-ivory"><X className="h-6 w-6" strokeWidth={1.5} /></button>
            </div>
            <nav className="mt-14 flex flex-col gap-4" aria-label="Mobile">
              {nav.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i, duration: 0.6, ease: EASE }}>
                  <Link to={n.to} onClick={() => setOpen(false)} className="font-display text-5xl text-ivory">{n.label}</Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto grid grid-cols-2 gap-3">
              <a href={clinic.phoneHref} className={luxButton({ variant: "gold" })}><Phone className="h-4 w-4" />Call</a>
              <a href={waLink()} className={luxButton({ variant: "outlineGold" })}><MessageCircle className="h-4 w-4" />WhatsApp</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-ink-grad pb-28 pt-20 text-ivory/80 md:pb-10">
      <div className="container-lux grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logoWhite.url} alt="Pretty Smile Dental Clinic" className="h-7 w-auto" loading="lazy" />
          <p className="mt-5 text-sm">{clinic.tagline}.</p>
          <div className="mt-6 flex gap-3">
            <a href={clinic.social.facebook} aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold transition hover:bg-gold hover:text-ink"><Facebook className="h-4 w-4" strokeWidth={1.5} /></a>
            <a href={clinic.social.instagram} aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold transition hover:bg-gold hover:text-ink"><Instagram className="h-4 w-4" strokeWidth={1.5} /></a>
          </div>
        </div>
        <div>
          <h3 className="mb-5 font-display text-xl text-ivory">Quick links</h3>
          <ul className="space-y-3 text-sm">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="link-grow">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 font-display text-xl text-ivory">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li>{clinic.address}</li>
            <li><a className="link-grow" href={clinic.phoneHref}>{clinic.phone}</a></li>
            <li>Emergency: <a className="link-grow" href={clinic.emergencyHref}>{clinic.emergency}</a></li>
            <li><a className="link-grow" href={`mailto:${clinic.email}`}>{clinic.email}</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-5 font-display text-xl text-ivory">Opening hours</h3>
          <ul className="space-y-3 text-sm">
            {clinic.hours.map((h) => <li key={h.day} className="flex justify-between gap-4 border-b border-ivory/10 pb-2"><span>{h.day}</span><span className="text-gold-soft">{h.time}</span></li>)}
          </ul>
        </div>
      </div>
      <div className="container-lux mt-16 flex items-center justify-between border-t border-ivory/10 pt-6 text-xs">
        <span>© 2026 Pretty Smile Dental Clinic. All rights reserved.</span>
        <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold transition hover:bg-gold hover:text-ink"><ArrowUp className="h-4 w-4" strokeWidth={1.5} /></button>
      </div>
    </footer>
  );
}

function MobileBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path === "/contact") return null;
  return (
    <div className="glass fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-3 pb-[env(safe-area-inset-bottom)] md:hidden">
      <a href={clinic.phoneHref} className="flex flex-col items-center justify-center text-xs font-medium text-ink"><Phone className="h-5 w-5" strokeWidth={1.5} />Call</a>
      <a href={waLink()} className="flex flex-col items-center justify-center text-xs font-medium text-ink"><MessageCircle className="h-5 w-5" strokeWidth={1.5} />WhatsApp</a>
      <Link to="/contact" className="flex flex-col items-center justify-center bg-ink text-xs font-medium text-ivory"><CalendarCheck className="h-5 w-5" strokeWidth={1.5} />Book</Link>
    </div>
  );
}

function WhatsAppFloat() {
  return (
    <a href={waLink("Hello Pretty Smile, I'd like to book an appointment.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-ink text-gold-soft shadow-card ring-1 ring-gold transition hover:-translate-y-1 md:flex">
      <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
    </a>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory">Skip to content</a>
      <UtilityBar />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main id="main" key={path} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="-mt-[92px]">
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <MobileBar />
      <WhatsAppFloat />
    </>
  );
}

export function PageHero({ eyebrow, title, text, crumbs }: { eyebrow: string; title: ReactNode; text?: string; crumbs: { label: string; to?: string }[] }) {
  return (
    <section className="bg-ink-grad relative overflow-hidden pb-24 pt-44 lg:pb-32 lg:pt-52">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-gold/20" />
      <div className="container-lux relative">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ivory/60">
          {crumbs.map((c, i) => (
            <span key={c.label}>{i > 0 && <span className="mx-2 text-gold">/</span>}{c.to ? <a href={c.to} className="link-grow">{c.label}</a> : <span className="text-ivory">{c.label}</span>}</span>
          ))}
        </nav>
        <p className="mb-5 flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-soft"><span className="h-px w-8 bg-gold" />{eyebrow}</p>
        <h1 className="h1-lux max-w-4xl text-ivory">{title}</h1>
        {text && <p className="mt-6 max-w-xl text-ivory/75">{text}</p>}
      </div>
    </section>
  );
}
