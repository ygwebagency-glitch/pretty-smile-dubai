import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MessageCircle, Phone, Star } from "lucide-react";
import { PageHero } from "@/components/site/layout";
import { CTABand, FAQ, faqJsonLd, seo } from "@/components/site/sections";
import { BookingForm } from "@/components/site/BookingForm";
import { Accent, Arrow, Reveal, luxButton } from "@/components/site/ui";
import { services, testimonials } from "@/data/content";
import { clinic, waLink } from "@/config/clinic";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ loaderData }) => {
    const s = services.find((x) => x.slug === loaderData?.slug);
    if (!s) return { meta: [{ title: "Service not found | Pretty Smile" }, { name: "robots", content: "noindex" }] };
    return {
      ...seo(`${s.title} in Dubai | Pretty Smile`, `${s.summary} ${s.title} at Pretty Smile Dental Clinic, Sheikh Zayed Road, Dubai.`, `/services/${s.slug}`),
      scripts: [
        faqJsonLd(s.faqs),
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.short, provider: { "@type": "Dentist", name: clinic.name } }) },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const s = services.find((x) => x.slug === slug)!;
  const related = services.filter((x) => x.slug !== slug).slice(0, 3);
  const blocks = [["What it is", s.what], ["When it's recommended", s.when], ["What to expect", s.expect]];
  return (
    <>
      <PageHero eyebrow="Treatment" title={s.title} text={s.summary} crumbs={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: s.title }]} />
      <section className="grain section-pad">
        <div className="container-lux grid gap-14 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-7">
            {blocks.map(([t, d], i) => (
              <Reveal key={t}>
                <span className="font-display text-3xl text-gold">0{i + 1}</span>
                <h2 className="h3-lux mt-3">{t}</h2>
                <p className="mt-4 text-muted-foreground">{d}</p>
              </Reveal>
            ))}
          </div>
          <aside className="lg:col-span-5">
            <div className="glass rounded-[28px] p-7 shadow-card lg:sticky lg:top-32">
              <h2 className="h3-lux mb-6">Book this treatment</h2>
              <BookingForm compact defaultService={s.title} />
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a href={clinic.phoneHref} className={luxButton({ variant: "outline", size: "sm" })}><Phone className="h-4 w-4" />Call</a>
                <a href={waLink(`Hello, I'd like to ask about ${s.title}.`)} className={luxButton({ variant: "outline", size: "sm" })}><MessageCircle className="h-4 w-4" />WhatsApp</a>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <section className="bg-ink-grad py-20">
        <div className="container-lux grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="glass-dark rounded-[28px] p-7">
              <p className="flex text-gold">{[...Array(5)].map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</p>
              <blockquote className="mt-4 font-display text-lg text-ivory">“{t.text}”</blockquote>
              <figcaption className="mt-5 text-sm text-ivory/70">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="section-pad">
        <div className="container-lux">
          <h2 className="h2-lux mb-10">Related <Accent>treatments</Accent></h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} to="/services/$slug" params={{ slug: r.slug }} className="group rounded-[28px] bg-sand p-7 transition hover:-translate-y-1">
                <r.icon className="h-6 w-6 text-ink" strokeWidth={1.5} />
                <h3 className="h3-lux mt-6">{r.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink">Learn more <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FAQ items={s.faqs} title={<>{s.title} <Accent>questions</Accent></>} />
      <CTABand />
    </>
  );
}
