import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

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
      await supabase.from("messages").insert([{
        name: form.name,
        email: form.email,
        message: form.message,
      }]);

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-[var(--bg-secondary)] transition-colors duration-500">
      {/* Title - Margin Bottom 0 */}
<h2
  className="text-3xl md:text-4xl font-bold text-center mb-0" 
  style={{ 
    color: "var(--text-h)",
    lineHeight: "1.2" // Tightens the invisible box around the text
  }}
>
  Contact
</h2>

{/* The Line - Tiny Margin Top to bring it closer */}
<div
  className="w-16 h-1 rounded-full mx-auto mb-12"
  style={{ 
    background: "var(--accent)",
    marginTop: "4px" // Adjust this number (2px, 4px, 6px) to get the exact look
  }}
/>
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-#c8845a text-[var(--text)] dark:text-white focus:outline-none focus:border-[var(--accent)]" />
          <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-#c8845a text-[var(--text)] dark:text-white focus:outline-none focus:border-[var(--accent)]" />
          <textarea name="message" placeholder="Your Message" rows={5} value={form.message} onChange={handleChange} required
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:#c8845a text-[var(--text)] dark:text-white focus:outline-none focus:border-[var(--accent)]" />
          <button type="submit" disabled={status === "sending"}
            className="px-6 py-3 bg-amber-900 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" && (
            <p className="text-green-600 dark:text-green-400 text-center font-medium">
              ✓ Message sent! I'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}