import { Sun, Moon } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="flex justify-between items-center px-8 py-4 sticky top-0 bg-white dark:bg-gray-900 shadow-md z-50 transition-colors duration-500">
      <h1 className="text-xl font-bold text-[var(--accent)]">My Portfolio</h1>
      <div className="flex items-center gap-4">
        <a href="#about" className="hover:text-[var(--accent)]">About</a>
        <a href="#skills" className="hover:text-[var(--accent)]">Skills</a>
        <a href="#projects" className="hover:text-[var(--accent)]">Projects</a>
        <a href="#contact" className="hover:text-[var(--accent)]">Contact</a>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </nav>
  );
}