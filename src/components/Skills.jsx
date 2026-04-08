import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";

// Each skill has its own fixed data — no merging with supabase indices
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
    website: "https://code.visualstudio.com",
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
  const isEmoji = /\p{Emoji}/u.test(icon);

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

      {/* Inner circle */}
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
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/30"; // fallback
  }}
  style={{
    width: "28px",
    height: "28px",
    objectFit: "contain"
  }}
/>
        <span style={{
          fontSize:   "11px",
          fontWeight: 700,
          color,
          lineHeight: 1,
          letterSpacing: "0px",
        }}>
          {animated}%
        </span>
      </div>
    </div>
  );
}

function SkillCard({ skill }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={skill.website}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          padding: "18px",
          borderRadius: "14px",
          background: hovered ? `${skill.color}10` : "rgba(255,255,255,0.02)",
          border: `1px solid ${hovered ? skill.color : "rgba(255,255,255,0.08)"}`,
          transition: "0.3s",
          transform: hovered ? "translateY(-5px)" : "none",
          cursor: "pointer"
        }}
      >
        <RingProgress level={skill.level} color={skill.color} icon={skill.icon} />

        <p style={{ fontWeight: "600", margin: 0 }}>{skill.name}</p>

        <p style={{ fontSize: "11px", opacity: 0.6, textAlign: "center" }}>
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

      // Always use STATIC_SKILLS as source of truth for name/description/color/icon/level
      // If supabase has matching id, only merge non-visual fields (e.g. future custom fields)
      let enriched;
      if (error || !data || data.length === 0) {
        enriched = STATIC_SKILLS;
      } else {
        // Map supabase rows by id, fall back to static if no match
        const dbMap = Object.fromEntries(data.map(d => [d.id, d]));
        enriched = STATIC_SKILLS.map(s => ({
          ...s,
          ...(dbMap[s.id] ? {
            // Only override if supabase has these fields explicitly set
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
    <section
      id="skills"
      style={{
        background: "var(--bg, #0f0d0b)",
        minHeight:  "100vh",
        display:    "flex",
        alignItems: "flex-start",
      }}
    >
      {/* ── Left sticky panel ── */}
      <div style={{
        flexShrink:     0,
        padding:        "80px 28px 80px 48px",
        position:       "sticky",
        top:            0,
        height:         "100vh",
        display:        "flex",
        flexDirection:  "column",
        justifyContent: "center",
      }}>
        <p style={{
          fontSize:      "10px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          fontStyle:     "italic",
          color:         "var(--accent, #c8915a)",
          opacity:       0.75,
          margin:        "0 0 10px",
        }}>
          What I work with
        </p>

        <h2 style={{
          fontFamily:    "'Cormorant Garamond', Georgia, serif",
          fontSize:      "clamp(40px, 3.5vw, 60px)",
          fontWeight:    900,
          lineHeight:    0.92,
          textTransform: "uppercase",
          color:         "var(--text-h, #f5f0e8)",
          margin:        "0 0 22px",
        }}>
          Technologies<br />
          <span style={{ color: "var(--accent, #c8915a)" }}>& Tools</span>
        </h2>

        <div style={{
          width:      "36px",
          height:     "1px",
          background: "var(--accent, #c8915a)",
          opacity:    0.35,
          margin:     "0 0 18px",
        }} />

        <p style={{
          fontSize:   "13px",
          lineHeight: 1.8,
          color:      "var(--text-muted, rgba(245,240,232,0.5))",
          maxWidth:   "190px",
          margin:     0,
        }}>
          My expertise spans mobile, frontend, and backend — building clean,
          performant applications across the full stack.
        </p>
      </div>

      {/* ── Right: 5-column grid ── */}
      <div style={{
        flex:      1,
        padding:   "100px 50px 100px 50px",
        overflowY: "auto",
      }}>
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
          <div style={{
            display:               "grid",
            gridTemplateColumns:   "repeat(3, 1fr)",   /* exactly 5 per row */
            gap:                   "16px",
          }}>
            {skills.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} index={i} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  );
}