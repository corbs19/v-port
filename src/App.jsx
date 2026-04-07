import { useState } from "react";
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
  const [isAdmin, setAdmin] = useState(false); // tracks if admin logged in

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen transition-colors duration-500 bg-[var(--bg)] text-[var(--text)]">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Show Admin Login modal if admin not logged in */}
        {!isAdmin && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
            <AdminLogin setAdmin={setAdmin} />
          </div>
        )}

        {/* Show Admin Dashboard modal if admin logged in */}
        {isAdmin && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-start p-10 z-50 overflow-auto">
            <AdminDashboard />
          </div>
        )}

        {/* PUBLIC portfolio components */}
        <Hero />
        <Skills />
        <Projects />
        <Certificates />
        <Resume />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;