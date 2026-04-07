export default function Resume() {
  return (
    <section id="resume" className="py-20 px-4 bg-[var(--bg-secondary)] transition-colors duration-500">
      <h2 className="text-3xl font-bold mb-6 text-[var(--text-h)]">Resume</h2>
      <p className="mb-6">Download my resume to see my experience and education.</p>
      <a
        href="/resume.pdf"
        download
        className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        Download Resume
      </a>
    </section>
  );
}