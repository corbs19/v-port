export default function Resume() {
  return (
    <section
      id="resume"
      className="py-20 px-4 bg-[var(--bg)] transition-colors duration-500 text-center"
    >
      <h2 className="text-3xl font-bold mb-4 text-[var(--text-h)]">Resume</h2>
      <p className="mb-8 text-[var(--text)] max-w-md mx-auto">
        Download my resume to see my full experience, education, and skills.
      </p>
      <a
        href="/resume.pdf"
        download
        className="inline-block px-8 py-3 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Download Resume
      </a>
    </section>
  );
}