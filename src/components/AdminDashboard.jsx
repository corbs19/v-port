import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// ─── Generic CRUD Table ──────────────────────────────────────────────────────
function CrudTable({ tableName, fields, label }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null); // row id being saved

  useEffect(() => {
    supabase
      .from(tableName)
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setRows(data || []);
        setLoading(false);
      });
  }, [tableName]);

  const addRow = async () => {
    const blank = fields.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {});
    const { data } = await supabase.from(tableName).insert([blank]).select();
    if (data) setRows((prev) => [...data, ...prev]);
  };

  const updateField = (id, key, value) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [key]: value } : r))
    );
  };

  const saveRow = async (row) => {
    setSaving(row.id);
    const update = fields.reduce((acc, f) => ({ ...acc, [f.key]: row[f.key] }), {});
    await supabase.from(tableName).update(update).eq("id", row.id);
    setSaving(null);
  };

  const deleteRow = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await supabase.from(tableName).delete().eq("id", id);
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) return <p className="text-[var(--text)]">Loading {label}...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[var(--text-h)]">{label}</h3>
        <button
          onClick={addRow}
          className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
        >
          + Add {label.replace(/s$/, "")}
        </button>
      </div>

      {rows.length === 0 && (
        <p className="text-[var(--text)] text-sm">No {label.toLowerCase()} yet. Click + Add to create one.</p>
      )}

      <div className="flex flex-col gap-4">
        {rows.map((row) => (
          <div
            key={row.id}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              {fields.map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wide">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      rows={2}
                      value={row[field.key] || ""}
                      onChange={(e) => updateField(row.id, field.key, e.target.value)}
                      className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--accent)]"
                    />
                  ) : (
                    <input
                      type="text"
                      value={row[field.key] || ""}
                      onChange={(e) => updateField(row.id, field.key, e.target.value)}
                      className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--accent)]"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => saveRow(row)}
                disabled={saving === row.id}
                className="px-4 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 disabled:opacity-50 transition-colors"
              >
                {saving === row.id ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => deleteRow(row.id)}
                className="px-4 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Field definitions per table ─────────────────────────────────────────────
const PROJECT_FIELDS = [
  { key: "title",       label: "Title",        type: "text" },
  { key: "description", label: "Description",  type: "textarea" },
  { key: "image_url",   label: "Image URL",    type: "text" },
  { key: "live_url",    label: "Live URL",     type: "text" },
  { key: "github_url",  label: "GitHub URL",   type: "text" },
  { key: "tags",        label: "Tags (comma-separated)", type: "text" },
];

const SKILL_FIELDS = [
  { key: "name",     label: "Skill Name", type: "text" },
  { key: "category", label: "Category",   type: "text" },
  { key: "icon_url", label: "Icon URL",   type: "text" },
];

const CERT_FIELDS = [
  { key: "title",          label: "Title",          type: "text" },
  { key: "issuer",         label: "Issuer",         type: "text" },
  { key: "date",           label: "Date",           type: "text" },
  { key: "image_url",      label: "Image URL",      type: "text" },
  { key: "credential_url", label: "Credential URL", type: "text" },
];

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const TABS = ["Projects", "Skills", "Certificates", "Messages"];

export default function AdminDashboard({ setAdmin }) {
  const [activeTab, setActiveTab] = useState("Projects");
  const [messages, setMessages] = useState([]);

  const logout = async () => {
    await supabase.auth.signOut();
    setAdmin(false);
  };

  useEffect(() => {
    if (activeTab === "Messages") {
      supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data }) => setMessages(data || []));
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-[var(--accent)]">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-8 pt-6 border-b border-gray-200 dark:border-gray-700">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-[var(--accent)] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-[var(--text)] hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-8 py-8 max-w-5xl">
        {activeTab === "Projects" && (
          <CrudTable tableName="projects" fields={PROJECT_FIELDS} label="Projects" />
        )}
        {activeTab === "Skills" && (
          <CrudTable tableName="skills" fields={SKILL_FIELDS} label="Skills" />
        )}
        {activeTab === "Certificates" && (
          <CrudTable tableName="certificates" fields={CERT_FIELDS} label="Certificates" />
        )}
        {activeTab === "Messages" && (
          <div>
            <h3 className="text-xl font-bold mb-4 text-[var(--text-h)]">Contact Messages</h3>
            {messages.length === 0 && <p className="text-sm text-[var(--text)]">No messages yet.</p>}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl mb-4"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-[var(--accent)]">{msg.name}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{msg.email}</p>
                <p className="text-[var(--text)]">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}