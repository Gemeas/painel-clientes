import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabase";

import MenuLateral from "./componentes/MenuLateral";
import PrivateRoute from "./componentes/PrivateRoute";

import DashboardInicial from "./pages/DashboardInicial";
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

  if (!usuario) {
    return (
      <Login
        onLogin={async (user) => {
          setUsuario(user);
          await buscarPlano(user.email);
        }}
      />
    );
  }

  // Normaliza plano para capitalizar a primeira letra (ex: 'basico' -> 'Basico')
  const planoNormalizado = plano.charAt(0).toUpperCase() + plano.slice(1);

  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <MenuLateral plano={planoNormalizado} />

        <div style={{ padding: "20px", flex: 1 }}>
          <p>Email: {usuario?.email}</p>
          <p>Plano: {planoNormalizado}</p>

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

          {!carregandoPlano && (
            <Routes>
              {/* Rotas protegidas com PrivateRoute */}
              <Route element={<PrivateRoute plano={planoNormalizado} />}>
                <Route path="/dashboard" element={<DashboardInicial plano={planoNormalizado} />} />
                <Route path="/analise-produto" element={<AnaliseProduto />} />
                <Route path="/checklist-interativo" element={<ChecklistInterativo />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/painel-metricas" element={<PainelMetricas />} />                
<Route path="/suporte-basico" element={<SuporteBasico />} />
                <Route path="/suporte-prioritario" element={<SuportePrioritario />} />
                <Route path="/gerador-prompts" element={<GeradorPrompts />} />
                <Route path="/consultoria-personalizada" element={<ConsultoriaPersonalizada />} />
                <Route path="/todos-recursos" element={<TodosRecursos />} />

                {/* Rotas específicas para cada plano */}
                <Route path="/plano-basico" element={<PlanoBasico />} />
                <Route path="/plano-profissional" element={<PlanoProfissional />} />
                <Route path="/plano-empresarial" element={<PlanoEmpresarial />} />
              </Route>

              {/* Rotas públicas */}
              <Route path="/acesso-negado" element={<AcessoNegado />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}


