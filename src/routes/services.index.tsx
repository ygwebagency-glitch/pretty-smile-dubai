import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/layout";
import { EmergencyBand, Pricing, seo } from "@/components/site/sections";
import { Accent, Arrow, Reveal } from "@/components/site/ui";
import { services } from "@/data/content";

export const Route = createFileRoute("/services/")({
  head: () => seo("Dental Services in Dubai | Pretty Smile", "Root canal, whitening, fillings, dentures, mouth guards and digital X-rays at Pretty Smile Dental Clinic, Dubai.", "/services"),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title={<>Treatments for every <Accent dark>smile</Accent></>} text="Gentle, clearly explained care for the whole family." crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]} />
      <section className="grain section-pad">
        <div className="container-lux grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group flex h-full flex-col rounded-[28px] bg-paper p-8 shadow-card transition duration-500 hover:-translate-y-1">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-aqua-soft text-ink ring-gold transition group-hover:ring-1"><s.icon className="h-6 w-6" strokeWidth={1.5} /></span>
                <h2 className="h3-lux mt-8">{s.title}</h2>
                <p className="mt-3 flex-1 text-muted-foreground">{s.short}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-medium text-ink">Learn more <Arrow /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <Pricing />
      <EmergencyBand />
    </>
  );
}
