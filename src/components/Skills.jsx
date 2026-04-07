import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const STATIC_SKILLS = [
  "React", "Tailwind CSS", "JavaScript", "TypeScript",
  "HTML5", "CSS3", "Node.js", "Git",
];

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function fetchSkills() {
      const { data, error } = await supabase.from("skills").select("*");
      if (error || !data || data.length === 0) {
        // Fall back to static list if DB is empty or errors
        setSkills(STATIC_SKILLS.map((name, i) => ({ id: i, name })));
      } else {
        setSkills(data);
      }
    }
    fetchSkills();
  }, []);

  return (
    <section
      id="skills"
      className="py-20 px-4 bg-[var(--bg-secondary)] transition-colors duration-500"
    >
      <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-h)]">
        My Skills
      </h2>
      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white dark:bg-gray-900 text-[var(--text)] dark:text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 hover:text-[var(--accent)] transition-all cursor-default"
          >
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  );
}