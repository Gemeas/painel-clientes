import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";
import PlanoBasico from "./componentes/PlanoBasico";
import PlanoProfissional from "./componentes/PlanoProfissional";
import PlanoEmpresarial from "./componentes/PlanoEmpresarial";
import Login from "./pages/Login";

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [plano, setPlano] = useState("");
  const [carregandoPlano, setCarregandoPlano] = useState(false);

  useEffect(() => {
    const verificarSessao = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        const userEmail = data.session.user.email;
        setUsuario(data.session.user);
        await buscarPlano(userEmail);
      }
    };
    verificarSessao();
  }, []);

  const buscarPlano = async (email) => {
    setCarregandoPlano(true);

    const emailLimpo = email.trim().toLowerCase();
    console.log("Email limpo:", `"${emailLimpo}"`);

    const { data, error } = await supabase
      .from("perfis") 
      .select("plano")
      .eq("email", emailLimpo);

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      console.error("Erro ao buscar plano:", error.message);
      setPlano("");
    } else if (data && data.length > 0) {
      console.log("Plano encontrado:", data[0].plano);
      setPlano(data[0].plano || "");
      console.log("Plano salvo no estado:", data[0].plano || "");
    } else {
      console.log("Nenhum plano encontrado para esse usuário");
      setPlano("");
    }

    setCarregandoPlano(false);
  };

  if (!usuario)
    return (
      <Login
        onLogin={async (user) => {
          setUsuario(user);
          await buscarPlano(user.email);
        }}
      />
    );

  return (
    <div style={{ padding: "20px" }}>
      {console.log("Plano atual render:", `"${plano}"`)}

      <h1>Bem-vindo!</h1>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          setUsuario(null);
          setPlano("");
        }}
      >
        Sair
      </button>

      {carregandoPlano && <p>Verificando seu plano...</p>}

      {!carregandoPlano && plano === "básico" && <PlanoBasico />}
      {!carregandoPlano && plano === "profissional" && <PlanoProfissional />}
      {!carregandoPlano && plano === "empresarial" && <PlanoEmpresarial />}

      {!carregandoPlano && plano === "" && (
        <p>Plano não encontrado. Por favor, verifique com o suporte.</p>
      )}
    </div>
  );
}
