import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AdminLogin({ setAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // 1. Start loading

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      alert(error.message);
      setLoading(false); // 2. Stop loading on error
    } else if (data.user) {
      setAdmin(true); // 3. Logged in!
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-800 relative">
      <h2 className="text-2xl font-bold mb-6 text-[var(--text-h)] text-center">Admin Access</h2>

      <form onSubmit={handleLogin} className="flex flex-col">
        <label className="text-sm mb-1 ml-1 text-gray-500">Email</label>
        <input
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 mb-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-[var(--accent)] outline-none transition-all text-black dark:text-white"
          required
        />

        <label className="text-sm mb-1 ml-1 text-gray-500">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 mb-6 rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-[var(--accent)] outline-none transition-all text-black dark:text-white"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Checking Credentials..." : "Sign In"}
        </button>
      </form>

      <p className="mt-4 text-xs text-gray-400 text-center uppercase tracking-widest">
        Secured by Supabase Auth
      </p>
    </div>
  );
}