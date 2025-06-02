// src/componentes/PlanoProfissional.jsx
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import PrivateRoute from "./PrivateRoute";

export default function PlanoProfissional() {
  // Simulando dados para o painel
  const [metricas, setMetricas] = useState([
    { data: "2025-05-25", visitas: 120, vendas: 40, ticket_medio: 200 },
    { data: "2025-05-26", visitas: 150, vendas: 60, ticket_medio: 210 },
  ]);

  return (
    <PrivateRoute permitidoPara={["profissional", "empresarial"]} plano="profissional">
      <h2>Painel de Métricas Unificadas</h2>
      <LineChart width={600} height={300} data={metricas}>
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="visitas" stroke="#8884d8" />
        <Line type="monotone" dataKey="vendas" stroke="#82ca9d" />
        <Line type="monotone" dataKey="ticket_medio" stroke="#ffc658" />
      </LineChart>
      <h3>Suporte Prioritário</h3>
      <p>Para suporte rápido, entre em contato via chat ou telefone.</p>
    </PrivateRoute>
  );
}

