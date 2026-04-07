import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Certificates() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    async function fetchData() {
     
const { data, error } = await supabase
  .from("Certificates") 
  .select("*");

      if (error) {
        console.log(error);
      } else {
        setCerts(data || []);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-10">
      <h1>Certificates</h1>

      {certs.length === 0 && <p>No data yet</p>}

      {certs.map((c) => (
        <div key={c.id}>{c.title}</div>
      ))}
    </div>
  );
}