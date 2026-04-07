import { Sun, Moon } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode, onLoginClick }) {
  return (
    <nav className="flex justify-between items-center px-8 py-4 sticky top-0 bg-white dark:bg-gray-900 shadow-md z-50 transition-colors duration-500">
      {/* Clicking the logo title 3 times opens admin login */}
      <h1
        className="text-xl font-bold text-[var(--accent)] cursor-pointer select-none"
        onDoubleClick={onLoginClick}
        title="Double-click to admin login"
      >
        Corby Maniapao
      </h1>
      <div className="flex items-center gap-6">
        <a href="#about"        className="hover:text-[var(--accent)] transition-colors">About</a>
        <a href="#skills"       className="hover:text-[var(--accent)] transition-colors">Skills</a>
        <a href="#projects"     className="hover:text-[var(--accent)] transition-colors">Projects</a>
        <a href="#certificates" className="hover:text-[var(--accent)] transition-colors">Certificates</a>
        <a href="#contact"      className="hover:text-[var(--accent)] transition-colors">Contact</a>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-1 rounded hover:text-[var(--accent)] transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </nav>
  );
}