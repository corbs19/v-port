import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error.message);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="py-20 px-4 text-center transition-colors duration-500"
      style={{ background: "var(--bg)", scrollMarginTop: "70px" }}
    >
      <h2
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          fontWeight: 500,
          color: "var(--text-h)",
          margin: "0 0 0.75rem",
        }}
      >
        Projects
      </h2>
       <div
        className="w-16 h-1 rounded-full mx-auto mb-10"
        style={{ background: "var(--accent)", marginTop: "4px" }}
      />
      <p
        style={{
          fontFamily: "Fraunces', Georgia, serif",
          color: "var(--text-muted)",
          maxWidth: "480px",
          margin: "0 auto 3rem",
        }}
      >
        A selection of things I've built and worked on.
      </p>

      {loading && (
        <p style={{ color: "var(--text-muted)", fontFamily: "'Inter', system-ui, sans-serif" }}>
          Loading projects...
        </p>
      )}
      {!loading && projects.length === 0 && (
        <p style={{ color: "var(--text-muted)", fontFamily: "'Inter', system-ui, sans-serif" }}>
          No projects yet. Check back soon.
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="card text-left flex flex-col overflow-hidden"
            style={{ padding: 0 }}
          >
            {/* Image */}
            <div className="w-full overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
              {project.image_url ? (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  style={{ display: "block" }}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontFamily: "'Inter', system-ui, sans-serif" }}>
                    No preview
                  </span>
                </div>
              )}
            </div>

            {/* Card body */}
            <div className="p-5 flex flex-col flex-1">
              <h3
                className="mb-2 leading-snug"
                style={{
                  color: "var(--text-h)",
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontWeight: 500,
                  fontSize: "1.15rem",
                }}
              >
                {project.title}
              </h3>
              <p
                className="mb-4 flex-1"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {project.description}
              </p>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded"
                      style={{
                        background: "var(--bg-secondary)",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border-color)",
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: "0.7rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div className="mb-4" style={{ height: "1px", background: "var(--border-color)" }} />

              {/* Links */}
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--accent)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                    }}
                  >
                    Live demo
                  </a>
                )}
                {project.pdf_url && (
                  <a
                    href={project.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--accent)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                    }}
                  >
                    View file
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                    }}
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}