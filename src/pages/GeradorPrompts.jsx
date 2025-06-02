import React, { useState } from "react";

const modelos = [
  { nome: "ChatGPT", tipo: "texto", dica: "Ex: Crie um texto persuasivo para uma página de vendas de suplementos." },
  { nome: "Midjourney", tipo: "imagem", dica: "Ex: Uma mulher correndo ao pôr-do-sol em estilo futurista cyberpunk." },
  { nome: "Gemini", tipo: "texto", dica: "Ex: Ideias de conteúdo para Instagram voltado para moda minimalista." },
  { nome: "Claude", tipo: "estratégia", dica: "Ex: Estratégia de marketing para lançamento de um curso online de produtividade." },
];

export default function GeradorPrompts() {
  const [modelo, setModelo] = useState("ChatGPT");
  const [tema, setTema] = useState("");
  const [resultado, setResultado] = useState("");

  const gerarPrompt = () => {
    if (!tema) {
      setResultado("Por favor, insira um tema ou objetivo.");
      return;
    }

    let promptFinal = "";

    switch (modelo) {
      case "ChatGPT":
        promptFinal = `Crie um prompt para ChatGPT que ajude com: ${tema}. Formate como uma instrução clara e útil.`;
        break;
      case "Midjourney":
        promptFinal = `Imagine uma imagem para Midjourney baseada em: ${tema}. Descreva estilo, iluminação, emoção e ambiente.`;
        break;
      case "Gemini":
        promptFinal = `Sugira um prompt de conteúdo para Gemini focado em: ${tema}. Pode ser para social media ou marketing.`;
        break;
      case "Claude":
        promptFinal = `Desenvolva um prompt para Claude com foco em: ${tema}. Busque estrutura lógica e análise estratégica.`;
        break;
      default:
        promptFinal = `Descreva uma ideia de prompt com base em: ${tema}`;
    }

    setResultado(promptFinal);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>🎯 Gerador Avançado de Prompts para IA</h2>

      <div style={styles.form}>
        <label style={styles.label}>Selecione a IA:</label>
        <select
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          style={styles.select}
        >
          {modelos.map((m) => (
            <option key={m.nome} value={m.nome}>
              {m.nome}
            </option>
          ))}
        </select>

        <label style={styles.label}>Tema ou objetivo do prompt:</label>
        <input
          type="text"
          placeholder={
            modelos.find((m) => m.nome === modelo)?.dica || "Ex: Vendas no Instagram"
          }
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          style={styles.input}
        />

        <button onClick={gerarPrompt} style={styles.button}>
          Gerar Prompt
        </button>
      </div>

      {resultado && (
        <div style={styles.resultado}>
          <h3>🧠 Prompt Gerado:</h3>
          <p>{resultado}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    background: "#f9fafb",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    fontFamily: "Segoe UI, sans-serif",
  },
  titulo: {
    textAlign: "center",
    fontSize: "26px",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontWeight: "600",
    fontSize: "16px",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  resultado: {
    marginTop: "30px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
};

