import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";

const coresPie = ["#8884d8", "#82ca9d"];
const coresKPI = "#1e90ff";

export default function PainelMetricas() {
  // Simulando dados reais
  const [dados, setDados] = useState({
    taxaConversao: 4.5, // em %
    visitas: 1500,
    ticketMedio: 210, // em R$
    CAC: 35, // Custo Aquisição Cliente
    ROI: 120, // em %
    clientesNovos: 80,
    clientesRecorrentes: 120,
    carrinhosAbandonados: 25, // em %
    tempoMedioCompra: 2.3, // em dias
    historico: [
      { data: "2025-05-20", visitas: 1200, conversao: 3.9, vendas: 45 },
      { data: "2025-05-21", visitas: 1300, conversao: 4.1, vendas: 50 },
      { data: "2025-05-22", visitas: 1400, conversao: 4.3, vendas: 55 },
      { data: "2025-05-23", visitas: 1450, conversao: 4.4, vendas: 57 },
      { data: "2025-05-24", visitas: 1480, conversao: 4.5, vendas: 58 },
      { data: "2025-05-25", visitas: 1500, conversao: 4.5, vendas: 60 },
    ],
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Painel de Métricas Unificadas</h2>

      {/* KPIs principais */}
      <div style={styles.kpiContainer}>
        <KPI title="Taxa de Conversão" value={`${dados.taxaConversao}%`} />
        <KPI title="Visitas" value={dados.visitas} />
        <KPI title="Ticket Médio" value={`R$ ${dados.ticketMedio}`} />
        <KPI title="CAC" value={`R$ ${dados.CAC}`} />
        <KPI title="ROI" value={`${dados.ROI}%`} />
        <KPI title="Carrinhos Abandonados" value={`${dados.carrinhosAbandonados}%`} />
        <KPI title="Tempo Médio até a Compra" value={`${dados.tempoMedioCompra} dias`} />
      </div>

      {/* Gráfico clientes novos vs recorrentes */}
      <div style={styles.chartSection}>
        <h3>Clientes Novos vs Recorrentes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: "Novos", value: dados.clientesNovos },
                { name: "Recorrentes", value: dados.clientesRecorrentes },
              ]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              <Cell fill={coresPie[0]} />
              <Cell fill={coresPie[1]} />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico histórico de visitas, conversão e vendas */}
      <div style={styles.chartSection}>
        <h3>Histórico: Visitas, Taxa de Conversão e Vendas</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dados.historico} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="data" />
            <YAxis yAxisId="left" domain={[0, 'dataMax + 20']} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="visitas" stroke="#1e90ff" />
            <Line yAxisId="right" type="monotone" dataKey="conversao" stroke="#82ca9d" />
            <Line yAxisId="left" type="monotone" dataKey="vendas" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de carrinhos abandonados */}
      <div style={styles.chartSection}>
        <h3>Carrinhos Abandonados (%)</h3>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={[{ name: "Abandono", value: dados.carrinhosAbandonados }]}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="value" fill="#ff6b6b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function KPI({ title, value }) {
  return (
    <div style={styles.kpiBox}>
      <h4 style={{ marginBottom: 5, color: coresKPI }}>{title}</h4>
      <p style={{ fontSize: 24, fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 960,
    margin: "40px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9fafc",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
    color: "#1e90ff",
  },
  kpiContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
    gap: 20,
    marginBottom: 40,
  },
  kpiBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    boxShadow: "0 0 10px rgba(30,144,255,0.15)",
    textAlign: "center",
  },
  chartSection: {
    marginBottom: 40,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 0 15px rgba(30, 144, 255, 0.1)",
  },
};
