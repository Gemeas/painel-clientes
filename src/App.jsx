import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabase";

import { recursosPorPlano } from "./config/planos";
import MenuLateral from "./components/MenuLateral";
import PrivateRoute from "./components/PrivateRoute";

import PlanoBasico from "./componentes/PlanoBasico";
import PlanoProfissional from "./componentes/PlanoProfissional";
import PlanoEmpresarial from "./componentes/PlanoEmpresarial";
import Login from "./pages/Login";
import AcessoNegado from "./pages/AcessoNegado";

import AnaliseProduto from "./pages/AnaliseProduto";
import Perfil from "./pages/Perfil";
import PainelMetricas from "./pages/PainelMetricas";
import ChecklistInterativo from "./pages/ChecklistInterativo";
import SuporteBasico from "./pages/SuporteBasico";
import SuportePrioritario from "./pages/SuportePrioritario";
import GeradorPrompts from "./pages/GeradorPrompts";
import ConsultoriaPersonalizada from "./pages/ConsultoriaPersonalizada";
import TodosRecursos from "./pages/TodosRecursos";

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

    const { data, error } = await supabase
      .from("perfis")
      .select("plano")
      .eq("email", emailLimpo)
      .single();

    if (error) {
      console.error("Erro ao buscar plano:", error.message);
      setPlano("");
    } else {
      setPlano((data?.plano || "").toLowerCase());
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
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <MenuLateral plano={plano.charAt(0).toUpperCase() + plano.slice(1)} />

        <div style={{ padding: "20px", flex: 1 }}>
          <p>Email: {usuario?.email}</p>
          <p>Plano: {plano}</p>

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

          <Routes>
            <Route
              element={
                <PrivateRoute plano={plano.charAt(0).toUpperCase() + plano.slice(1)} />
              }
            >
              <Route path="/analise-produto" element={<AnaliseProduto />} />
              <Route path="/checklist-interativo" element={<ChecklistInterativo />} />
              <Route path="/suporte-basico" element={<SuporteBasico />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/metricas" element={<PainelMetricas />} />
              <Route path="/suporte-prioritario" element={<SuportePrioritario />} />
              <Route path="/todos-recursos" element={<TodosRecursos />} />
              <Route path="/gerador-prompts" element={<GeradorPrompts />} />
              <Route path="/consultoria-personalizada" element={<ConsultoriaPersonalizada />} />
            </Route>

            <Route path="/acesso-negado" element={<AcessoNegado />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
