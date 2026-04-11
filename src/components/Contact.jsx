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
      className="py-20 px-4 transition-colors duration-500, text-center"
      style={{ background: "var(--bg)", scrollMarginTop: "70px" }}
    >
      <h2 style={{
        
              fontFamily: "'Cormorant Garamond', Georgia,serif",
              fontSize: "clamp(36px, 3vw, 56px)",
              fontWeight: 900, lineHeight: 0.92, textTransform: "uppercase",
              color: "var(--text-h, #f5f0e8)", margin: "0 0 22px",
            }}>
              Contact<br />
            </h2>

      {/* Accent line */}
      <div
        className="w-16 h-1 rounded-full mx-auto"
        style={{ background: "var(--accent)", marginTop: "4px" }}
      />

      {/* Subtitle */}
      <p
        className="text-center mt-5 max-w-md mx-auto leading-relaxed"
        style={{ color: "var(--text-muted)", fontSize: "20px" }}
      >
        Write a message below, or contact me directly:
      </p>

      {/* Phone + Email in 2 ROWS */}
      <div className="flex flex-col items-center gap-1 mb-10 mt-4">

    <a
    href="mailto:vanisecorbymaniapao@gmail.com"
    className="flex items-center gap-2 hover:underline"
    style={{ color: "var(--accent)", fontWeight: 600 }}
    >
    <Mail size={18} style={{ color: "var(--accent)" }} />
    vanisecorbymaniapao@gmail.com
    </a>
    <a
    href="tel:5639380857639"
    className="flex items-center gap-2 hover:underline"
    style={{ color: "var(--accent)", fontWeight: 600 }}
    >
    <Phone size={18} style={{ color: "var(--accent)" }} />
    +63 938 085 7639
    </a>
    </div>

      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-3 rounded-lg outline-none transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(200,149,108,0.25)",
              color: "var(--text-h)",
              caretColor: "var(--accent)",
            }}
            onFocus={(e) =>
              (e.target.style.border = "1px solid var(--accent)")
            }
            onBlur={(e) =>
              (e.target.style.border =
                "1px solid rgba(200,149,108,0.25)")
            }
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg outline-none transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(200,149,108,0.25)",
              color: "var(--text-h)",
              caretColor: "var(--accent)",
            }}
            onFocus={(e) =>
              (e.target.style.border = "1px solid var(--accent)")
            }
            onBlur={(e) =>
              (e.target.style.border =
                "1px solid rgba(200,149,108,0.25)")
            }
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            className="p-3 rounded-lg outline-none resize-none transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(200,149,108,0.25)",
              color: "var(--text-h)",
              caretColor: "var(--accent)",
            }}
            onFocus={(e) =>
              (e.target.style.border = "1px solid var(--accent)")
            }
            onBlur={(e) =>
              (e.target.style.border =
                "1px solid rgba(200,149,108,0.25)")
            }
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              opacity: status === "sending" ? 0.6 : 1,
              cursor: status === "sending" ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (status !== "sending") {
                e.currentTarget.style.boxShadow =
                  "0 0 25px var(--glow-color)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                  "0 0 25px "
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>

          {/* Success */}
          {status === "success" && (
            <p className="text-center font-medium text-sm" style={{ color: "#4ade80" }}>
              ✓ Message sent! I'll get back to you soon.
            </p>
          )}

          {/* Error */}
          {status === "error" && (
            <p className="text-center text-sm" style={{ color: "#f87171" }}>
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}