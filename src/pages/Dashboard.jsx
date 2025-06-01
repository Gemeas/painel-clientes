import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";

const Dashboard = ({ email }) => {
  const [acessos, setAcessos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcessos = async () => {
      const { data, error } = await supabase
        .from("perfis")
        .select("acessos, plano")
        .eq("email", email)
        .single();

      if (error) {
        console.error("Erro ao buscar acessos:", error);
      } else {
        setAcessos(data.acessos || []);
      }
      setLoading(false);
    };
    fetchAcessos();
  }, [email]);

  if (loading) return <p>Carregando seus recursos...</p>;

  return (
    <div>
      <h2>Seus Recursos Disponíveis</h2>
      {acessos.length === 0 && <p>Você não tem recursos liberados.</p>}
      <ul>
        {acessos.map((recurso, i) => (
          <li key={i}>{recurso.replace(/_/g, " ")}</li>
        ))}
      </ul>
    </div>
  );
};


