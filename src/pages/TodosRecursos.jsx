import React from "react";

const recursos = [
  {
    nome: "Analisador de Página de Produto",
    descricao: "Avalie sua copy, imagens, SEO e prova social com score de 0 a 100.",
    planos: ["profissional", "empresarial"],
  },
  {
    nome: "Checklist Interativo",
    descricao: "Checklist passo a passo para otimização de páginas e campanhas.",
    planos: ["básico", "profissional", "empresarial"],
  },
  {
    nome: "Gerador de Prompts para IA",
    descricao: "Crie prompts prontos para ChatGPT, Midjourney, Gemini e mais.",
    planos: ["profissional", "empresarial"],
  },
  {
    nome: "Consultoria Personalizada",
    descricao: "Receba insights e análises sob medida do seu funil e tráfego.",
    planos: ["empresarial"],
  },
  {
    nome: "Painel de Métricas Unificadas",
    descricao: "Visualize métricas essenciais como CAC, ROI, ticket médio, etc.",
    planos: ["profissional", "empresarial"],
  },
  {
    nome: "Perfil Social",
    descricao: "Análise de bio, branding e engajamento para Instagram, TikTok, etc.",
    planos: ["básico", "profissional", "empresarial"],
  },
  {
    nome: "Suporte Básico",
    descricao: "Ajuda via email com resposta em até 48h úteis.",
    planos: ["básico"],
  },
  {
    nome: "Suporte Prioritário",
    descricao: "Atendimento rápido via chat, telefone ou ticket (1h útil).",
    planos: ["profissional", "empresarial"],
  },
];

const planosCores = {
  básico: "#6c757d",
  profissional: "#007bff",
  empresarial: "#28a745",
};

export default function TodosRecursos() {
  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Todos os Recursos da Plataforma</h2>

      <div style={styles.grid}>
        {recursos.map((recurso, index) => (
          <div key={index} style={styles.card}>
            <h3>{recurso.nome}</h3>
            <p>{recurso.descricao}</p>
            <div style={styles.planos}>
              {recurso.planos.map((plano) => (
                <span
                  key={plano}
                  style={{
                    ...styles.tag,
                    backgroundColor: planosCores[plano],
                  }}
                >
                  {plano.charAt(0).toUpperCase() + plano.slice(1)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 1000,
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "Segoe UI, sans-serif",
  },
  titulo: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 28,
    color: "#343a40",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
    borderLeft: "5px solid #dee2e6",
    transition: "transform 0.2s ease",
  },
  planos: {
    marginTop: 10,
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    padding: "4px 10px",
    borderRadius: "15px",
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
  },
};
