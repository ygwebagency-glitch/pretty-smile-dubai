import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/layout";
import { CTABand, DoctorsPreview, StatsBand, Welcome, seo } from "@/components/site/sections";
import { Accent, Eyebrow, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => seo("About Pretty Smile Dental Clinic, Dubai", "A calm, comfortable dental clinic on Sheikh Zayed Road caring for young and adult patients since 2007.", "/about"),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title={<>A calmer kind of <Accent dark>dental care</Accent></>} crumbs={[{ label: "Home", to: "/" }, { label: "About" }]} />
      <section className="grain section-pad">
        <div className="container-lux grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5"><Eyebrow>Our story</Eyebrow><h2 className="h2-lux">Care that puts you <Accent>at ease</Accent></h2></Reveal>
          <Reveal delay={0.1} className="space-y-5 text-muted-foreground lg:col-span-7">
            <p>Pretty Smile Dental Clinic provides general, cosmetic and restorative dentistry for the whole family from our clinic in Al Meraikhi Tower, Sheikh Zayed Road, Trade Centre First, Dubai.</p>
            <p>We sincerely believe that visiting a dentist shouldn't be a frightening or stressful experience. That's why we provide a comfortable, relaxing experience for all our young and adult patients.</p>
            <p>Our dentists work with fine dental materials and trusted laboratories to achieve beautiful, natural-looking results.</p>
          </Reveal>
        </div>
      </section>
      <Welcome />
      <DoctorsPreview />
      <StatsBand />
      <CTABand />
    </>
  );
}
