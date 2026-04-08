export default function Resume() {
  return (
    <section
      id="resume"
      className="py-20 px-4 transition-colors duration-500 text-center"
      style={{ background: "transparent" }} // Let the App.jsx handle the background
    >
      {/* Title - Clean & Tight */}
      <h2
        className="text-3xl md:text-4xl font-bold text-center mb-0" 
        style={{ 
          color: "var(--text-h)",
          lineHeight: "1.2" 
        }}
      >
        Resume
      </h2>

      {/* The Line - Perfectly placed */}
      <div
        className="w-16 h-1 rounded-full mx-auto mb-10"
        style={{ 
          background: "var(--accent)",
          marginTop: "4px" 
        }}
      />

      <p 
        className="mb-10 max-w-md mx-auto leading-relaxed" 
        style={{ color: "var(--text-muted)" }}
      >
        Download my resume to see my full experience, education, and skills.
      </p>

      {/* Button - Now uses your theme colors */}
      <a
        href="/resume.pdf"
        download
        className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
        style={{ 
          background: "var(--accent)", 
          color: "var(--bg)", // Text uses the cream/espresso background color for contrast
          boxShadow: "0 0 15px var(--glow-color)"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = "0 0 25px var(--glow-color)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = "0 0 15px var(--glow-color)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Download Resume
      </a>
    </section>
  );
}