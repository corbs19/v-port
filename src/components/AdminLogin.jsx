import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AdminLogin({ setAdmin, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password.");
    } else {
      setAdmin(true);
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-80">
      <h2 className="text-2xl font-bold mb-6 text-[var(--text-h)]">Admin Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}