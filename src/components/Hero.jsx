export default function Hero() {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center text-center py-24 px-6 bg-[var(--bg)] transition-colors duration-500 w-full"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--text-h)] leading-tight">
       <span className="text-blue3600">Vanise Corby D. Maniapao</span>
      </h1>
      <p className="max-w-[600px] text-center leading-7">
        I am a motivated web developer focused on creating clean, modern, and interactive web experiences.
        With a strong understanding of basic web technologies, I build responsive and visually appealing
        websites that prioritize usability and performance.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
      </div>
    </section>
  );
}