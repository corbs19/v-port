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
      className="relative flex flex-col items-start justify-center px-12 md:px-24"
      style={{
        minHeight: "100vh",
        background: "transparent",
        scrollMarginTop: "70px",
      }}
    >
      <div className="max-w-xl z-10">
        <p className="text-sm tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>
          Welcome to my portfolio
        </p>

        <h1
          className="text-5xl md:text-6xl font-bold leading-tight mb-3 transition-colors duration-500"
          style={{ color: "var(--text-h)" }} // Swapped from #ffffff
        >
          Hi, I'm{" "}
          <span style={{ color: "var(--accent)" }}>
            Vanise Corby
          </span>
        </h1>

        <h2
          className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-2 transition-colors duration-500"
          style={{ color: "var(--text)", textShadow: "none" }}
        >
          {displayed}
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1.2em",
              background: "var(--glow-color)",
              animation: "blink 0.8s step-end infinite",
              verticalAlign: "middle",
            }}
          />
        </h2>

        <p
          className="leading-7 mb-10 text-sm md:text-base max-w-md transition-colors duration-500"
          style={{ color: "var(--text-muted)" }} // Swapped from #1a0f00
        >
          A motivated web developer focused on creating clean, modern, and
          interactive web experiences. I build responsive, visually appealing
          websites that prioritize usability and performance.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#contact"
            className="px-7 py-3 rounded-md font-semibold text-sm transition-all duration-300"
            style={{
              background: "var(--accent)",
              color: "var(--bg)", // Text inside button uses the background color for contrast
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 30px var(--glow-color)"}
          >
            Hire Me
          </a>
          
          <a
  href="#resume" // This tells the browser to look for id="resume"
  className="px-7 py-3 rounded-md font-semibold text-sm transition-all duration-300"
  style={{
    border: "1px solid var(--accent)",
    color: "var(--text-h)",
    background: "var(--bg-secondary)",
  }}
  onMouseEnter={e => {
    e.currentTarget.style.background = "var(--accent)";
    e.currentTarget.style.color = "var(--bg)"; // Swaps text color for contrast
  }}
  onMouseLeave={e => {
    e.currentTarget.style.background = "var(--bg-secondary)";
    e.currentTarget.style.color = "var(--text-h)";
  }}
>
  My CV
</a>
        </div>

        <div className="flex gap-4 mt-10">
          {[
            { label: "GH", href: "#" },
            { label: "IG", href: "#" },
            { label: "LI", href: "#" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                border: "1px solid var(--accent)",
                color: "var(--text-h)", // Swapped from #fff
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.color = "var(--bg)";
                e.currentTarget.style.boxShadow = "0 0 12px var(--glow-color)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text-h)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}