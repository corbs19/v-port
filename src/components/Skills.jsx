import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";

const STATIC_SKILLS = [
  {
    id: "s1",
    name: "Vercel",
    level: 85,
    color: "#000000",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vercel/vercel-original.svg",
    website: "https://vercel.com",
    description: "Platform for deploying and hosting modern web applications."
  },
  {
    id: "s2",
    name: "Supabase",
    level: 80,
    color: "#3ECF8E",
    website: "https://supabase.com",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/supabase/supabase-original.svg",
    description: "Open-source Firebase alternative with Postgres."
  },
  {
    id: "s3",
    name: "TypeScript",
    level: 85,
    color: "#3178C6",
    website: "https://www.typescriptlang.org",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    description: "Typed JavaScript that scales — safer, smarter code."
  },
  {
    id: "s4",
    name: "Tailwind CSS",
    level: 93,
    color: "#38BDF8",
    website: "https://tailwindcss.com",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
    description: "Utility-first CSS for building custom designs fast."
  },
  {
    id: "s5",
    name: "Git",
    level: 88,
    website: "https://git-scm.com",
    color: "#F05032",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
    description: "Distributed version control for teams."
  },
  {
    id: "s7",
    name: "React",
    level: 94,
    color: "#61DAFB",
    website: "https://react.dev",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    description: "Component-based library for building fast UIs."
  },
  {
    id: "s8",
    name: "Node.js",
    level: 82,
    color: "#68A063",
    website: "https://nodejs.org",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
    description: "Server-side JS runtime built on Chrome's V8."
  },
  {
    id: "s9",
    name: "Vite",
    level: 93,
    color: "#BD34FE",
    website: "https://vitejs.dev",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg",
    description: "Next-gen frontend build tool — blazing fast."
  },
  {
    id: "s10",
    name: "VS Code",
    level: 95,
    color: "#007ACC",
    website: "https://code.visualstudio.com",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg",
    description: "Powerful code editor by Microsoft for fast development."
  }
];

