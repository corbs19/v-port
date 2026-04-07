import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Restore admin session on page refresh
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setAdmin(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdmin(!!session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen transition-colors duration-500 bg-[var(--bg)] text-[var(--text)]">

        {/* Admin Login Modal */}
        {showLoginModal && !isAdmin && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[100] px-4">
            <div className="relative">
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute -top-10 right-0 text-white hover:text-[var(--accent)] text-sm"
              >
                ✕ Close
              </button>
              <AdminLogin
                setAdmin={setAdmin}
                onClose={() => setShowLoginModal(false)}
              />
            </div>
          </div>
        )}

        {/* Admin Dashboard (full screen overlay) */}
        {isAdmin && (
          <div className="fixed inset-0 z-[200] overflow-auto">
            <AdminDashboard setAdmin={setAdmin} />
          </div>
        )}

        {/* Public Portfolio */}
        <div className={isAdmin ? "invisible" : "pt-16"}>
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onLoginClick={() => setShowLoginModal(true)}
          />
          <Hero />
          <Skills />
          <Projects />
          <Certificates />
          <Resume />
          <Contact />
          <Footer />
        </div>

      </div>
    </div>
  );
}

export default App;