import { useEffect, useState } from "react";

const roles = ["Web Developer", "Frontend Developer", "Data Encoder"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      id="about"
      className="hero-container"
      style={{
        minHeight: "100vh",
        background: "transparent",
        scrollMarginTop: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4rem",
        boxSizing: "border-box",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* ── Left: Text Content ── */}
      <div className="hero-text-content" style={{ flex: "0 1 auto", minWidth: 0, zIndex: 10 }}>
        <p
          className="text-sm mb-4"
          style={{ color: "var(--text-muted)", fontFamily: "'Inter', system-ui, sans-serif", letterSpacing: "0.02em" }}
        >
          Welcome to my portfolio
        </p>

        <h1
          className="text-3xl md:text-5xl leading-tight mb-3 transition-colors duration-500"
          style={{ color: "var(--text-h)", fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500 }}
        >
          Hi, I'm{" "}
          <span style={{ color: "var(--accent)" }}>
            Vanise Corby D. Maniapao
          </span>
        </h1>

        <h2
          className="text-xl font-medium mb-6 flex items-center gap-1 transition-colors duration-500 role-text"
          style={{ color: "var(--text)", fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {displayed}
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1.2em",
              background: "var(--accent)",
              animation: "blink 0.8s step-end infinite",
              verticalAlign: "middle",
            }}
          />
        </h2>

        <p
          className="hero-description leading-7 mb-10 text-sm md:text-base transition-colors duration-500"
          style={{
            color: "var(--text-muted)",
            fontFamily: "'Inter', system-ui, sans-serif",
            maxWidth: "460px",
          }}
        >
          I'm an IT graduate who enjoys building websites, working with data, and learning new technologies. I'm passionate about creating simple, user-friendly websites and delivering accurate, organized work.
        </p>

        <div className="flex flex-wrap gap-4 btn-container">
          <a
            href="#contact"
            className="px-8 py-3 font-medium text-sm rounded-md transition-all duration-300"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Hire Me
          </a>

          <a
            href="#resume"
            className="px-8 py-3 font-medium text-sm rounded-md transition-all duration-300"
            style={{
              border: "1px solid var(--border-color)",
              color: "var(--text-h)",
              background: "var(--bg-secondary)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            My Resume
          </a>
        </div>

        {/* ── Social Links ── */}
        <div className="flex gap-4 mt-10 social-container">
          {[
            { label: "FB", href: "https://www.facebook.com/share/1bWFLKZK7q/" },
            { label: "IG", href: "https://www.instagram.com/vmaniapa0?igsh=MXh0ZDV5bzZqZDlvZQ==" },
            { label: "TG", href: "https://t.me/vcorbs" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center text-xs font-medium rounded-md transition-all duration-300"
              style={{
                border: "1px solid var(--border-color)",
                color: "var(--text-h)",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Right: Profile Picture ── */}
      <div className="hero-image-wrapper" style={{ flex: "0 0 auto", zIndex: 10 }}>
        <div style={{ position: "relative", width: "320px", height: "360px" }}>
          <img
            src="/corby.jpg"
            alt="vcdm"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
            }}
          />
        </div>
      </div>

      <style>{`
        .hero-container { 
          flex-direction: row; 
          padding: 0 5%; 
        }

        @media (max-width: 1024px) {
          .hero-container {
            flex-direction: column-reverse;
            padding: 4rem 2rem;
            text-align: center;
            justify-content: center;
            gap: 3.5rem;
          }
          .hero-text-content { 
            align-items: center; 
          }
          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }
          .role-text, .btn-container, .social-container { 
            justify-content: center; 
          }
          .hero-image-wrapper div { 
            width: 280px !important; 
            height: 320px !important; 
          }
        }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </section>
  );
}