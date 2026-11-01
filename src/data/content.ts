import adnan from "@/assets/team-member-1.png.asset.json";
import rehanuma from "@/assets/team-member-2.jpeg.asset.json";
import { Activity, Shield, Sparkles, ScanLine, Smile, Layers, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  icon: LucideIcon;
  what: string;
  when: string;
  expect: string;
  faqs: { q: string; a: string }[];
};

// Clinical wording to be reviewed by the clinic.
export const services: Service[] = [
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    short: "Recommended when the tooth pulp and nerves become infected. With our dental team you can expect little to no discomfort during the process.",
    summary: "Gentle treatment to save an infected tooth and relieve pain.",
    icon: Activity,
    what: "A root canal removes infected or inflamed pulp from inside the tooth, cleans and shapes the canals, then seals them so the natural tooth can be kept.",
    when: "It is usually recommended when the pulp and nerve become infected, often after deep decay, a crack or a previous large filling. Signs can include lingering sensitivity, pain when biting or swelling.",
    expect: "Your dentist numbs the area first, so most patients feel little to no discomfort. Treatment may take one or more visits, and a crown is often advised afterwards to protect the tooth.",
    faqs: [
      { q: "Is a root canal painful?", a: "Most patients feel little to no discomfort because the area is fully numbed. Mild tenderness for a few days afterwards is normal." },
      { q: "How many visits does it take?", a: "It depends on the tooth. Some treatments are completed in one visit, others need two." },
      { q: "Will I need a crown afterwards?", a: "Often, yes. A crown helps protect a treated back tooth from cracking. Your dentist will advise you." },
    ],
  },
  {
    slug: "mouth-guards",
    title: "Mouth Guards",
    short: "Also called mouth protectors, these are professionally moulded to fit your teeth. A great way to protect the soft tissues in the mouth.",
    summary: "Custom-moulded protection for sport and night-time grinding.",
    icon: Shield,
    what: "A custom mouth guard is a protective appliance made from an impression of your teeth, so it fits closely and comfortably.",
    when: "Mouth guards are commonly recommended for contact sports and for people who clench or grind their teeth at night.",
    expect: "We take an impression or scan of your teeth, the guard is made to fit, and we check the fit with you at a short follow-up visit.",
    faqs: [
      { q: "Why not buy one from a shop?", a: "A custom guard fits your teeth precisely, which usually makes it more comfortable and easier to wear." },
      { q: "Can children wear one?", a: "Yes. We treat young and adult patients and can make guards for children who play sport." },
      { q: "How do I clean it?", a: "Rinse it after use, brush it gently with cool water and store it dry in its case." },
    ],
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    short: "Brighten your smile in as little as one visit. Our professional whitening treatment uses a powerful yet safe method to get the smile you desire.",
    summary: "Professional whitening for a brighter smile, often in one visit.",
    icon: Sparkles,
    what: "Professional whitening lightens the natural shade of your teeth using whitening gel applied under dental supervision.",
    when: "It suits people with healthy teeth and gums who would like a brighter smile. Your dentist checks first that whitening is right for you.",
    expect: "After a short check, your gums are protected and the gel is applied. Many patients see a noticeable difference in one visit. Some temporary sensitivity can occur.",
    faqs: [
      { q: "How long does whitening last?", a: "Results vary by patient and habits such as coffee, tea and smoking. Good care helps them last longer." },
      { q: "Does whitening work on crowns or veneers?", a: "No. Whitening affects natural teeth only, so existing restorations may need to be considered." },
      { q: "Will my teeth be sensitive?", a: "Some people feel temporary sensitivity. It usually settles within a day or two." },
    ],
  },
  {
    slug: "x-ray-examination",
    title: "X-Ray Examination",
    short: "Digital sensors for comfortable, accurate diagnosis.",
    summary: "Digital X-rays to see what an eye exam cannot.",
    icon: ScanLine,
    what: "Digital dental X-rays use a small sensor to capture images of your teeth and jaw, helping your dentist see decay, infection and bone levels.",
    when: "X-rays are taken when needed to diagnose a problem or plan treatment, and at intervals your dentist recommends for routine care.",
    expect: "A sensor is placed in your mouth for a few seconds. Digital images appear on screen almost immediately so your dentist can explain what they see.",
    faqs: [
      { q: "Are dental X-rays safe?", a: "Digital dental X-rays use a low dose of radiation, and we only take them when they are clinically useful." },
      { q: "How often do I need X-rays?", a: "It depends on your dental health. Your dentist will recommend an interval that suits you." },
      { q: "Can I see my X-rays?", a: "Yes. Images appear on screen and your dentist will walk you through them." },
    ],
  },
  {
    slug: "dentures",
    title: "Dentures",
    short: "Custom made to fit your smile comfortably and securely, helping restore function, beauty and health.",
    summary: "Custom-made dentures that feel comfortable and look natural.",
    icon: Smile,
    what: "Dentures are removable replacements for missing teeth. They can be full (replacing all teeth in a jaw) or partial.",
    when: "They are an option when several or all teeth are missing and you would like to restore chewing, speech and the look of your smile.",
    expect: "We take impressions and measurements over a few visits, try in the design with you, then fit and adjust the final dentures for comfort.",
    faqs: [
      { q: "How long does it take to get dentures?", a: "Usually a few appointments over several weeks, so the fit and look can be checked along the way." },
      { q: "Will they feel natural?", a: "It takes a short time to adjust. Custom dentures are designed to fit comfortably and securely." },
      { q: "How do I care for them?", a: "Clean them daily, remove them at night if advised, and attend regular check-ups." },
    ],
  },
  {
    slug: "composite-fillings",
    title: "Composite (Fillings)",
    short: "A restorative process used to repair minor to moderate tooth damage. Often completed in one visit and can help prevent the need for a root canal.",
    summary: "Tooth-coloured fillings that repair damage, often in one visit.",
    icon: Layers,
    what: "Composite fillings are tooth-coloured materials bonded to the tooth to repair decay, chips or minor fractures.",
    when: "They are used for minor to moderate damage. Treating decay early can help prevent the need for a root canal later.",
    expect: "The area is numbed, damaged tissue is removed, and the composite is placed in layers, shaped and polished, usually in a single visit.",
    faqs: [
      { q: "Do composite fillings look natural?", a: "Yes. The material is matched to the shade of your tooth." },
      { q: "How long do they last?", a: "With good care they can last many years. Your dentist checks them at regular visits." },
      { q: "Can I eat afterwards?", a: "Composite sets immediately, but wait until the numbness wears off before eating." },
    ],
  },
];

