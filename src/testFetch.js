import { supabase } from "./src/supabaseClient.js";

async function testFetch() {
  let { data: certs, error } = await supabase.from("certificates").select("*");
  console.log("Certificates:", certs, "Error:", error);

  let { data: projects } = await supabase.from("projects").select("*");
  console.log("Projects:", projects);

  let { data: skills } = await supabase.from("skills").select("*");
  console.log("Skills:", skills);
}

testFetch();