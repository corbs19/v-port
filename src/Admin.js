// createAdmin.js
import { supabaseAdmin } from "./src/supabaseClient.js";

async function createAdmin() {
  const email = "admin@portfolio.com";
  const password = "StrongPassword123";

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (error) console.error("Error creating admin:", error);
  else console.log("Admin created:", data);
}

createAdmin();