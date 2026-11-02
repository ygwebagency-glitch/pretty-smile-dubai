import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/layout";
import { CTABand, seo } from "@/components/site/sections";
import { Accent, ArchFrame, Arrow, Reveal, luxButton } from "@/components/site/ui";
import { doctors } from "@/data/content";
import { clinic } from "@/config/clinic";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    ...seo("Our Dentists | Pretty Smile Dental Clinic Dubai", "Meet Dr. Adnan Ahmad and Dr. Rehanuma Iqbal, cosmetic, restorative and family dentists in Dubai.", "/doctors"),
    scripts: doctors.map((d) => ({ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: d.name, jobTitle: "Dentist", honorificSuffix: d.title, worksFor: { "@type": "Dentist", name: clinic.name } }) })),
  }),
  component: Doctors,
});

function Doctors() {
  return (
    <>
      <PageHero eyebrow="Our team" title={<>Meet your <Accent dark>dentists</Accent></>} crumbs={[{ label: "Home", to: "/" }, { label: "Doctors" }]} />
      {doctors.map((d, i) => (
        <section key={d.slug} className={cn("section-pad", i % 2 ? "bg-sand" : "grain")}>
          <div className="container-lux grid items-center gap-14 lg:grid-cols-2">
            <div className={cn("mx-auto aspect-[4/5] w-full max-w-sm", i % 2 && "lg:order-2")}>
              <ArchFrame src={d.photo} alt={`${d.name}, dentist at Pretty Smile`} position={d.position} className="h-full bg-aqua-soft" />
            </div>
            <Reveal>
              <h2 className="h2-lux">{d.name}</h2>
              <p className="mt-2 text-muted-foreground">{d.title}</p>
              <div className="mt-6 flex flex-wrap gap-2">{d.chips.map((c) => <span key={c} className="rounded-full border border-gold/60 px-3 py-1 text-sm text-ink">{c}</span>)}</div>
              <p className="mt-6 text-muted-foreground">{d.bio}</p>
              <Link to="/contact" search={{ doctor: d.name }} className={cn(luxButton(), "mt-8")}>Book with {d.name.replace("Dr. ", "Dr. ").split(" ").slice(0, 2).join(" ")}<Arrow /></Link>
            </Reveal>
          </div>
        </section>
      ))}
      <CTABand />
    </>
  );
}
