import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { supabase } from "./lib/supabaseClient";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import AllCertificates from "./components/AllCertificates"; // Adjusted path based on your error log
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ParticleBackground from "./components/Particlebackground";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setAdmin(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdmin(!!session);
    });
    return () => {
      if (listener?.subscription) listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className={darkMode ? "dark" : ""}>
        <div className="relative min-h-screen transition-colors duration-500 bg-[var(--bg)] text-[var(--text)]">
          <ParticleBackground />
          <div className="relative" style={{ zIndex: 1 }}>
            
            {showLoginModal && !isAdmin && (
              <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[100] px-4">
                <AdminLogin setAdmin={setAdmin} onClose={() => setShowLoginModal(false)} />
              </div>
            )}

            {isAdmin && (
              <div className="fixed inset-0 z-[200] overflow-auto">
                <AdminDashboard setAdmin={setAdmin} />
              </div>
            )}

            <div className={isAdmin ? "invisible" : ""}>
              <Navbar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                onLoginClick={() => setShowLoginModal(true)}
              />
              
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <Certificates />
                    <Skills />
                    <Projects /> {/* Ensure this component has id="projects" */}
                    <Resume />
                    <Contact />
                  </>
                } />
                <Route path="/all-certificates" element={<AllCertificates />} />
              </Routes>

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;