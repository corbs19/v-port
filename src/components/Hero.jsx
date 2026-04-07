export default function Hero() {
  return (
    <section id="about" className="flex flex-col items-center justify-center text-center py-20 px-4">
      <h1 className="text-5xl font-bold mb-4 text-[var(--text-h)]">Hi, I'm Corby</h1>
      <p className="text-lg max-w-xl mb-6">
        I'm a passionate developer creating clean, modern, and interactive web experiences.
      </p>
      <a
        href="#projects"
        className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        See My Work
      </a>
    </section>
  );
}