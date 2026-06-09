export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: { heading: string; paragraphs: string[] }[];
};

export const posts: BlogPost[] = [
  {
    slug: "complete-guide-guangzhou-wholesale-markets",
    title: "The Complete Guide to Guangzhou Wholesale Markets in 2025",
    excerpt:
      "Everything you need to know before your first buying trip to Guangzhou — from which markets to visit to how to negotiate prices like a pro.",
    category: "Market Guide",
    date: "January 15, 2025",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800",
    content: [
      {
        heading: "Why Guangzhou?",
        paragraphs: [
          "Guangzhou is the beating heart of China's wholesale trade. With over 100,000 suppliers spread across hundreds of specialized markets, no other city offers the same depth and breadth of product sourcing under one roof. From electronics to fashion, furniture to cosmetics, if it's manufactured in China, you can source it here.",
          "For first-time buyers, the sheer scale can be overwhelming. That's exactly why a structured, guided approach saves you time, money, and stress on your very first trip.",
        ],
      },
      {
        heading: "Which Markets Should You Visit?",
        paragraphs: [
          "Your itinerary should be driven by your product category. Electronics buyers head to Huaqiangbei, fashion retailers to Shahe and Zhanxi, and home goods importers to the Lecong furniture cluster. Trying to cover everything in one trip is a common rookie mistake — focus pays off.",
          "A good guide will map your days around your buying goals so you never waste an afternoon in the wrong district.",
        ],
      },
      {
        heading: "Negotiating Like a Pro",
        paragraphs: [
          "Prices in Guangzhou are almost always negotiable, especially as order quantities increase. Build rapport, ask about MOQs (minimum order quantities), and never accept the first price. Having a Mandarin-speaking guide negotiate on your behalf typically pays for itself many times over.",
        ],
      },
    ],
  },
  {
    slug: "china-visa-guide-bangladesh",
    title: "How to Get a Chinese Business Visa from Bangladesh",
    excerpt:
      "Step-by-step guide to applying for a Chinese visa from Bangladesh, including required documents and tips to get approved quickly.",
    category: "Visa Guide",
    date: "February 3, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800",
    content: [
      {
        heading: "Understanding the Business Visa (M Visa)",
        paragraphs: [
          "For sourcing trips, the M visa (commercial and trade) is usually the most appropriate category for Bangladeshi passport holders. It's designed specifically for buyers attending trade fairs and visiting wholesale markets.",
          "Processing times vary, so always apply well ahead of your planned travel dates.",
        ],
      },
      {
        heading: "Documents You'll Need",
        paragraphs: [
          "Typical requirements include a passport valid for at least six months, a completed application form, a recent passport photo, proof of travel and accommodation, and an invitation letter or supporting documents from a Chinese business partner.",
          "Our team helps you prepare and organize these documents so your application is clean and complete the first time around.",
        ],
      },
      {
        heading: "Tips for a Smooth Approval",
        paragraphs: [
          "Be consistent across your documents, show clear evidence of your business activity, and demonstrate strong ties to Bangladesh. Incomplete or inconsistent applications are the most common cause of delays.",
        ],
      },
    ],
  },
  {
    slug: "guangzhou-canton-fair-guide",
    title: "Canton Fair 2025: Everything Buyers Need to Know",
    excerpt:
      "The Canton Fair is the world's largest trade fair. Here's how to register, what to expect, and how to make the most of your time there.",
    category: "Events",
    date: "March 10, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    content: [
      {
        heading: "What Is the Canton Fair?",
        paragraphs: [
          "Officially the China Import and Export Fair, the Canton Fair is held twice a year in Guangzhou (April and October). It's the largest trade fair in the world, bringing together tens of thousands of manufacturers and buyers from across the globe.",
          "It runs in three phases, each focused on different product categories, so timing your visit to your industry is essential.",
        ],
      },
      {
        heading: "How to Register",
        paragraphs: [
          "Buyers register online in advance or on-site at the Canton Fair Complex. Pre-registration saves significant time and gets you a buyer badge that grants entry across all phases.",
          "Bring your passport and business cards — lots of them. Suppliers expect them.",
        ],
      },
      {
        heading: "Making the Most of Your Visit",
        paragraphs: [
          "The fair is enormous, so plan your booth visits in advance using the online exhibitor directory. Combine your Canton Fair days with wholesale market visits to compare prices and lock in the best deals before committing to large orders.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
