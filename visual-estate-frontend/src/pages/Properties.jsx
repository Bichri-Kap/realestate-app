import { useEffect, useState } from "react";
import api from "../services/api";

export default function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    api.get("properties/")
      .then(res => setProperties(res.data.results || res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Properties</h2>

      {properties.map(p => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}
