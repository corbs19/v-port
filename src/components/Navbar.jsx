import { useState } from "react";
import { Sun, Moon, X, Menu } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode, onLoginClick }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    { href: "#about",        label: "About" },
    { href: "#certificates", label: "Certificates" },
    { href: "#skills",       label: "Skills" },
    { href: "#projects",     label: "Projects" },
    { href: "#contact",      label: "Contact" },
  ];

  return (
    <>
      <style>{`
        #desktop-nav { display: flex; }
        #mobile-hamburger { display: none; }

        @media (max-width: 768px) {
          #desktop-nav { display: none; }
          #mobile-hamburger { display: flex; }
        }

        #mobile-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 240px;
          z-index: 200;
          display: flex;
          flex-direction: column;
          padding: 28px 24px;
          box-sizing: border-box;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }
        #mobile-sidebar.open   { transform: translateX(0); }
        #mobile-sidebar.closed { transform: translateX(100%); }

        #sidebar-backdrop {
          position: fixed;
          inset: 0;
          z-index: 199;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(3px);
          transition: opacity 0.3s ease;
        }
        #sidebar-backdrop.open   { opacity: 1; pointer-events: all; }
        #sidebar-backdrop.closed { opacity: 0; pointer-events: none; }

        .sidebar-link {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-decoration: none;
          color: var(--text-h, #f5f0e8);
          padding: 12px 0;
          border-bottom: 1px solid rgba(200,149,108,0.1);
          transition: color 0.2s, padding-left 0.2s;
          display: block;
        }
        .sidebar-link:hover {
          color: var(--accent, #c8915a);
          padding-left: 6px;
        }
      `}</style>

      {/* ── NAV SHELL ── */}
      <nav
        className="fixed top-0 left-0 right-0 w-full transition-colors duration-500"
        style={{
          zIndex: 100,
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
            className="cursor-pointer text-sm"
            style={{
              color: "var(--glow-color)",
              textShadow: "0 0 5px var(--glow-color)",
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            💻
          </span>

          {/* ── DESKTOP ── */}
          <div
            id="desktop-nav"
            style={{ alignItems: "center", gap: "32px" }}
          >
            {links.map((link) => (
              
              <a  key={link.label}
                href={link.href}
                style={{
                  fontSize: "14px",
                  color: "var(--nav-text)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: 101,
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--nav-text)"}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                color: "var(--nav-text)",
                padding: "4px",
                cursor: "pointer",
                background: "none",
                border: "none",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--nav-text)"}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* ── MOBILE: hamburger only ── */}
          <div id="mobile-hamburger" style={{ alignItems: "center" }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                color: "var(--nav-text)",
                background: "none",
                border: "none",
                padding: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </nav>

      {/* ── BACKDROP ── */}
      <div
        id="sidebar-backdrop"
        className={sidebarOpen ? "open" : "closed"}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── SIDEBAR ── */}
      <div
        id="mobile-sidebar"
        className={sidebarOpen ? "open" : "closed"}
        style={{
          background: darkMode
            ? "rgba(10, 5, 2, 0.97)"
            : "rgba(245, 237, 224, 0.97)",
          backdropFilter: "blur(16px)",
          borderLeft: "1px solid rgba(200,149,108,0.15)",
        }}
      >
        {/* Header row: label + close */}
        <div className="flex justify-between items-center mb-8">
          <span
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--accent, #c8915a)",
              opacity: 0.7,
            }}
          >
            Menu
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              color: "var(--nav-text)",
              background: "none",
              border: "none",
              padding: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {links.map((link) => (
            
            <a  key={link.label}
              href={link.href}
              className="sidebar-link"
              onClick={() => setSidebarOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Dark mode toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "24px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(200,149,108,0.15)",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--text-muted, rgba(245,240,232,0.5))",
            }}
          >
            {darkMode ? "Dark mode" : "Light mode"}
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "8px",
              borderRadius: "8px",
              background: "rgba(200,149,108,0.1)",
              color: "var(--accent, #c8915a)",
              border: "1px solid rgba(200,149,108,0.2)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Bottom accent */}
        <div style={{ marginTop: "auto", paddingTop: "32px" }}>
          <div
            style={{
              width: "32px",
              height: "1px",
              background: "var(--accent, #c8915a)",
              opacity: 0.4,
              marginBottom: "12px",
            }}
          />
          <p
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--accent, #c8915a)",
              opacity: 0.5,
              margin: 0,
            }}
          >
            Portfolio
          </p>
        </div>
      </div>
    </>
  );
}