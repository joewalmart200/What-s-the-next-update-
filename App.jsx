import { useState, useEffect } from "react";

const leaks = [
  {
    id: 1,
    title: "New Map Found",
    subtitle: "A possible new map discovered...",
    tag: "MAP",
    tagColor: "#7fff6e",
    image: "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=600&q=80",
  },
  {
    id: 2,
    title: "New Cosmetic",
    subtitle: "This cosmetic might release...",
    tag: "COSMETIC",
    tagColor: "#ff6eb4",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
  },
  {
    id: 3,
    title: "Weapon Update",
    subtitle: "Major weapon rebalance incoming...",
    tag: "WEAPON",
    tagColor: "#6eb4ff",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
  },
  {
    id: 4,
    title: "New Character",
    subtitle: "Leaked operator files spotted...",
    tag: "CHARACTER",
    tagColor: "#ffd36e",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
  },
];

export default function App() {
  const [dark, setDark] = useState(true);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    leaks.forEach((_, i) => {
      setTimeout(() => setVisible((v) => [...v, i]), 100 + i * 120);
    });
  }, []);

  const t = dark
    ? {
        bg: "#0d0f14",
        card: "#13161e",
        cardBorder: "#1e2230",
        header: "#0a0c10",
        headerBorder: "#1a1d28",
        text: "#e8eaf0",
        muted: "#8890a4",
        scanline: "rgba(255,255,255,0.015)",
        glow: "rgba(100,120,255,0.08)",
      }
    : {
        bg: "#f0f2f7",
        card: "#ffffff",
        cardBorder: "#dde1ec",
        header: "#ffffff",
        headerBorder: "#dde1ec",
        text: "#1a1d28",
        muted: "#6b7280",
        scanline: "rgba(0,0,0,0.015)",
        glow: "rgba(100,120,255,0.04)",
      };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'Courier New', monospace", transition: "all 0.4s ease", position: "relative", overflow: "hidden" }}>
      {/* Scanline overlay */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: `repeating-linear-gradient(0deg, ${t.scanline} 0px, transparent 1px, transparent 3px)`, pointerEvents: "none", zIndex: 10 }} />

      {/* Ambient glow */}
      <div style={{ position: "fixed", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "80vw", height: "60vh", background: `radial-gradient(ellipse, ${t.glow} 0%, transparent 70%)`, pointerEvents: "none" }} />

      {/* Header */}
      <header style={{ background: t.header, borderBottom: `1px solid ${t.headerBorder}`, padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 20, backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7fff6e", boxShadow: "0 0 8px #7fff6e", animation: "pulse 2s infinite" }} />
          <span style={{ color: t.text, fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Game Update Leaks
          </span>
        </div>

        <button
          onClick={() => setDark((d) => !d)}
          style={{ background: "none", border: `1px solid ${t.cardBorder}`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 18, lineHeight: 1, transition: "all 0.3s ease", display: "flex", alignItems: "center", gap: 8 }}
        >
          <span style={{ display: "inline-block", transition: "transform 0.5s ease", transform: dark ? "rotate(0deg)" : "rotate(180deg)" }}>
            {dark ? "🌙" : "☀️"}
          </span>
          <span style={{ fontSize: 10, letterSpacing: "0.15em", color: t.muted, fontFamily: "inherit" }}>
            {dark ? "DARK" : "LIGHT"}
          </span>
        </button>
      </header>

      {/* Feed */}
      <main style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.2em", color: t.muted }}>LIVE FEED</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${t.cardBorder}, transparent)` }} />
          <span style={{ fontSize: 10, letterSpacing: "0.1em", color: t.muted }}>{leaks.length} LEAKS</span>
        </div>

        {leaks.map((leak, i) => (
          <div
            key={leak.id}
            style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 4, marginBottom: 2, overflow: "hidden", opacity: visible.includes(i) ? 1 : 0, transform: visible.includes(i) ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.4s ease, transform 0.4s ease, box-shadow 0.2s ease", cursor: "pointer", position: "relative" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 0 1px ${leak.tagColor}44, 0 8px 32px ${leak.tagColor}11`; e.currentTarget.style.borderColor = `${leak.tagColor}66`; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = t.cardBorder; }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: leak.tagColor, opacity: 0.8 }} />

            <div style={{ position: "relative", height: 180, overflow: "hidden", marginLeft: 3 }}>
              <img
                src={leak.image}
                alt={leak.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: dark ? "brightness(0.7) saturate(0.8)" : "brightness(0.9)", transition: "transform 0.4s ease" }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${t.card}dd)` }} />
              <div style={{ position: "absolute", top: 12, right: 12, background: `${leak.tagColor}22`, border: `1px solid ${leak.tagColor}88`, borderRadius: 2, padding: "3px 8px", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", color: leak.tagColor }}>
                {leak.tag}
              </div>
            </div>

            <div style={{ padding: "14px 16px 16px 19px" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.text, letterSpacing: "0.05em", marginBottom: 4 }}>{leak.title}</div>
              <div style={{ fontSize: 12, color: t.muted, letterSpacing: "0.03em" }}>
                <span style={{ color: leak.tagColor }}>new</span>{" "}{leak.subtitle.replace("new ", "")}
              </div>
            </div>
          </div>
        ))}
      </main>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
    </div>
  );
}
