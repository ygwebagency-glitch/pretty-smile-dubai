// [CONFIRM] items are listed in README.md
export const clinic = {
  name: "Pretty Smile Dental Clinic",
  tagline: "Dubai's general, cosmetic and restorative dental care for the whole family",
  address: "M-05 Al Meraikhi Tower, Sheikh Zayed Road, Trade Centre First, Dubai, UAE",
  phone: "+971 4 886 6248",
  phoneHref: "tel:+97148866248",
  emergency: "+971 55 991 0094",
  emergencyHref: "tel:+971559910094",
  email: "hello@prettysmiledubai.ae",
  website: "https://www.prettysmiledubai.ae",
  whatsapp: "971559910094", // [CONFIRM] defaults to emergency number
  rating: 4.6,
  reviews: 43,
  hours: [
    { day: "Sunday – Thursday", time: "9:00 am – 6:00 pm" },
    { day: "Friday", time: "Closed" },
    { day: "Saturday", time: "12:00 pm – 6:00 pm" },
  ], // [CONFIRM]
  hoursShort: "Sun–Thu 9am–6pm · Sat 12–6pm · Fri closed",
  dhaLicence: "[CONFIRM]",
  social: { facebook: "https://www.facebook.com/", instagram: "https://www.instagram.com/" }, // [CONFIRM]
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Al+Meraikhi+Tower+Sheikh+Zayed+Road+Dubai", // [CONFIRM]
  mapEmbed: "https://www.google.com/maps?q=Al%20Meraikhi%20Tower%2C%20Sheikh%20Zayed%20Road%2C%20Dubai&output=embed",
};

export const waLink = (text?: string) =>
  `https://wa.me/${clinic.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
