// src/pages/DashboardInicial.jsx
import React from "react";
import PlanoBasico from "../componentes/PlanoBasico";
import PlanoProfissional from "../componentes/PlanoProfissional";
import PlanoEmpresarial from "../componentes/PlanoEmpresarial";

export default function DashboardInicial({ plano }) {
  if (plano === "basico") return <PlanoBasico />;
  if (plano === "profissional") return <PlanoProfissional />;
  if (plano === "empresarial") return <PlanoEmpresarial />;
  return <p>Plano não reconhecido.</p>;
}
