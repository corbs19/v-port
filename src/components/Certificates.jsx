import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(2); // Limit to 4 for a perfect 2x2 grid

      if (error) {
        console.error("Error fetching certificates:", error.message);
      } else {
        setCerts(data || []);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <section
      id="certificates"
      className="min-h-screen w-full py-20 px-6 md:px-12 flex items-center transition-colors duration-500"
      style={{ background: "var(--bg-secondary)", scrollMarginTop: "70px" }}
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-3 gap-16 items-start">
        
        {/* Left Section: Info Panel (Narrower 1-column span) */}
        <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-32">
          <div className="space-y-2">
            <h4 className="italic text-xl" style={{ color: "var(--accent)", opacity: 0.8 }}>
              Check Out
            </h4>
            <h2 
              className="text-5xl font-bold tracking-tight uppercase" 
              style={{ color: "var(--text-h)", lineHeight: "1.1" }}
            >
              My <br />
              <span style={{ color: "var(--accent)" }}>Certificates & Badges</span> 
            </h2>
          </div>
          
          <p className="text-base leading-relaxed" style={{ color: "var(--text)" }}>
            A collection of professional badges, certifications and course completions 
            showcasing my continuous learning and technical expertise.
          </p>

          <Link 
            to="/all-certificates" 
            className="inline-block px-10 py-4 border-2 transition-all duration-300 uppercase text-xs font-bold tracking-widest hover:bg-[var(--accent)] hover:text-white text-center"
            style={{ borderColor: "var(--accent)", color: "var(--text)" }}
          >
            View All Records
          </Link>
        </div>

        {/* Right Section: 2-Column Grid for Certificates */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex justify-center py-20">
              <p className="animate-pulse" style={{ color: "var(--text-muted)" }}>Loading certificates...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-y-12 gap-x-10">
              {certs.map((cert) => (
                <div
                  key={cert.id}
                  className="group flex flex-col transition-all duration-300"
                >
                  {/* Certificate Image Frame */}
                  <div 
                    className="relative w-full aspect-[4/3] rounded-lg shadow-2xl overflow-hidden mb-5 transition-transform duration-500 group-hover:-translate-y-2"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    {cert.image_url ? (
                      <img
                        src={cert.image_url}
                        alt={cert.title}
                        className="w-full h-full object-cover p-1 transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-20">
                        <span style={{ color: "var(--text)" }}>No Image</span>
                      </div>
                    )}
                    
                    {/* View Link Overlay */}
                    {cert.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <span className="bg-[var(--accent)] text-white px-5 py-2 text-xs uppercase font-bold tracking-widest rounded shadow-xl">
                          Verify
                        </span>
                      </a>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1">
                    <h3 
                      className="text-lg font-bold uppercase tracking-wide" 
                      style={{ color: "var(--text-h)" }}
                    >
                      {cert.title}
                    </h3>
                    <p 
                      className="text-xs font-semibold uppercase tracking-wider" 
                      style={{ color: "var(--accent)" }}
                    >
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}