import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Hotel, Restaurant & AI Website Development",
  description:
    "Answers to the most common questions about hotel website development, restaurant booking systems, direct booking integration, and AI automation services by Quantapex.",
  openGraph: {
    title: "FAQ | Quantapex",
    description:
      "Get answers about hotel website development, restaurant online ordering systems, and AI automation services.",
    url: "https://quantapex.in/faq",
  },
};

const faqs = [
  {
    category: "Hotel & Resort Websites",
    color: "#00f0ff",
    items: [
      {
        q: "How much does it cost to build a hotel booking website in India?",
        a: "A professional hotel website with a direct booking engine typically costs between ₹50,000 to ₹3,00,000 depending on features like PMS integration, payment gateway, and multi-language support. Quantapex provides custom quotes based on your specific hotel size and requirements.",
      },
      {
        q: "What is the best way to increase direct bookings for a hotel?",
        a: "The most effective way is to build a fast, mobile-optimized website with a seamless booking engine that bypasses OTA commissions. Adding trust signals (reviews, SSL, HD photos), a clear CTA, and a loyalty program can increase direct bookings by 30–60%.",
      },
      {
        q: "How long does it take to build a resort website?",
        a: "A standard luxury resort website with booking integration takes 3–6 weeks. Complex projects with multi-property management, CRM integration, and custom design systems may take up to 10 weeks.",
      },
      {
        q: "Can you integrate my existing Property Management System (PMS) with the new website?",
        a: "Yes. Quantapex integrates with all major PMS platforms including Cloudbeds, Little Hotelier, Hotelogix, and custom systems via API to ensure real-time room availability and pricing on your website.",
      },
    ],
  },
  {
    category: "Restaurant & Food Business Websites",
    color: "#ffd700",
    items: [
      {
        q: "How to integrate an online ordering system for a restaurant website?",
        a: "We build a custom online ordering system directly into your restaurant website, allowing customers to place orders for delivery or pickup without using third-party apps like Swiggy or Zomato. This saves you 15–30% in commission fees.",
      },
      {
        q: "What features should a good restaurant website have in 2026?",
        a: "A high-converting restaurant website in 2026 must have: mobile-first design, online ordering and reservation system, digital menu with photos, Google Maps integration, fast loading (<2 seconds), and SEO-optimized content for local search.",
      },
      {
        q: "How do I build a website for a cloud kitchen?",
        a: "Cloud kitchen websites need a strong delivery-focused design, real-time order tracking, and multi-cuisine/brand support. Quantapex specializes in cloud kitchen website development with custom dashboards for managing multiple kitchen brands from a single platform.",
      },
    ],
  },
  {
    category: "AI & Generative AI Development",
    color: "#22c55e",
    items: [
      {
        q: "What is LLM integration and how can it help my business?",
        a: "LLM (Large Language Model) integration means adding AI models like GPT-4 or Gemini into your business workflows — for example, an AI chatbot for customer service, automated document processing, or an intelligent product recommendation engine.",
      },
      {
        q: "How much does it cost to build a custom AI automation solution?",
        a: "Custom AI automation projects typically start at ₹1,50,000 for simple chatbot integrations and scale up based on complexity. Enterprise LLM pipelines and data processing systems are quoted separately. Contact Quantapex for a detailed scoping session.",
      },
      {
        q: "Can Quantapex integrate ChatGPT API into my existing product?",
        a: "Yes. We specialize in ChatGPT API (OpenAI), Google Gemini API, and Anthropic Claude API integration into existing products. We handle prompt engineering, fine-tuning, RAG (Retrieval-Augmented Generation) pipelines, and cost optimization.",
      },
    ],
  },
  {
    category: "General Web Development",
    color: "#a855f7",
    items: [
      {
        q: "What is the best web development agency for hospitality businesses?",
        a: "Quantapex is a boutique agency with deep specialization in hospitality web development — hotels, resorts, restaurants, and cloud kitchens. Unlike generic agencies, we understand the specific conversion goals, OTA dynamics, and guest booking behavior of the hospitality industry.",
      },
      {
        q: "How long does it take to rank on Google after launching a new website?",
        a: "For new websites targeting long-tail, low-competition keywords (like 'hotel booking engine integration India'), you can expect rankings within 4–12 weeks. Broad competitive terms may take 3–6 months. We help accelerate this with technical SEO, schema markup, and content strategy.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div style={{ minHeight: "100vh", paddingBottom: "80px" }}>
      {/* JSON-LD FAQ Schema for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.flatMap((cat) =>
              cat.items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              }))
            ),
          }),
        }}
      />

      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "5rem 1rem 3rem",
          background:
            "radial-gradient(ellipse at top, rgba(168,85,247,0.08) 0%, transparent 70%)",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 800,
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #ffffff 0%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Frequently Asked Questions
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            maxWidth: "650px",
            margin: "0 auto",
          }}
        >
          Everything you want to know about building hotel websites, restaurant
          ordering systems, resort digital experiences, and AI-powered business
          automation with Quantapex.
        </p>
      </section>

      {/* FAQ Sections */}
      <section
        className="container"
        style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1rem" }}
      >
        {faqs.map((cat, ci) => (
          <div key={ci} style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
                color: cat.color,
                borderBottom: `1px solid ${cat.color}33`,
                paddingBottom: "0.75rem",
              }}
            >
              {cat.category}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {cat.items.map((item, ii) => (
                <details
                  key={ii}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "0",
                    overflow: "hidden",
                  }}
                >
                  <summary
                    style={{
                      padding: "1.25rem 1.5rem",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "#fff",
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    {item.q}
                    <span style={{ color: cat.color, flexShrink: 0, fontSize: "1.2rem" }}>
                      ＋
                    </span>
                  </summary>
                  <div
                    style={{
                      padding: "0 1.5rem 1.25rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.75,
                      fontSize: "0.95rem",
                      borderTop: `1px solid rgba(255,255,255,0.06)`,
                    }}
                  >
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center", padding: "2rem 1rem" }}>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
          Have a question not listed here?
        </p>
        <a
          href="mailto:hello@quantapex.in"
          style={{
            padding: "14px 32px",
            background: "linear-gradient(135deg, #a855f722, #6366f122)",
            border: "1px solid #a855f766",
            borderRadius: "100px",
            color: "#a855f7",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "0.95rem",
          }}
        >
          Contact Us →
        </a>
      </section>
    </div>
  );
}
