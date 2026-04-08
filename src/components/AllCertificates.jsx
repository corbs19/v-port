import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { HashLink } from "react-router-hash-link";

export default function AllCertificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setCerts(data || []);
      setLoading(false);
    }
    fetchData();
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="min-h-screen py-20 px-6 md:px-12" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto">
        
        <HashLink 
          smooth
          to="/#certificates" 
          className="mb-10 inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] transition-all hover:translate-x-[-5px]"
          style={{ color: "var(--accent)" }}
        >
          <span className="mr-2">←</span> Back to Portfolio
        </HashLink>

        <header className="mb-16">
          <h4 className="italic text-xl mb-2" style={{ color: "var(--accent)", opacity: 0.8 }}>Full Archive</h4>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight" style={{ color: "var(--text-h)" }}>
            My <span style={{ color: "var(--accent)" }}>Credentials</span>
          </h1>
        </header>

        {loading ? (
          <p style={{ color: "var(--text-muted)" }}>Loading archive...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {certs.map((cert) => (
              <div key={cert.id} className="group flex flex-col">
                <div 
                  className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 border transition-transform duration-500 group-hover:-translate-y-2"
                  style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(200,149,108,0.1)" }}
                >
                  <img src={cert.image_url} alt={cert.title} className="w-full h-full object-contain p-2" />
                  {cert.credential_url && (
                    <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" 
                       className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-[var(--accent)] text-white px-3 py-1 text-[10px] uppercase font-bold rounded">Verify</span>
                    </a>
                  )}
                </div>
                <h3 className="text-sm font-bold uppercase truncate" style={{ color: "var(--text-h)" }}>{cert.title}</h3>
                <p className="text-xs font-semibold uppercase" style={{ color: "var(--accent)" }}>{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}