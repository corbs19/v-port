export default function Hero() {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center text-center py-32 px-4 bg-[var(--bg)] transition-colors duration-500"
    >
      <h1 className="text-5xl font-bold mb-4 text-[var(--text-h)]">
        Hi, I'm <span className="text-[var(--accent)]">Corby</span>
      </h1>
      <p className="text-lg max-w-xl mb-8 text-[var(--text)]">
        I'm a passionate developer creating clean, modern, and interactive web experiences.
      </p>
      <div className="flex gap-4">
        <a
          href="#projects"
          className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          See My Work
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-[var(--accent)] text-[var(--accent)] rounded-lg hover:bg-[var(--accent)] hover:text-white transition-colors"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}