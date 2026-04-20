import { useEffect, useState } from "react";

const roles = ["Web Developer", "Frontend Developer", "Full Stack Developer"];

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
        /* Center both elements together */
        justifyContent: "center",
        /* Controlled gap between text and image */
        gap: "4rem", 
        boxSizing: "border-box",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* ── Left: Text Content ── */}
      <div className="hero-text-content" style={{ flex: "0 1 auto", minWidth: 0, zIndex: 10 }}>
        <p
          className="text-sm tracking-widest uppercase mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          Welcome to my portfolio
        </p>

        <h1
          className="text-xl md:text-4xl font-bold leading-tight mb-3 transition-colors duration-500"
          style={{ color: "var(--text-h)", fontFamily: "'VT323', monospace" }}
        >
          Hi, I'm{" "}
          <span style={{ color: "var(--accent)" }}>
            Vanise Corby D. Maniapao
          </span>
        </h1>

        <h2
          className="text-xl font-semibold mb-6 flex items-center gap-2 transition-colors duration-500 role-text"
          style={{ color: "var(--text)", textShadow: "none", fontFamily: "'Share Tech Mono', monospace" }}
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
            fontFamily: "'Share Tech Mono', monospace",
            maxWidth: "460px",
          }}
        >
          A motivated web developer focused on creating clean, modern, and
          interactive web experiences. I build responsive, visually appealing
          websites that prioritize usability and performance.
        </p>

        <div className="flex flex-wrap gap-4 btn-container">
          <a
            href="#contact"
            className="px-8 py-3 font-semibold text-sm transition-all duration-300"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              fontFamily: "'Share Tech Mono', monospace",
              clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            }}
          >
            Hire Me
          </a>

          <a
            href="#resume"
            className="px-8 py-3 font-semibold text-sm transition-all duration-300"
            style={{
              border: "1px solid var(--accent)",
              color: "var(--text-h)",
              background: "var(--bg-secondary)",
              fontFamily: "'Share Tech Mono', monospace",
              clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            }}
          >
            My CV
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
              className="w-10 h-10 flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                border: "1px solid var(--accent)",
                color: "var(--text-h)",
                fontFamily: "'Share Tech Mono', monospace",
                clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
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
          
          {/* Coord labels */}
          <span style={{ position: "absolute", top: "-1.6rem", left: 0, fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "'Share Tech Mono', monospace" }}>
            [0.00, 0.00]
          </span>
          <span style={{ position: "absolute", top: "-1.6rem", right: 0, fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "'Share Tech Mono', monospace" }}>
            [1.00, 0.00]
          </span>

          {/* Corner brackets */}
          <span style={{ position: "absolute", top: 0, left: 0, width: "28px", height: "28px", borderTop: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", zIndex: 2 }} />
          <span style={{ position: "absolute", top: 0, right: 0, width: "28px", height: "28px", borderTop: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", zIndex: 2 }} />
          <span style={{ position: "absolute", bottom: 0, left: 0, width: "28px", height: "28px", borderBottom: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", zIndex: 2 }} />
          <span style={{ position: "absolute", bottom: 0, right: 0, width: "28px", height: "28px", borderBottom: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", zIndex: 2 }} />

          {/* Scan sweep line */}
          <span style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "2px", background: "var(--accent)", opacity: 0.6, zIndex: 3, animation: "scanSweep 3s linear infinite" }} />

          {/* Profile image */}
          <img
            src="/corby.jpg"
            alt="vcdm"
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              objectPosition: "top", 
              display: "block", 
              filter: "contrast(1.05) brightness(0.97)", 
              clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" 
            }}
          />

          {/* Status label */}
          <span style={{ position: "absolute", bottom: "-1.8rem", left: 0, fontSize: "0.75rem", color: "var(--accent)", fontFamily: "'Share Tech Mono', monospace", opacity: 0.8 }}>
            // SUBJECT_IDENTIFIED ■
          </span>
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
          /* Slightly smaller image for mobile to ensure fit */
          .hero-image-wrapper div { 
            width: 280px !important; 
            height: 320px !important; 
          }
        }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes scanSweep {
          0% { top: 0%; opacity: 0.6; }
          48% { opacity: 0.6; }
          50% { top: 100%; opacity: 0; }
          51% { top: 0%; opacity: 0; }
          52% { opacity: 0.6; }
          100% { top: 100%; opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}