import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const PROJECT_FIELDS = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "image_url", label: "Project Image", type: "file", bucket: "projects" },
  { key: "live_url", label: "Live URL", type: "text" },
  { key: "github_url", label: "GitHub URL", type: "text" },
  { key: "tags", label: "Tags (comma-separated)", type: "text" },
  { key: "pdf_url", label: "Project PDF", type: "file", bucket: "project-pdfs" },
];

const SKILL_FIELDS = [
  { key: "name", label: "Skill Name", type: "text" },
  { key: "category", label: "Category", type: "text" },
  { key: "icon_url", label: "Icon URL", type: "text" },
  { key: "website_url", label: "Website URL", type: "text" },
  { key: "level", label: "Level (e.g., 90)", type: "text" },
];

const CERT_FIELDS = [
  { key: "title", label: "Title", type: "text" },
  { key: "issuer", label: "Issuer", type: "text" },
  { key: "date", label: "Date", type: "text" },
  { key: "image_url", label: "Certificate Image", type: "file", bucket: "certificates" },
  { key: "credential_url", label: "Credential URL", type: "text" },
];

function CrudTable({ tableName, fields, label }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [uploading, setUploading] = useState({});

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
      if (f.key === "name" || f.key === "title")
        return { ...acc, [f.key]: `New ${label.replace(/s$/, "")}` };
      return { ...acc, [f.key]: "" };
    }, {});

    const { data, error } = await supabase.from(tableName).insert([blank]).select();
    if (error) { alert("Error: " + error.message); return; }
    if (data) setRows((prev) => [...data, ...prev]);
  };

  const updateField = (id, key, value) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  };

  async function handleFileUpload(file, rowId, field) {
    if (!file) return;
    const bucket = field.bucket || "projects";
    setUploading((prev) => ({ ...prev, [`${rowId}-${field.key}`]: true }));
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
      updateField(rowId, field.key, urlData.publicUrl);
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading((prev) => ({ ...prev, [`${rowId}-${field.key}`]: false }));
    }
  }

  const saveRow = async (row) => {
    setSaving(row.id);
    const { id, created_at, ...updateData } = row;
    const { error } = await supabase.from(tableName).update(updateData).eq("id", id);
    if (error) alert("Save failed: " + error.message);
    setSaving(null);
  };

  const deleteRow = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    const { error } = await supabase.from(tableName).delete().eq("id", id);
    if (error) alert("Delete failed!");
    else setRows((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) return <p className="p-8 text-sm" style={{ color: "var(--text-muted)" }}>Loading {label}...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold" style={{ color: "var(--text-h)" }}>{label}</h3>
        <button
          onClick={addRow}
          className="px-4 py-2 text-sm font-bold uppercase tracking-widest rounded-lg transition-all"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          + Add {label.replace(/s$/, "")}
        </button>
      </div>

      <div className="grid gap-4">
        {rows.map((row) => (
          <div
            key={row.id}
            className="p-5 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(200,149,108,0.15)",
            }}
          >
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {fields.map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <label
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "var(--accent)" }}
                  >
                    {field.label}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      value={row[field.key] || ""}
                      onChange={(e) => updateField(row.id, field.key, e.target.value)}
                      rows={3}
                      className="p-2 rounded-lg text-sm outline-none resize-none"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(200,149,108,0.2)",
                        color: "var(--text-h)",
                      }}
                    />
                  ) : field.type === "file" ? (
                    <div className="flex flex-col gap-2">
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          handleFileUpload(e.dataTransfer.files[0], row.id, field);
                        }}
                        onClick={() =>
                          document.getElementById(`file-${row.id}-${field.key}`).click()
                        }
                        className="flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all"
                        style={{
                          height: row[field.key] ? "auto" : "120px",
                          border: "1.5px dashed rgba(200,149,108,0.35)",
                          background: "rgba(255,255,255,0.02)",
                          position: "relative",
                        }}
                      >
                        {uploading[`${row.id}-${field.key}`] ? (
                          <p className="text-xs" style={{ color: "var(--accent)" }}>Uploading…</p>
                        ) : row[field.key] ? (
                          <>
                            {field.key === "pdf_url" ? (
                              <div
                                className="w-full rounded-xl flex items-center justify-center gap-3 py-4 cursor-pointer"
                                style={{ background: "rgba(255,255,255,0.04)" }}
                              >
                                <span style={{ fontSize: "28px" }}>📄</span>
                                <div>
                                  <p className="text-xs font-bold" style={{ color: "var(--accent)" }}>PDF Uploaded</p>
                                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Click to replace</p>
                                </div>
                              </div>
                            ) : (
                              <>
                                <img
                                  src={row[field.key]}
                                  alt="preview"
                                  className="w-full rounded-xl object-cover"
                                  style={{ maxHeight: "160px" }}
                                />
                                <div
                                  className="absolute inset-0 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-opacity"
                                  style={{ background: "rgba(0,0,0,0.55)" }}
                                >
                                  <span
                                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                                    style={{ background: "var(--accent)", color: "#fff" }}
                                  >
                                    Replace Image
                                  </span>
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-1 pointer-events-none">
                            <span style={{ fontSize: "24px", opacity: 0.35 }}>
                              {field.key === "pdf_url" ? "📄" : "🖼"}
                            </span>
                            <p className="text-[11px] text-center" style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
                              Drag & drop or{" "}
                              <span style={{ color: "var(--accent)" }}>click to browse</span>
                            </p>
                            <p className="text-[9px]" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
                              {field.key === "pdf_url" ? "PDF" : "PNG · JPG · WEBP"}
                            </p>
                          </div>
                        )}
                      </div>

                      <input
                        id={`file-${row.id}-${field.key}`}
                        type="file"
                        accept={field.key === "pdf_url" ? "application/pdf" : "image/*"}
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files[0], row.id, field)}
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={row[field.key] || ""}
                      onChange={(e) => updateField(row.id, field.key, e.target.value)}
                      className="p-2 rounded-lg text-sm outline-none"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(200,149,108,0.2)",
                        color: "var(--text-h)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => saveRow(row)}
                disabled={saving === row.id}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
                style={{
                  background: saving === row.id ? "rgba(74,222,128,0.3)" : "#4ade80",
                  color: "#052e16",
                  opacity: saving === row.id ? 0.7 : 1,
                  cursor: saving === row.id ? "not-allowed" : "pointer",
                }}
              >
                {saving === row.id ? "Saving…" : "Save"}
              </button>
              <button
                onClick={() => deleteRow(row.id)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
                style={{
                  background: "rgba(248,113,113,0.1)",
                  color: "#f87171",
                  border: "1px solid rgba(248,113,113,0.2)",
                }}
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

// ─── Resume Manager ────────────────────────────────────────────────────────────
function ResumeManager() {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data } = supabase.storage.from("resume").getPublicUrl("resume.pdf");
    fetch(data.publicUrl, { method: "HEAD" })
      .then((res) => { if (res.ok) setResumeUrl(data.publicUrl); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async (file) => {
    if (!file || file.type !== "application/pdf") {
      alert("Please select a valid PDF file.");
      return;
    }
    setUploading(true);
    try {
      const { error: uploadError } = await supabase.storage
        .from("resume")
        .upload("resume.pdf", file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("resume").getPublicUrl("resume.pdf");
      setResumeUrl(data.publicUrl + "?t=" + Date.now());
      alert("Resume uploaded successfully!");
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete the current resume?")) return;
    const { error } = await supabase.storage.from("resume").remove(["resume.pdf"]);
    if (error) { alert("Delete failed: " + error.message); return; }
    setResumeUrl(null);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold" style={{ color: "var(--text-h)" }}>Resume</h3>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleUpload(e.dataTransfer.files[0]); }}
        onClick={() => document.getElementById("resume-file-input").click()}
        className="flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all"
        style={{ minHeight: "180px", border: "1.5px dashed rgba(200,149,108,0.35)", background: "rgba(255,255,255,0.02)" }}
      >
        {uploading ? (
          <p className="text-sm font-bold" style={{ color: "var(--accent)" }}>Uploading…</p>
        ) : loading ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Checking storage…</p>
        ) : resumeUrl ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <span style={{ fontSize: "40px" }}>📄</span>
            <p className="text-sm font-bold" style={{ color: "var(--accent)" }}>resume.pdf is live</p>
            <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>Click or drag & drop to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 pointer-events-none">
            <span style={{ fontSize: "36px", opacity: 0.35 }}>📄</span>
            <p className="text-sm" style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
              Drag & drop or <span style={{ color: "var(--accent)" }}>click to browse</span>
            </p>
            <p className="text-[10px]" style={{ color: "var(--text-muted)", opacity: 0.5 }}>PDF only</p>
          </div>
        )}
      </div>
      <input id="resume-file-input" type="file" accept="application/pdf" className="hidden"
        onChange={(e) => handleUpload(e.target.files[0])} />
      {resumeUrl && (
        <div className="flex gap-3 flex-wrap">
          <a href={resumeUrl} target="_blank" rel="noreferrer"
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
            style={{ background: "var(--accent)", color: "#fff" }}>
            Preview PDF
          </a>
          <button onClick={handleDelete}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
            style={{ background: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" }}>
            Delete Resume
          </button>
        </div>
      )}
      <div className="p-4 rounded-xl text-xs leading-relaxed"
        style={{ background: "rgba(200,149,108,0.06)", border: "1px solid rgba(200,149,108,0.15)", color: "var(--text-muted)" }}>
        <p>
          <span style={{ color: "var(--accent)", fontWeight: 700 }}>Storage bucket:</span>{" "}
          <code>resume</code> (public) · File is always saved as <code>resume.pdf</code> — uploading
          a new file automatically replaces the old one.
        </p>
      </div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
const TABS = ["Projects", "Skills", "Certificates", "Resume", "Messages"];

export default function AdminDashboard({ setAdmin }) {
  const [activeTab, setActiveTab] = useState("Projects");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (activeTab === "Messages") {
      supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data }) => setMessages(data || []));
    }
  }, [activeTab]);

  // ── DELETE MESSAGE ──────────────────────────────────────────────────────────
  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) {
      alert("Delete failed: " + error.message);
    } else {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "var(--bg, #0f0d0b)", color: "var(--text-h, #f5f0e8)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[4px] italic mb-1"
              style={{ color: "var(--accent)", opacity: 0.75 }}>
              Control Panel
            </p>
            <h1 className="text-3xl font-bold uppercase tracking-tight" style={{ color: "var(--text-h)" }}>
              Admin <span style={{ color: "var(--accent)" }}>Dashboard</span>
            </h1>
          </div>
          <button
            onClick={() => { supabase.auth.signOut(); setAdmin(false); }}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
            style={{ background: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" }}
          >
            Logout
          </button>
        </div>

        <div
          className="flex gap-1 mb-8 p-1 rounded-xl w-fit flex-wrap"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(200,149,108,0.1)" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
              style={{
                background: activeTab === tab ? "var(--accent)" : "transparent",
                color: activeTab === tab ? "#fff" : "var(--text-muted)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Projects" && <CrudTable tableName="projects" fields={PROJECT_FIELDS} label="Projects" />}
        {activeTab === "Skills" && <CrudTable tableName="skills" fields={SKILL_FIELDS} label="Skills" />}
        {activeTab === "Certificates" && <CrudTable tableName="certificates" fields={CERT_FIELDS} label="Certificates" />}
        {activeTab === "Resume" && <ResumeManager />}

        {/* ── MESSAGES TAB ─────────────────────────────────────────────────── */}
        {activeTab === "Messages" && (
          <div className="space-y-4">
            {/* Header with count badge */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold" style={{ color: "var(--text-h)" }}>
                Messages
                {messages.length > 0 && (
                  <span
                    className="ml-2 text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ background: "rgba(200,149,108,0.15)", color: "var(--accent)" }}
                  >
                    {messages.length}
                  </span>
                )}
              </h3>
            </div>

            {messages.length === 0 && (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>No messages yet.</p>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className="p-6 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(200,149,108,0.15)",
                }}
              >
                {/* Top row: sender info + timestamp + delete */}
                <div className="flex justify-between items-start mb-3 gap-4">
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: "var(--accent)" }}>
                      {msg.name}
                    </h4>
                    {msg.email && (
                      <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
                        {msg.email}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                    {/* ── DELETE BUTTON ── */}
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all"
                      style={{
                        background: "rgba(248,113,113,0.1)",
                        color: "#f87171",
                        border: "1px solid rgba(248,113,113,0.2)",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Message body */}
                <p className="text-sm" style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}