export const doctors = [
  {
    slug: "dr-adnan-ahmad",
    name: "Dr. Adnan Ahmad",
    title: "B.D.S, M.Sc (London)",
    photo: adnan.url,
    position: "50% 20%",
    chips: ["Cosmetic and reconstructive", "Veneers, crowns and bridges", "London M.Sc", "Practising since 1999"],
    short: "Practising since 1999 in Dubai and abroad, with expertise in cosmetic and reconstructive dentistry.",
    bio: "Dr. Adnan Ahmad has been practising since 1999 in Dubai and abroad. His expertise is in cosmetic and reconstructive dentistry. He works with only the finest dental materials and laboratories to achieve beautiful, natural-looking crowns, bridges and veneers. He previously practised at Al Sayegh Medical Center, Dubai.",
  },
  {
    slug: "dr-rehanuma-iqbal",
    name: "Dr. Rehanuma Iqbal",
    title: "B.D.S",
    photo: rehanuma.url,
    position: "50% 30%",
    chips: ["Restorative and aesthetic", "No-prep veneers", "Smart smile design"],
    short: "General dentist since 2009, trained in restorative and aesthetic dentistry and smart smile design.",
    bio: "Dr. Rehanuma Iqbal qualified as a general dentist in 2009 at AJ Institute of Dental Sciences, Karnataka, India. She completed a certified Restorative and Aesthetic dentistry course by the British Academy of Restorative Dentistry (CAPP training institute, Dubai). She is also interested in minimally invasive and no-prep veneers and smart smile design (CAPP Institute).",
  },
];

export const testimonials = [
  { name: "Nicole Habeesh", text: "#1 Recommended. I am now and will forever be a client of Pretty Smile Dental Clinic." },
  { name: "James Feldman", text: "Pretty Smile Dental Clinic is now the only place I will go for my dental care from now on." },
  { name: "Hassan Muhammed", text: "This was such a nice, clean, and professional dental care clinic. I highly recommend it." },
];

// [CONFIRM] stats still accurate
export const stats = [
  { value: 2786, label: "Happy smiles" },
  { value: 4247, label: "Services performed" },
  { value: 20569, label: "Instagram followers" },
  { value: 18, label: "Years in practice" },
];

// [CONFIRM] prices
export const pricing = [
  { title: "Dental Whitening", price: "300", suffix: "AED" },
  { title: "Root Treatment", price: "800", suffix: "AED", featured: true },
  { title: "Crowns / Veneers", price: "10,000", suffix: "AED+" },
];

export const homeFaqs = [
  { q: "Do I need an appointment?", a: "Yes, we recommend booking ahead. Call us, message us on WhatsApp or use the booking form; walk-ins are seen subject to availability." },
  { q: "What are your opening hours?", a: "Sunday to Thursday 9:00 am to 6:00 pm, Saturday 12:00 pm to 6:00 pm, and closed on Friday." },
  { q: "Where are you located and is there parking?", a: "We are at M-05 Al Meraikhi Tower, Sheikh Zayed Road, Trade Centre First, Dubai. Please call us for current parking details." },
  { q: "How much is a consultation?", a: "Please call or message us for the current consultation fee. First-time patients enjoy a welcoming discount." },
  { q: "What should I bring to my first visit?", a: "Your Emirates ID, plus any previous dental records or X-rays if you have them." },
  { q: "Can I bring my children?", a: "Yes. We provide a comfortable, relaxing experience for both young and adult patients." },
];
