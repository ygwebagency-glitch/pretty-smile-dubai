import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/layout";
import { InfoList, MapEmbed, seo } from "@/components/site/sections";
import { BookingForm } from "@/components/site/BookingForm";
import { Accent, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { doctor?: string } => ({ doctor: typeof s.doctor === "string" ? s.doctor : undefined }),
  head: () => seo("Book a Dentist in Dubai | Contact Pretty Smile", "Book an appointment at Pretty Smile Dental Clinic, Al Meraikhi Tower, Sheikh Zayed Road. Call +971 4 886 6248.", "/contact"),
  component: Contact,
});

function Contact() {
  const { doctor } = Route.useSearch();
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Book your <Accent dark>visit</Accent></>} text="Send us your details and we'll confirm a time that suits you." crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <section className="grain section-pad">
        <div className="container-lux grid gap-12 lg:grid-cols-12">
          <Reveal className="rounded-[28px] bg-paper p-6 shadow-card lg:col-span-7 lg:p-10"><BookingForm defaultDoctor={doctor ?? ""} /></Reveal>
          <Reveal delay={0.1} className="rounded-[28px] bg-sand p-8 lg:col-span-5"><h2 className="h3-lux mb-6">Visit us</h2><InfoList /></Reveal>
        </div>
        <div className="container-lux mt-12"><MapEmbed className="h-[460px]" /></div>
      </section>
    </>
  );
}
