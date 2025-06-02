// src/componentes/PlanoEmpresarial.jsx
import React, { useState } from "react";
import PrivateRoute from "./PrivateRoute";

export default function PlanoEmpresarial() {
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState("");

  // Simulação de API chamada para gerar prompt (integre OpenAI para real)
  const gerarPrompt = () => {
    if (!input) return alert("Descreva seu objetivo");
    setPrompt(`Prompt gerado para: ${input}`);
  };

  return (
    <PrivateRoute permitidoPara={["empresarial"]} plano="empresarial">
      <h2>Gerador de Prompts Avançado</h2>
      <textarea
        placeholder="Descreva seu objetivo de marketing, SEO, etc."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={gerarPrompt}>Gerar Prompt</button>
      {prompt && <p>{prompt}</p>}

      <h3>Consultoria Personalizada</h3>
      <p>Agende sua consultoria e receba relatórios detalhados.</p>
    </PrivateRoute>
  );
}
