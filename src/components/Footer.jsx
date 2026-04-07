export default function Footer() {
  return (
    <footer className="py-8 text-center bg-gray-100 dark:bg-gray-900 text-[var(--text)] transition-colors duration-500">
      <p className="text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-[var(--accent)] font-semibold">Corby Maniapao</span>.
        All rights reserved.
      </p>
    </footer>
  );
}