import React, { useState } from "react";

export default function Perfil() {
  const [url, setUrl] = useState("");
  const [analise, setAnalise] = useState(null);
  const [erro, setErro] = useState("");

  const validarUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const analisarPerfil = () => {
    if (!url) {
      setErro("Por favor, insira a URL do perfil.");
      setAnalise(null);
      return;
    }

    if (!validarUrl(url)) {
      setErro("URL inválida. Verifique e tente novamente.");
      setAnalise(null);
      return;
    }

    setErro("");

    // Simulação da análise. Aqui pode integrar com API real.
    const plataformas = ["instagram.com", "tiktok.com", "linkedin.com", "facebook.com"];
    const plataforma = plataformas.find((p) => url.toLowerCase().includes(p));

    if (!plataforma) {
      setErro("Por favor, insira um perfil válido do Instagram, TikTok, LinkedIn ou Facebook.");
      setAnalise(null);
      return;
    }

    // Dados simulados da análise
    const resultado = {
      plataforma: plataforma.split(".")[0],
      bioScore: Math.floor(Math.random() * 41) + 60, // 60-100
      engajamentoScore: Math.floor(Math.random() * 51) + 40, // 40-90
      brandingScore: Math.floor(Math.random() * 31) + 70, // 70-100
    };
    resultado.scoreGeral = Math.floor(
      (resultado.bioScore + resultado.engajamentoScore + resultado.brandingScore) / 3
    );

    resultado.sugestoes = [];

    if (resultado.bioScore < 75) {
      resultado.sugestoes.push(
        "Melhore a clareza e os elementos visuais da sua bio para atrair mais seguidores."
      );
    }
    if (resultado.engajamentoScore < 60) {
      resultado.sugestoes.push(
        "Interaja mais com seu público, responda comentários e publique conteúdos regulares."
      );
    }
    if (resultado.brandingScore < 85) {
      resultado.sugestoes.push(
        "Mantenha uma identidade visual consistente para fortalecer seu branding."
      );
    }
    if (resultado.sugestoes.length === 0) {
      resultado.sugestoes.push("Seu perfil está muito bem otimizado! Continue assim.");
    }

    setAnalise(resultado);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Perfil Social</h2>
      <p style={styles.descricao}>
        Análise da bio, engajamento e branding em Instagram, TikTok, LinkedIn ou Facebook.
      </p>

      <input
        type="text"
        placeholder="Cole a URL do perfil social aqui"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={styles.input}
      />

      <button onClick={analisarPerfil} style={styles.botao}>
        Analisar Perfil
      </button>

      {erro && <div style={styles.erro}>{erro}</div>}

      {analise && (
        <div style={styles.resultado}>
          <h3>
            Análise do perfil: <em>{analise.plataforma}</em>
          </h3>
          <p>
            <strong>Score Geral:</strong> {analise.scoreGeral} / 100
          </p>
          <ul>
            <li>Bio: {analise.bioScore} / 100</li>
            <li>Engajamento: {analise.engajamentoScore} / 100</li>
            <li>Branding: {analise.brandingScore} / 100</li>
          </ul>

          <h4>Sugestões de melhoria:</h4>
          <ul>
            {analise.sugestoes.map((sug, i) => (
              <li key={i}>{sug}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "30px auto",
    padding: "20px",
    backgroundColor: "#eef6ff",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(30, 144, 255, 0.3)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  titulo: {
    color: "#1e90ff",
    textAlign: "center",
    marginBottom: "10px",
  },
  descricao: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #bbb",
    marginBottom: "15px",
  },
  botao: {
    width: "100%",
    padding: "12px",
    fontSize: "18px",
    backgroundColor: "#1e90ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  erro: {
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "#ffd6d6",
    color: "#a70000",
    borderRadius: "6px",
    textAlign: "center",
  },
  resultado: {
    marginTop: "25px",
    backgroundColor: "#d4eaff",
    padding: "15px",
    borderRadius: "8px",
    color: "#003366",
  },
};
