import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("certificates") // lowercase — match your Supabase table name exactly
        .select("*")
        .order("created_at", { ascending: false });

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
      className="py-20 px-4 bg-[var(--bg-secondary)] transition-colors duration-500"
    >
      <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-h)]">
        Certificates
      </h2>

      {loading && (
        <p className="text-center text-[var(--text)]">Loading certificates...</p>
      )}

      {!loading && certs.length === 0 && (
        <p className="text-center text-[var(--text)]">No certificates added yet.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {certs.map((cert) => (
          <div
            key={cert.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {cert.image_url && (
              <img
                src={cert.image_url}
                alt={cert.title}
                className="w-full h-36 object-contain mb-4 rounded"
              />
            )}
            <h3 className="text-lg font-semibold text-[var(--accent)] mb-1">
              {cert.title}
            </h3>
            <p className="text-sm text-[var(--text)] mb-1">{cert.issuer}</p>
            {cert.date && (
              <p className="text-xs text-gray-400 mb-3">{cert.date}</p>
            )}
            {cert.credential_url && (
              <a
                href={cert.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--accent)] hover:underline"
              >
                View Credential →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}