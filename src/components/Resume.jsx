import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Resume() {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the public URL of resume.pdf from the "resume" bucket
    const { data } = supabase.storage.from("resume").getPublicUrl("resume.pdf");

    // Verify the file actually exists before showing the button
    fetch(data.publicUrl, { method: "HEAD" })
      .then((res) => {
        if (res.ok) setResumeUrl(data.publicUrl);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="resume"
      className="py-20 px-4 transition-colors duration-500, text-center"
      style={{ background: "var(--bg)", scrollMarginTop: "70px" }}
    >
      <h2 style={{
        
              fontFamily: "'Cormorant Garamond', Georgia,serif",
              fontSize: "clamp(36px, 3vw, 56px)",
              fontWeight: 900, lineHeight: 0.92, textTransform: "uppercase",
              color: "var(--text-h, #f5f0e8)", margin: "0 0 22px",
            }}>
              Resume<br />
            </h2>
     

      {/* Accent line */}
      <div
        className="w-16 h-1 rounded-full mx-auto mb-10"
        style={{ background: "var(--accent)", marginTop: "4px" }}
      />

      <p
        className="mb-10 max-w-md mx-auto leading-relaxed"
        style={{ color: "var(--text-muted)", fontSize: "21px" }}
      >
        Download my resume to see my full experience, education, and skills.
      </p>

      {/* Button — only shown when resume exists in Supabase */}
      {loading ? (
        <div
          className="inline-block px-8 py-3 rounded-lg font-semibold opacity-40"
          style={{ background: "var(--accent)", color: "var(--bg)" }}
        >
          Loading…
        </div>
      ) : resumeUrl ? (
        <a
          href={resumeUrl}
          download="Resume.pdf"
          className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
          style={{
            background: "var(--accent)",
            color: "var(--bg)",
            boxShadow: "0 0 15px var(--glow-color)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 25px var(--glow-color)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 15px";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Download Resume
        </a>
      ) : (
        // Fallback: no resume uploaded yet
        <p className="text-sm italic" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
          Resume not available yet.
        </p>
      )}
    </section>
  );
}