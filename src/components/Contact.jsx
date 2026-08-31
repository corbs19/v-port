import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Phone, Mail } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    try {
      await supabase.from("messages").insert([
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
      ]);

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 text-center transition-colors duration-500"
      style={{ background: "var(--bg)", scrollMarginTop: "70px" }}
    >
      <h2
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          fontWeight: 500,
          color: "var(--text-h)",
          margin: "0 0 0.75rem",
        }}
      >
        Contact
      </h2>
      <div
        className="w-16 h-1 rounded-full mx-auto mb-10"
        style={{ background: "var(--accent)", marginTop: "4px" }}
      />


      {/* Subtitle */}
      <p
        className="text-center max-w-md mx-auto leading-relaxed mb-6"
        style={{
          color: "var(--text-muted)",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: "1rem",
        }}
      >
        Write a message below, or contact me directly:
      </p>

      {/* Phone + Email */}
      <div className="flex flex-col items-center gap-2 mb-10">
        <a
          href="mailto:vanisecorbymaniapao@gmail.com"
          className="flex items-center gap-2"
          style={{
            color: "var(--text)",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 500,
          }}
        >
          <Mail size={17} style={{ color: "var(--accent)" }} />
          vanisecorbymaniapao@gmail.com
        </a>
        <a
          href="tel:5639380857639"
          className="flex items-center gap-2"
          style={{
            color: "var(--text)",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 500,
          }}
        >
          <Phone size={17} style={{ color: "var(--accent)" }} />
          +63 956 542 7319
        </a>
      </div>

      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          {/* Name */}
          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-3 rounded-md outline-none transition-colors duration-200"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              color: "var(--text-h)",
              caretColor: "var(--accent)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border-color)")}
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-3 rounded-md outline-none transition-colors duration-200"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              color: "var(--text-h)",
              caretColor: "var(--accent)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border-color)")}
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Your message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            className="p-3 rounded-md outline-none resize-none transition-colors duration-200"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              color: "var(--text-h)",
              caretColor: "var(--accent)",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border-color)")}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-6 py-3 rounded-md font-medium transition-opacity duration-200"
            style={{
              background: "var(--text-h)",
              color: "var(--bg)",
              opacity: status === "sending" ? 0.6 : 1,
              cursor: status === "sending" ? "not-allowed" : "pointer",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
            onMouseEnter={(e) => {
              if (status !== "sending") e.currentTarget.style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              if (status !== "sending") e.currentTarget.style.opacity = "1";
            }}
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {/* Success */}
          {status === "success" && (
            <p
              className="text-center font-medium text-sm"
              style={{ color: "var(--accent)", fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Message sent — I'll get back to you soon.
            </p>
          )}

          {/* Error */}
          {status === "error" && (
            <p
              className="text-center text-sm"
              style={{ color: "#b3453c", fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}