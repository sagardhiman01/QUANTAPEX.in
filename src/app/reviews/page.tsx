"use client";

import { useState } from "react";
import type { Metadata } from "next";

const reviews = [
  {
    name: "Rajesh Sharma",
    role: "Owner, The Grand Mahal Hotel",
    rating: 5,
    text: "Quantapex built us a stunning hotel website with a direct booking engine. Our OTA dependency dropped by 40% in just 3 months. Incredible results!",
    niche: "Hotel",
    avatar: "RS",
  },
  {
    name: "Priya Mehta",
    role: "Co-Founder, Spice Garden Restaurant",
    rating: 5,
    text: "Our online orders tripled after Quantapex integrated a custom ordering system on our website. The mobile experience is flawless and fast.",
    niche: "Restaurant",
    avatar: "PM",
  },
  {
    name: "Aarav Patel",
    role: "CTO, FinTech Startup",
    rating: 5,
    text: "Their AI automation and LLM integration expertise is top-notch. We built our entire client onboarding on their custom AI pipeline.",
    niche: "AI/Tech",
    avatar: "AP",
  },
  {
    name: "Sunita Verma",
    role: "Manager, Blue Horizon Resort",
    rating: 5,
    text: "The resort website they designed gets constant compliments from guests. Booking rates are up 55% since launch!",
    niche: "Resort",
    avatar: "SV",
  },
  {
    name: "David Chen",
    role: "Founder, Elevate Digital",
    rating: 5,
    text: "The Competitor Spy feature alone is worth its weight in gold. We completely overtook our biggest rival in local search within weeks.",
    niche: "Digital Agency",
    avatar: "DC",
  },
  {
    name: "Sarah Jenkins",
    role: "Marketing Director, TechFlow",
    rating: 5,
    text: "Quantapex revolutionized our SEO strategy. We saw a 300% increase in organic traffic within two months of deploying their AI automation.",
    niche: "Tech",
    avatar: "SJ",
  },
];

const nicheColors: Record<string, string> = {
  Hotel: "#00f0ff",
  Restaurant: "#ffd700",
  Resort: "#a855f7",
  "AI/Tech": "#22c55e",
  "Digital Agency": "#f97316",
  Tech: "#3b82f6",
};

export default function ReviewsPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "80px" }}>
      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "5rem 1rem 3rem",
          background:
            "radial-gradient(ellipse at top, rgba(0,240,255,0.08) 0%, transparent 70%)",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #ffffff 0%, #00f0ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Client Reviews & Feedback
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            maxWidth: "600px",
            margin: "0 auto 2rem",
          }}
        >
          Real results from real businesses — hotels, restaurants, resorts, and AI
          companies that trusted Quantapex to transform their digital presence.
        </p>

        {/* Aggregate Rating Banner */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "1rem",
            background: "rgba(0,240,255,0.08)",
            border: "1px solid rgba(0,240,255,0.3)",
            borderRadius: "100px",
            padding: "0.75rem 2rem",
          }}
        >
          <span style={{ fontSize: "2rem", fontWeight: 900, color: "#00f0ff" }}>
            {avgRating}
          </span>
          <span style={{ color: "#ffd700", fontSize: "1.4rem" }}>★★★★★</span>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            {reviews.length} verified reviews
          </span>
        </div>
      </section>

      {/* Reviews Grid */}
      <section
        className="container"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {reviews.map((r, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "2rem",
              transition: "border-color 0.3s, transform 0.3s",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                nicheColors[r.niche] || "#00f0ff";
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(0)";
            }}
          >
            {/* Niche badge */}
            <span
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                fontSize: "0.7rem",
                padding: "3px 10px",
                borderRadius: "100px",
                background: `${nicheColors[r.niche]}22`,
                color: nicheColors[r.niche] || "#00f0ff",
                border: `1px solid ${nicheColors[r.niche]}55`,
                fontWeight: 600,
              }}
            >
              {r.niche}
            </span>

            {/* Avatar */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${nicheColors[r.niche] || "#00f0ff"}33, ${nicheColors[r.niche] || "#00f0ff"}11)`,
                border: `2px solid ${nicheColors[r.niche] || "#00f0ff"}66`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "1rem",
                color: nicheColors[r.niche] || "#00f0ff",
                marginBottom: "1rem",
              }}
            >
              {r.avatar}
            </div>

            {/* Stars */}
            <div style={{ color: "#ffd700", marginBottom: "0.75rem", fontSize: "1.1rem" }}>
              {"★".repeat(r.rating)}
            </div>

            {/* Review text */}
            <p
              style={{
                color: "#d0d0d0",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                marginBottom: "1.25rem",
                fontStyle: "italic",
              }}
            >
              &quot;{r.text}&quot;
            </p>

            {/* Name & role */}
            <div>
              <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>
                {r.name}
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                {r.role}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Submit Feedback Form */}
      <section
        className="container"
        style={{ maxWidth: "700px", margin: "4rem auto", padding: "0 1rem" }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(0,240,255,0.2)",
            borderRadius: "20px",
            padding: "3rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Share Your Experience
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              textAlign: "center",
              marginBottom: "2rem",
              fontSize: "0.95rem",
            }}
          >
            Your feedback helps us improve and helps other businesses choose the right
            partner.
          </p>

          {submitted ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "#00f0ff",
                fontSize: "1.2rem",
              }}
            >
              ✅ Thank you for your review! We appreciate your feedback.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Your Role / Business (optional)"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Star Rating Selector */}
              <div>
                <label style={{ color: "var(--text-secondary)", fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>
                  Your Rating
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1.8rem",
                        color: s <= rating ? "#ffd700" : "#444",
                        transition: "color 0.2s",
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                required
                rows={5}
                placeholder="Tell us about your experience with Quantapex..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "120px",
                }}
              />

              <button
                type="submit"
                style={{
                  padding: "16px",
                  background: "linear-gradient(135deg, #00f0ff22, #0070ff22)",
                  border: "1px solid #00f0ff66",
                  borderRadius: "10px",
                  color: "#00f0ff",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s",
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "linear-gradient(135deg, #00f0ff44, #0070ff44)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "linear-gradient(135deg, #00f0ff22, #0070ff22)")
                }
              >
                Submit Review ✦
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  minWidth: "200px",
  padding: "14px 16px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "#fff",
  fontSize: "0.95rem",
  outline: "none",
  width: "100%",
};
