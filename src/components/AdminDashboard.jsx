import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AdminDashboard() {
  const [certs, setCerts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  // Forms state... (keep your existing state variables)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Note the Capitalized table names to match your schema
    const { data: certData } = await supabase.from("Certificates").select("*").order("date", { ascending: false });
    setCerts(certData || []);
    const { data: projData } = await supabase.from("Projects").select("*").order("created_at", { ascending: false });
    setProjects(projData || []);
    const { data: skillData } = await supabase.from("Skills").select("*").order("created_at", { ascending: false });
    setSkills(skillData || []);
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    setLoading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Ensure you have created a bucket named 'portfolio-assets' in Supabase
    const { error: uploadError } = await supabase.storage
      .from("portfolio-assets")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      setLoading(false);
      return null;
    }

    const { data } = supabase.storage.from("portfolio-assets").getPublicUrl(filePath);
    setLoading(false);
    return data.publicUrl;
  };

  // Add functions... (Update .from("Table") names here too)
  const addProject = async () => {
    const image_url = await uploadImage(projImage);
    const { error } = await supabase
      .from("Projects")
      .insert([{ name: projTitle, description: projDesc, link: projLink, image_url }]);
    
    if (error) alert(error.message);
    else {
      fetchData();
      setProjTitle(""); setProjDesc(""); setProjLink(""); setProjImage(null);
    }
  };

  return (
    <div className="p-8 bg-[var(--bg)] text-[var(--text)] min-h-screen max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--text-h)]">Admin Dashboard</h2>
        {loading && <span className="text-[var(--accent)] animate-pulse">Uploading...</span>}
      </div>

      {/* Form sections (keep your JSX but ensure styles make inputs visible) */}
      <section className="grid gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">Add New Project</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Project Title" value={projTitle} onChange={e=>setProjTitle(e.target.value)} className="p-2 rounded border dark:bg-gray-700"/>
            <input placeholder="Project Link" value={projLink} onChange={e=>setProjLink(e.target.value)} className="p-2 rounded border dark:bg-gray-700"/>
            <textarea placeholder="Description" value={projDesc} onChange={e=>setProjDesc(e.target.value)} className="p-2 rounded border dark:bg-gray-700 md:col-span-2"/>
            <input type="file" onChange={e=>setProjImage(e.target.files[0])} className="p-2 text-sm"/>
            <button onClick={addProject} disabled={loading} className="md:col-span-2 bg-[var(--accent)] text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50">
              Add Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}