import { Sun, Moon } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode, onLoginClick }) {
  const links = [
    { href: "#about",        label: "About" },
    { href: "#skills",       label: "Skills" },
    { href: "#projects",     label: "Projects" },
    { href: "#certificates", label: "Certificates" },
    { href: "#contact",      label: "Contact" },
  ];

  return (
<nav className="fixed top-0 left-0 right-0 z-50 shadow-md transition-colors duration-500 w-full"
  style={{ backgroundColor: 'var(--nav-bg)', color: 'var(--nav-text)' }}>
  
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h onDoubleClick={onLoginClick} className="cursor-pointer">💻</h>

        {/* Links visible on all screen sizes */}
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white hover:text-[var(--accent)] transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}

          {/* Dark mode toggle */}
          <button
  onClick={() => setDarkMode(!darkMode)}
  className="p-1 text-white hover:text-[var(--accent)] transition-colors"
>
  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
</button>
        </div>
      </div>
    </nav>
  );
}