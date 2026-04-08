import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects") // lowercase — match your Supabase table name exactly
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
    <section id="projects" className="py-20 px-4 bg-[var(--bg)] transition-colors duration-500">
      {/* Title - Margin Bottom 0 */}
<h2
  className="text-3xl md:text-4xl font-bold text-center mb-0" 
  style={{ 
    color: "var(--text-h)",
    lineHeight: "1.2" // Tightens the invisible box around the text
  }}
>
  Projects
</h2>

{/* The Line - Tiny Margin Top to bring it closer */}
<div
  className="w-16 h-1 rounded-full mx-auto mb-12"
  style={{ 
    background: "var(--accent)",
    marginTop: "4px" // Adjust this number (2px, 4px, 6px) to get the exact look
  }}
/>

      {loading && (
        <p className="text-center text-[var(--text)]">Loading projects...</p>
      )}

      {!loading && projects.length === 0 && (
        <p className="text-center text-[var(--text)]">No projects yet. Check back soon!</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            {project.image_url && (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-xl font-semibold mb-2 text-[var(--accent)]">
              {project.title}
            </h3>
            <p className="mb-4 text-[var(--text)] flex-1">{project.description}</p>
            {project.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-4 mt-auto">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] font-medium hover:underline"
                >
                  Live Demo →
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text)] hover:text-[var(--accent)] hover:underline"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
