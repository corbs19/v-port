import { useEffect, useState } from "react";
// 1. IMPORT your supabase client
import { supabase } from "../lib/supabaseClient"; 

export default function Projects() {
  // 2. STATE to hold projects from the database
  const [dbProjects, setDbProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
     const { data, error } = await supabase
  .from("Projects") // Capitalize if that's how it is in the dashboard
  .select("*")
    

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setDbProjects(data);
      }
    }

    fetchProjects();
  }, []);

  // 3. MERGE your static projects with database projects (optional)
  const allProjects = [...dbProjects]; 

  return (
    <section id="projects" className="py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-h)]">Projects</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {allProjects.map((project) => (
          <div
            key={project.id || project.name}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-[var(--accent)]">{project.name}</h3>
            <p className="mb-4">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] font-medium hover:underline"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}