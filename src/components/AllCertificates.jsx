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
    <div
      className="min-h-screen py-16 px-6 md:px-16"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Back link */}
        <HashLink
          smooth
          to="/#certificates"
          className="inline-flex items-center gap-2 mb-12 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-x-1"
          style={{ color: "var(--accent)" }}
        >
          ← Back to Portfolio
        </HashLink>

        {/* Header */}
        <header className="mb-16">
          <p
            className="text-sm italic mb-3 tracking-wide"
            style={{ color: "var(--accent)", opacity: 0.75 }}
          >
            Full Archive
          </p>
          <div
            className="mt-6 h-px w-24"
            style={{ background: "var(--accent)", opacity: 0.4 }}
          />
        </header>

        {/* Count */}
        {!loading && (
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            {certs.length} certificates/Badges
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl animate-pulse"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  height: "200px",
                }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {certs.map((cert) => (
              <div
                key={cert.id}
                className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(200,149,108,0.12)",
                }}
              >
                {/* Image area */}
                <div
                  className="relative aspect-[4/3] overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <img
                    src={cert.image_url}
                    alt={cert.title}
                    className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  />
                  {cert.credential_url && (
                    
                     <a href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(3px)",
                      }}
                    >
                      <span
                        className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                        style={{
                          background: "var(--accent)",
                          color: "#fff",
                        }}
                      >
                        Verify ↗
                      </span>
                    </a>
                  )}
                </div>

                {/* Card footer */}
                <div
                  className="px-3 py-2 flex flex-col gap-0.5 border-t"
                  style={{ borderColor: "rgba(200,149,108,0.1)" }}
                >
                  <h3
                    className="text-[10px] font-bold uppercase leading-snug line-clamp-2"
                    style={{ color: "var(--text-h)" }}
                  >
                    {cert.title}
                  </h3>
                  <p
                    className="text-[9px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--accent)", opacity: 0.8 }}
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
  );
}