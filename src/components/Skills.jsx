export default function Skills() {
  const skills = [
    "React", "Tailwind CSS", "JavaScript", "TypeScript",
    "HTML5", "CSS3", "Node.js", "Git"
  ];

  return (
   <section className="py-20 px-4 bg-[var(--bg-secondary)] transition-colors duration-500">
      <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-h)]">My Skills</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-white dark:bg-gray-900 text-[var(--text)] dark:text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}