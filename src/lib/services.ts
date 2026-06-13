export const SERVICES = [
  {
    slug: "commercial",
    title: "Commercial Security",
    short: "Offices, retail outlets and corporate properties.",
    description:
      "Vetted, uniformed officers and 24/7 monitoring tailored to offices, retail chains and corporate campuses — protecting people, premises and reputation.",
  },
  {
    slug: "industrial",
    title: "Industrial Security",
    short: "Factories, warehouses and construction sites.",
    description:
      "Perimeter control, access management and patrol-based protection engineered for high-risk industrial environments and active project sites.",
  },
  {
    slug: "residential",
    title: "Residential Security",
    short: "Gated communities, private homes and apartments.",
    description:
      "Discreet, courteous and highly trained residential officers for villas, condominiums and gated developments — concierge-grade protection at home.",
  },
  {
    slug: "investigation",
    title: "Private Investigation",
    short: "Confidential corporate and personal checks.",
    description:
      "Background verifications, due-diligence and confidential investigations conducted with absolute discretion and full legal compliance.",
  },
  {
    slug: "cit",
    title: "Cash in Transit Security",
    short: "Secure, armed logistics and high-value transport.",
    description:
      "Armed, GPS-tracked cash and valuables transport with strict protocols, route planning and trained tactical crews for end-to-end chain of custody.",
  },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
