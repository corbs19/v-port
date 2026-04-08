import { Sun, Moon } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode, onLoginClick }) {
  const links = [
    { href: "#about",        label: "About" },
    { href: "#certificates", label: "Certificates" },
    { href: "#skills",       label: "Skills" },
    { href: "#projects",     label: "Projects" },
    { href: "#contact",      label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-500"
      style={{
        // Swaps between dark espresso glass and light cream glass
        background: darkMode 
          ? "rgba(10, 5, 2, 0.55)" 
          : "rgba(245, 237, 224, 0.55)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(200,149,108,0.1)",
      }}
    >
      <div className="flex justify-between items-center px-8 md:px-12 py-4">
        {/* Logo */}
        <span
    onDoubleClick={onLoginClick}
    className="cursor-pointer text-sm" // Changed from text-xl to text-sm
    style={{
    color: "var(--glow-color)",
    textShadow: "0 0 5px var(--glow-color)", // Reduced shadow from 10px to 5px
    fontWeight: 700,
    letterSpacing: "0.1em",
   }}
    >
      💻
    </span>

        {/* Links */}
        <div className="flex items-center gap-6 md:gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm transition-colors duration-200 hover:text-[var(--accent)]"
              // Uses the variable we defined in index.css
              style={{ color: "var(--nav-text)" }}
            >
              {link.label}
            </a>
          ))}

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1 transition-colors hover:scale-110 active:scale-95"
            style={{ color: "var(--nav-text)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--nav-text)"}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}