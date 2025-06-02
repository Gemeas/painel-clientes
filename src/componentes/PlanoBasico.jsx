// src/componentes/PlanoBasico.jsx
import React, { useState } from "react";

const sugestoes = [
  "Otimize o tamanho das imagens.",
  "Use títulos descritivos nas páginas.",
  "Melhore o tempo de carregamento do site.",
  "Adicione descrições meta para SEO."
];

function gerarSugestoes(performance) {
  if (performance > 80) return ["Seu site está muito bom!"];
  if (performance > 50) return sugestoes.slice(0, 2);
  return sugestoes;
}

export default function PlanoBasico() {
  const [url, setUrl] = useState("");
  const [resultado, setResultado] = useState(null);

  const analisar = () => {
    if (!url) return alert("Cole uma URL");
    // Simulação simples da análise
    const performance = Math.floor(Math.random() * 100);
    const sugestoes = gerarSugestoes(performance);
    setResultado({ performance, sugestoes });
  };

  return (
    <div>
      <h2>Analisador de Página de Produto</h2>
      <input
        placeholder="Cole a URL da página"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={analisar}>Analisar</button>
      {resultado && (
        <>
          <p>Performance: {resultado.performance}%</p>
          <ul>
            {resultado.sugestoes.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </>
      )}

      <Checklist />
    </div>
  );
}

// Checklist básico (simulado, para ter ideia)
function Checklist() {
  const [itens, setItens] = useState([
    { id: 1, descricao: "Adicionar política de privacidade", feito: false },
    { id: 2, descricao: "Configurar Google Analytics", feito: false },
  ]);

  const toggleItem = (id) => {
    setItens((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, feito: !item.feito } : item
      )
    );
  };

  return (
    <div>
      <h3>Checklist Interativo</h3>
      <ul>
        {itens.map(({ id, descricao, feito }) => (
          <li key={id}>
            <input
              type="checkbox"
              checked={feito}
              onChange={() => toggleItem(id)}
            />
            {descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}
