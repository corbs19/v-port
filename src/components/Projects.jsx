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
      className="py-20 px-4 transition-colors duration-500, text-center"
      style={{ background: "var(--bg)", scrollMarginTop: "70px" }}
    >
      <h2 style={{
        
              fontFamily: "'Cormorant Garamond', Georgia,serif",
              fontSize: "clamp(36px, 3vw, 56px)",
              fontWeight: 900, lineHeight: 0.92, textTransform: "uppercase",
              color: "var(--text-h, #f5f0e8)", margin: "0 0 22px",
            }}>
              Projects<br />
            </h2>
            <div style={{
              width: "36px", height: "0px",
              background: "var(--accent, #c8915a)", opacity: 0.35,
            }} />
      <div
        className="w-16 h-1 rounded-full mx-auto mb-12"
        style={{ background: "var(--accent)", marginTop: "4px" }}
      />

      {loading && (
        <p className="text-center" style={{ color: "var(--text)" }}>
          Loading projects...
        </p>
      )}
      {!loading && projects.length === 0 && (
        <p className="text-center" style={{ color: "var(--text)" }}>
          No projects yet. Check back soon!
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl flex flex-col overflow-hidden transition-all duration-300 group"
            style={{
              background: "rgba(200,149,108,0.07)",
              border: "1px solid rgba(200,149,108,0.2)",
              boxShadow: "0 2px 12px rgba(120,80,40,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(120,80,40,0.15)";
              e.currentTarget.style.borderColor = "rgba(200,149,108,0.5)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(120,80,40,0.06)";
              e.currentTarget.style.borderColor = "rgba(200,149,108,0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Square image */}
            <div
              className="w-full overflow-hidden"
              style={{ aspectRatio: "1 / 1" }}
            >
              {project.image_url ? (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: "rgba(200,149,108,0.1)" }}
                >
                  <span style={{ fontSize: "32px", opacity: 0.3 }}>🖼</span>
                </div>
              )}
            </div>

            {/* Card body */}
            <div className="p-4 flex flex-col flex-1">
              <h3
                className="text-sm font-bold mb-1 leading-tight"
                style={{ color: "var(--accent)" }}
              >
                {project.title}
              </h3>
              <p
                className="text-xs mb-3 flex-1"
                style={{
                  color: "var(--text)",
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
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: "rgba(200,149,108,0.12)",
                        color: "var(--accent)",
                        border: "1px solid rgba(200,149,108,0.2)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div
                className="mb-4"
                style={{
                  height: "1px",
                  background: "rgba(200,149,108,0.12)",
                }}
              />

              {/* Links - COLUMN LAYOUT */}
              <div className="flex flex-col gap-2.5">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold uppercase tracking-widest transition-opacity hover:opacity-60 w-fit"
                    style={{ color: "var(--accent)" }}
                  >
                    Live Demo →
                  </a>
                )}
                {project.pdf_url && (
                  <a
                    href={project.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold uppercase tracking-widest transition-opacity hover:opacity-60 w-fit"
                    style={{ color: "var(--accent)" }}
                  >
                    View File →
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-medium uppercase tracking-widest transition-opacity hover:opacity-60 w-fit"
                    style={{ color: "var(--text-muted)" }}
                  >
                    GitHub →
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