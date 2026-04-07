export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-h)]">Contact Me</h2>
      <div className="max-w-xl mx-auto">
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-[var(--text)] dark:text-white"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-[var(--text)] dark:text-white"
          />
          <textarea
            placeholder="Your Message"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-[var(--text)] dark:text-white"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}