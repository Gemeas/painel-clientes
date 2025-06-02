import React, { useState } from "react";

export default function AnaliseProduto() {
  const [url, setUrl] = useState("");
  const [analise, setAnalise] = useState(null);
  const [loading, setLoading] = useState(false);

  const analisarPagina = () => {
    if (!url.trim()) {
      alert("Por favor, insira a URL da página para analisar.");
      return;
    }

    setLoading(true);
    setAnalise(null);

    // Simulação de delay como se estivesse chamando API
    setTimeout(() => {
      // Simula notas aleatórias para cada critério (0 a 100)
      const copyScore = Math.floor(Math.random() * 41) + 60;  // 60-100
      const imagensScore = Math.floor(Math.random() * 61) + 30; // 30-90
      const seoScore = Math.floor(Math.random() * 51) + 40; // 40-90
      const provaSocialScore = Math.floor(Math.random() * 71) + 20; // 20-90

      const scoreGeral = Math.floor(
        (copyScore + imagensScore + seoScore + provaSocialScore) / 4
      );

      // Sugestões baseadas em score baixo (<70)
      const sugestoes = [];
      if (copyScore < 70) sugestoes.push("Melhore a clareza e persuasão da sua copy.");
      if (imagensScore < 70) sugestoes.push("Use imagens de maior qualidade e relevância.");
      if (seoScore < 70) sugestoes.push("Otimize títulos, descrições e palavras-chave para SEO.");
      if (provaSocialScore < 70) sugestoes.push("Adicione avaliações, depoimentos ou provas sociais.");

      setAnalise({
        copyScore,
        imagensScore,
        seoScore,
        provaSocialScore,
        scoreGeral,
        sugestoes,
      });

      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Analisador de Página de Produto</h2>
      <p>
        Avaliação da copy, imagens, SEO e prova social com um score de 0 a 100.
      </p>

      <input
        type="url"
        placeholder="Cole a URL da página aqui"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: 8, fontSize: 16, marginBottom: 10 }}
      />

      <button
        onClick={analisarPagina}
        disabled={loading}
        style={{ padding: "8px 16px", fontSize: 16 }}
      >
        {loading ? "Analisando..." : "Analisar"}
      </button>

      {analise && (
        <div style={{ marginTop: 20, background: "#f9f9f9", padding: 20, borderRadius: 8 }}>
          <h3>Resultado da Análise</h3>
          <p><strong>Score Geral:</strong> {analise.scoreGeral} / 100</p>
          <ul>
            <li>Copy: {analise.copyScore}</li>
            <li>Imagens: {analise.imagensScore}</li>
            <li>SEO: {analise.seoScore}</li>
            <li>Prova Social: {analise.provaSocialScore}</li>
          </ul>

          {analise.sugestoes.length > 0 ? (
            <>
              <h4>Sugestões de Melhoria</h4>
              <ul>
                {analise.sugestoes.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>👍 Sua página está ótima em todos os aspectos!</p>
          )}
        </div>
      )}
    </div>
  );
}