function RingProgress({ level, color, size = 100, stroke = 7, icon }) {
  const [animated, setAnimated] = useState(0);
  const ref = useRef(null);

  const r      = (size - stroke) / 2;
  const circ   = 2 * Math.PI * r;
  const offset = circ - (animated / 100) * circ;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = null;
          const step = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / 900, 1);
            setAnimated(Math.round(p * level));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg
        width={size} height={size}
        style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
      >
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color + "22"} strokeWidth={stroke} />
        <circle
          cx={size/2} cy={size/2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color}99)` }}
        />
      </svg>
      <div style={{
        position:       "absolute",
        inset:          stroke + 4,
        borderRadius:   "50%",
        background:     `radial-gradient(circle at 38% 38%, ${color}28, ${color}0a)`,
        border:         `1px solid ${color}30`,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "1px",
      }}>
        <img
          src={icon}
          alt="skill"
          onError={(e) => { e.target.src = "https://via.placeholder.com/30"; }}
          style={{ width: "28px", height: "28px", objectFit: "contain" }}
        />
        <span style={{ fontSize: "11px", fontWeight: 700, color, lineHeight: 1 }}>
          {animated}%
        </span>
      </div>
    </div>
  );
}

function SkillCard({ skill }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a href={skill.website} target="_blank" rel="noopener noreferrer"
       style={{ textDecoration: "none", color: "inherit" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           "10px",
          padding:       "16px 12px",
          borderRadius:  "14px",
          background:    hovered ? `${skill.color}10` : "rgba(255,255,255,0.02)",
          border:        `1px solid ${hovered ? skill.color : "rgba(255,255,255,0.08)"}`,
          transition:    "0.3s",
          transform:     hovered ? "translateY(-5px)" : "none",
          cursor:        "pointer",
          height:        "100%",
          boxSizing:     "border-box",
        }}
      >
        <RingProgress level={skill.level} color={skill.color} icon={skill.icon} />
        <p style={{ fontWeight: 600, margin: 0, fontSize: "13px", textAlign: "center" }}>
          {skill.name}
        </p>
        <p style={{ fontSize: "11px", opacity: 0.6, textAlign: "center", margin: 0, lineHeight: 1.5 }}>
          {skill.description}
        </p>
      </div>
    </a>
  );
}

export default function Skills() {
  const [skills,  setSkills]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      const { data, error } = await supabase.from("skills").select("*");
      let enriched;
      if (error || !data || data.length === 0) {
        enriched = STATIC_SKILLS;
      } else {
        const dbMap = Object.fromEntries(data.map(d => [d.id, d]));
        enriched = STATIC_SKILLS.map(s => ({
          ...s,
          ...(dbMap[s.id] ? {
            level: dbMap[s.id].level ?? s.level,
            color: dbMap[s.id].color ?? s.color,
            icon:  dbMap[s.id].icon  ?? s.icon,
          } : {}),
        }));
      }
      setSkills(enriched);
      setLoading(false);
    }
    fetchSkills();
  }, []);

  return (
    <>
      <style>{`
        #skills-section {
          background: var(--bg, #0f0d0b);
          min-height: 100vh;
        }

        #skills-inner {
          display: flex;
          align-items: flex-start;
          min-height: 100vh;
        }

        /* ── Sticky left panel ── */
        #skills-panel {
          flex-shrink: 0;
          width: 500px;
          min-width: 500px;
          padding: 80px 32px 80px 48px;
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
          /* soft right border to visually separate panel from grid */
          border-right: 1px solid rgba(200,149,108,0.08);
        }

        /* ── Right scrollable grid ── */
        #skills-grid-wrap {
          flex: 1;
          min-width: 0;          /* KEY: prevents flex child from overflowing */
          padding: 80px 40px;
          box-sizing: border-box;
          overflow: hidden;
        }

        #skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* ── Tablet (≤1024px): stack vertically ── */
        @media (max-width: 1024px) {
          #skills-inner {
            flex-direction: column;
            min-height: unset;
          }
          #skills-panel {
            position: relative;
            width: 100%;
            min-width: unset;
            height: auto;
            padding: 60px 24px 32px;
            border-right: none;
            border-bottom: 1px solid rgba(200,149,108,0.08);
            align-items: center;
            text-align: center;
          }
          #skills-panel > p:last-of-type {
            max-width: 100% !important;
          }
          #skills-grid-wrap {
            padding: 40px 24px 60px;
            width: 100%;
          }
          #skills-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* ── Mobile (≤600px): 2 columns ── */
        @media (max-width: 600px) {
          #skills-panel {
            padding: 48px 20px 24px;
          }
          #skills-grid-wrap {
            padding: 32px 16px 48px;
          }
          #skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
      `}</style>

      <section id="skills-section">
        <div id="skills-inner">

          {/* ── Left panel ── */}
          <div id="skills-panel">
            <p style={{
              fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase",
              fontStyle: "italic", color: "var(--accent, #c8915a)", opacity: 0.75,
              margin: "0 0 10px",
            }}>
              What I work with
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(36px, 3vw, 56px)",
              fontWeight: 900, lineHeight: 0.92, textTransform: "uppercase",
              color: "var(--text-h, #f5f0e8)", margin: "0 0 22px",
            }}>
              Technologies<br />
              <span style={{ color: "var(--accent, #c8915a)" }}>& Tools</span>
            </h2>
            <div style={{
              width: "36px", height: "1px",
              background: "var(--accent, #c8915a)", opacity: 0.35,
              margin: "0 0 18px",
            }} />
            <p style={{
              fontSize: "13px", lineHeight: 1.8,
              color: "var(--text-muted, rgba(245,240,232,0.5))",
              maxWidth: "210px", margin: 0,
            }}>
              My expertise spans mobile, frontend, and backend — building clean,
              performant applications across the full stack.
            </p>
          </div>

          {/* ── Grid ── */}
          <div id="skills-grid-wrap">
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
                <p style={{
                  fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase",
                  color: "var(--text-muted, rgba(245,240,232,0.4))",
                }}>
                  Loading…
                </p>
              </div>
            ) : (
              <div id="skills-grid">
                {skills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}