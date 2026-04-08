import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// --- Field definitions per table ---
const PROJECT_FIELDS = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "image_url", label: "Image URL", type: "text" },
  { key: "live_url", label: "Live URL", type: "text" },
  { key: "github_url", label: "GitHub URL", type: "text" },
  { key: "tags", label: "Tags (comma-separated)", type: "text" },
];

const SKILL_FIELDS = [
  { key: "name", label: "Skill Name", type: "text" },
  { key: "category", label: "Category", type: "text" },
  { key: "icon_url", label: "Icon URL", type: "text" },
  { key: "website_url", label: "Website URL", type: "text" },
  { key: "level", label: "Level (e.g., 90)", type: "text" }, // Use text to avoid int syntax errors
];

const CERT_FIELDS = [
  { key: "title", label: "Title", type: "text" },
  { key: "issuer", label: "Issuer", type: "text" },
  { key: "date", label: "Date", type: "text" },
  { key: "image_url", label: "Upload Image", type: "file" },
  { key: "credential_url", label: "Credential URL", type: "text" },
];

// ─── Generic CRUD Table ──────────────────────────────────────────────────────
function CrudTable({ tableName, fields, label }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await supabase
        .from(tableName)
        .select("*")
        .order("created_at", { ascending: false });
      setRows(data || []);
      setLoading(false);
    };
    fetchData();
  }, [tableName]);

  const addRow = async () => {
    const blank = fields.reduce((acc, f) => {
      if (f.key === "tags") return { ...acc, [f.key]: [] };
      if (f.key === "name" || f.key === "title") {
        return { ...acc, [f.key]: `New ${label.replace(/s$/, "")}` };
      }
      return { ...acc, [f.key]: "" };
    }, {});

    const { data, error } = await supabase.from(tableName).insert([blank]).select();
    if (error) {
      alert("Error: " + error.message);
      return;
    }
    if (data) setRows((prev) => [...data, ...prev]);
  };

  const updateField = (id, key, value) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  };

  const handleFileUpload = async (e, rowId, fieldKey) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const { error: storageError } = await supabase.storage
        .from("certificates")
        .upload(fileName, file);

      if (storageError) throw storageError;

      const { data: { publicUrl } } = supabase.storage
        .from("certificates")
        .getPublicUrl(fileName);

      updateField(rowId, fieldKey, publicUrl);
      alert("Image uploaded! Remember to click Save.");
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  };

  const saveRow = async (row) => {
    setSaving(row.id);
    // Remove id and created_at from update payload to avoid primary key errors
    const { id, created_at, ...updateData } = row;
    const { error } = await supabase.from(tableName).update(updateData).eq("id", id);

    if (error) {
      alert("Save failed: " + error.message);
    } else {
      console.log("Save successful!");
    }
    setSaving(null);
  };

  const deleteRow = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    const { error } = await supabase.from(tableName).delete().eq("id", id);
    if (error) {
      alert("Delete failed!");
    } else {
      setRows((prev) => prev.filter((r) => r.id !== id));
    }
  };

  if (loading) return <p className="p-8">Loading {label}...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{label}</h3>
        <button onClick={addRow} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
          + Add {label.replace(/s$/, "")}
        </button>
      </div>

      <div className="grid gap-4">
        {rows.map((row) => (
          <div key={row.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-xl shadow-sm">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {fields.map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400 uppercase font-bold">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={row[field.key] || ""}
                      onChange={(e) => updateField(row.id, field.key, e.target.value)}
                      className="p-2 rounded border bg-transparent text-sm"
                    />
                  ) : field.type === "file" ? (
                    <div className="space-y-2">
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, row.id, field.key)} className="text-xs" />
                      {row[field.key] && <img src={row[field.key]} className="w-20 h-20 object-cover rounded" alt="Preview" />}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={row[field.key] || ""}
                      onChange={(e) => updateField(row.id, field.key, e.target.value)}
                      className="p-2 rounded border bg-transparent text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => saveRow(row)} disabled={saving === row.id} className="px-4 py-2 bg-green-600 text-white rounded text-sm">
                {saving === row.id ? "Saving..." : "Save"}
              </button>
              <button onClick={() => deleteRow(row.id)} className="px-4 py-2 bg-red-100 text-red-600 rounded text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const TABS = ["Projects", "Skills", "Certificates", "Messages"];

export default function AdminDashboard({ setAdmin }) {
  const [activeTab, setActiveTab] = useState("Projects");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (activeTab === "Messages") {
      supabase.from("messages").select("*").order("created_at", { ascending: false })
        .then(({ data }) => setMessages(data || []));
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0d0b] text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button onClick={() => { supabase.auth.signOut(); setAdmin(false); }} className="px-4 py-2 bg-red-500 text-white rounded-lg">Logout</button>
        </div>

        <div className="flex gap-4 mb-8 border-b dark:border-gray-800">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 px-2 text-sm font-bold transition-all ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Projects" && <CrudTable tableName="projects" fields={PROJECT_FIELDS} label="Projects" />}
        {activeTab === "Skills" && <CrudTable tableName="skills" fields={SKILL_FIELDS} label="Skills" />}
        {activeTab === "Certificates" && <CrudTable tableName="certificates" fields={CERT_FIELDS} label="Certificates" />}
        {activeTab === "Messages" && (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex justify-between mb-4">
                  <h4 className="font-bold text-blue-500">{msg.name}</h4>
                  <span className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString()}</span>
                </div>
                <p className="text-sm">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}