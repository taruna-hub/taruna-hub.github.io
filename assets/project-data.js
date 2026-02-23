
// Centralized project data used by both pages.
// Tip: slug should match folder name under /media/<slug>/

window.projectsData = [
  {
    id: 1,
    slug: "aeron-ev",
    title: "Aeron EV — Compact Urban Concept",
    category: "automotive-3d",
    year: 2026,
    tags: ["automotive", "concept", "3D"],
    summary: "Electric city car concept exploring efficient packaging, CMF, and surfacing workflows.",
    cover: "media/aeron-ev/cover.jpg",
    images: [
      { src: "media/aeron-ev/01.jpg", alt: "Side profile clay render", caption: "Early surfacing study in clay-like shader." },
      { src: "media/aeron-ev/02.jpg", alt: "Interior CMF board", caption: "CMF exploration with recycled materials." },
      { src: "media/aeron-ev/03.jpg", alt: "Studio lighting render", caption: "Final studio render with HDRI lighting." }
    ],
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 2,
    slug: "arc-lamp",
    title: "ARC Lamp",
    category: "product-design",
    year: 2025,
    tags: ["lighting", "aluminum", "CNC"],
    summary: "A sculptural task lamp balancing form and function.",
    cover: "media/arc-lamp/cover.jpg",
    images: [
      { src: "media/arc-lamp/01.jpg", alt: "ARC Lamp on walnut desk", caption: "Prototype v2 in brushed aluminum." },
      { src: "media/arc-lamp/02.jpg", alt: "Exploded view", caption: "Exploded view showing internal mechanism." },
      { src: "media/arc-lamp/03.jpg", alt: "Detail of hinge", caption: "Self-locking hinge for smooth articulation." }
    ]
  },
  {
    id: 3,
    slug: "finpay-app",
    title: "FinPay — Mobile Banking",
    category: "ui-ux",
    year: 2024,
    tags: ["fintech", "design-system", "prototype"],
    summary: "Accessible mobile banking with a scalable design system.",
    cover: "media/finpay-app/cover.jpg",
    images: [
      { src: "media/finpay-app/01.jpg", alt: "Card sorting session", caption: "Information architecture exploration." },
      { src: "media/finpay-app/02.jpg", alt: "UI mockups", caption: "High-fidelity UI flows and components." }
    ]
  },
  {
    id: 4,
    slug: "eco-pack",
    title: "Eco‑Pack Rebrand",
    category: "packaging",
    year: 2023,
    tags: ["sustainability", "branding", "mockups"],
    summary: "Recyclable packaging system for a DTC brand.",
    cover: "media/eco-pack/cover.jpg",
    images: [
      { src: "media/eco-pack/01.jpg", alt: "Packaging lineup", caption: "Paper-based, mono-material family." },
      { src: "media/eco-pack/02.jpg", alt: "Die-line overview", caption: "Optimized dielines to reduce waste." }
    ]
  }
];
