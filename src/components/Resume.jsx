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
      className="py-20 px-4 text-center transition-colors duration-500"
      style={{ background: "var(--bg)", scrollMarginTop: "70px" }}
    >
      <h2
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          fontWeight: 500,
          color: "var(--text-h)",
          margin: "0 0 0.75rem",
        }}
      >
        Resume
      </h2>
      <div
        className="w-16 h-1 rounded-full mx-auto mb-10"
        style={{ background: "var(--accent)", marginTop: "4px" }}
      />

      <p
        className="mb-10 max-w-md mx-auto leading-relaxed"
        style={{
          color: "var(--text-muted)",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: "1rem",
        }}
      >
        Download my resume to see my full experience, education, and skills.
      </p>

      {/* Button — only shown when resume exists in Supabase */}
      {loading ? (
        <div
          className="inline-block px-8 py-3 rounded-md font-medium opacity-40"
          style={{
            background: "var(--text-h)",
            color: "var(--bg)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Loading…
        </div>
      ) : resumeUrl ? (
        <a
          href={resumeUrl}
          download="Resume.pdf"
          className="inline-block px-8 py-3 rounded-md font-medium transition-opacity duration-200"
          style={{
            background: "var(--text-h)",
            color: "var(--bg)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.85";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          maniapao.cv
        </a>
      ) : (
        // Fallback: no resume uploaded yet
        <p
          className="text-sm"
          style={{
            color: "var(--text-muted)",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontStyle: "italic",
          }}
        >
          Resume not available yet.
        </p>
      )}
    </section>
  );
}