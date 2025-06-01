// src/config/planos.js
export const recursosPorPlano = {
  Basico: [
    { nome: "Analisador de Página de Produto", rota: "/analise-produto" },
    { nome: "Checklist Interativo", rota: "/checklist-interativo" },
    { nome: "Suporte Básico", rota: "/suporte-basico" }
  ],
  Profissional: [
    { nome: "Analisador de Página de Produto", rota: "/analise-produto" },
    { nome: "Perfil", rota: "/perfil" },
    { nome: "Painel de Métricas Unificadas", rota: "/metricas" },
    { nome: "Suporte Prioritário", rota: "/suporte-prioritario" }
  ],
  Empresarial: [
    { nome: "Todos os Recursos", rota: "/todos-recursos" },
    { nome: "Gerador de Prompts Avançado", rota: "/gerador-prompts" },
    { nome: "Consultoria Personalizada", rota: "/consultoria-personalizada" }
  ]
};
