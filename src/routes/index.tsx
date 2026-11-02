import { createFileRoute } from "@tanstack/react-router";
import { homeFaqs } from "@/data/content";
import { ContactPreview, DoctorsPreview, EmergencyBand, FAQ, FirstVisit, Hero, Pricing, Reviews, ServicesStack, StatsBand, TrustMarquee, Welcome, faqJsonLd, seo } from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo("Pretty Smile Dental Clinic | Dentist in Dubai", "Dubai's general, cosmetic and restorative dental care for the whole family, on Sheikh Zayed Road. Book a consultation today.", "/"),
    scripts: [faqJsonLd(homeFaqs)],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <Welcome />
      <ServicesStack />
      <DoctorsPreview />
      <StatsBand />
      <FirstVisit />
      <Pricing />
      <Reviews />
      <EmergencyBand />
      <FAQ />
      <ContactPreview />
    </>
  );
}
