import React, { useState, useEffect } from "react";

const itensIniciais = [
  "Verificar título da página",
  "Checar descrição meta",
  "Confirmar imagens otimizadas",
  "Garantir URLs amigáveis",
  "Testar responsividade no celular",
  "Verificar velocidade de carregamento",
  "Revisar CTA (Call to Action)",
  "Avaliar prova social (depoimentos, reviews)",
  "Testar links internos e externos",
  "Revisar ortografia e gramática",
];

export default function ChecklistInterativo() {
  const [itens, setItens] = useState(() =>
    itensIniciais.map((texto) => ({ texto, concluido: false }))
  );
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const total = itens.length;
    const concluidos = itens.filter((item) => item.concluido).length;
    setProgresso(Math.round((concluidos / total) * 100));
  }, [itens]);

  const toggleItem = (index) => {
    setItens((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, concluido: !item.concluido } : item
      )
    );
  };

  const resetChecklist = () => {
    setItens(itensIniciais.map((texto) => ({ texto, concluido: false })));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Checklist Interativo de Otimização</h2>
      <p style={styles.subtitulo}>
        Marque cada item conforme for concluindo para melhorar sua página!
      </p>

      <div style={styles.progressoContainer}>
        <div style={{ ...styles.barraProgresso, width: `${progresso}%` }} />
        <span style={styles.progressoTexto}>{progresso}% concluído</span>
      </div>

      <ul style={styles.lista}>
        {itens.map((item, index) => (
          <li
            key={index}
            onClick={() => toggleItem(index)}
            style={{
              ...styles.item,
              textDecoration: item.concluido ? "line-through" : "none",
              color: item.concluido ? "#4caf50" : "#333",
              cursor: "pointer",
              userSelect: "none",
              backgroundColor: item.concluido ? "#e8f5e9" : "transparent",
              transition: "all 0.3s ease",
            }}
          >
            <input
              type="checkbox"
              checked={item.concluido}
              onChange={() => toggleItem(index)}
              style={styles.checkbox}
            />
            {item.texto}
          </li>
        ))}
      </ul>

      <button onClick={resetChecklist} style={styles.botaoReset}>
        Resetar Checklist
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fff",
  },
  titulo: {
    marginBottom: "5px",
    color: "#1976d2",
    textAlign: "center",
  },
  subtitulo: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#555",
  },
  progressoContainer: {
    position: "relative",
    height: "25px",
    backgroundColor: "#eee",
    borderRadius: "12.5px",
    overflow: "hidden",
    marginBottom: "20px",
  },
  barraProgresso: {
    height: "100%",
    backgroundColor: "#4caf50",
    transition: "width 0.4s ease-in-out",
  },
  progressoTexto: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    textAlign: "center",
    lineHeight: "25px",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "0 0 3px rgba(0,0,0,0.5)",
    pointerEvents: "none",
  },
  lista: {
    listStyle: "none",
    paddingLeft: 0,
    marginBottom: "20px",
  },
  item: {
    fontSize: "18px",
    padding: "10px 10px 10px 40px",
    position: "relative",
    borderBottom: "1px solid #eee",
  },
  checkbox: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  botaoReset: {
    display: "block",
    margin: "0 auto",
    padding: "10px 25px",
    fontSize: "16px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
