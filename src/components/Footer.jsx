export default function Footer() {
  return (
    <footer className="py-6 text-center bg-gray-100 dark:bg-gray-900 text-[var(--text)] dark:text-white transition-colors duration-500">
      <p>© {new Date().getFullYear()} Corby Maniapao. All rights reserved.</p>
    </footer>
  );
}