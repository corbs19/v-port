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
      className="py-20 px-6 bg-[var(--bg-secondary)] transition-colors duration-500 w-full"
    >
      <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-h)]">
        Technologies & Tools
      </h2>
      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="skill-card bg-white dark:bg-gray-800 text-[var(--text)] dark:text-white px-5 py-3 rounded-xl shadow-md cursor-default flex flex-col items-center gap-2 w-28"
          >
            {/* Icon */}
            {skill.icon_url && (
              <img
                src={skill.icon_url}
                alt={skill.name}
                className="w-10 h-10 object-contain"
              />
            )}

            {/* Name */}
            <span className="text-sm font-medium text-center">{skill.name}</span>

            {/* Category */}
            {skill.category && (
              <span className="text-xs text-gray-400 text-center">{skill.category}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}