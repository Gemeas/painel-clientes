import React, { useState } from "react";

export default function SuportePrioritario() {
  const [ticket, setTicket] = useState({ assunto: "", descricao: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ticket.assunto || !ticket.descricao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    // Aqui você pode adicionar a lógica para enviar o ticket para backend ou API
    setEnviado(true);
    setTicket({ assunto: "", descricao: "" });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Suporte Prioritário</h2>

      <p style={styles.info}>
        Como cliente com plano prioritário, você tem acesso a atendimento rápido e personalizado.
      </p>

      <div style={styles.section}>
        <h3>Chat ao vivo (Simulado)</h3>
        <div style={styles.chatBox}>
          <p><strong>Agente:</strong> Olá! Como posso ajudar você hoje?</p>
          {/* Aqui você pode implementar o chat real */}
        </div>
      </div>

      <div style={styles.section}>
        <h3>Contato direto</h3>
        <p><strong>Email:</strong> <a href="mailto:support@seusite.com">suporte.checkai@gmail.com</a></p>
        <p>Atendimento de segunda a sexta, das 8h às 18h.</p>
      </div>

      <div style={styles.section}>
        <h3>Enviar Ticket de Suporte</h3>
        {enviado ? (
          <p style={styles.sucesso}>Seu ticket foi enviado com sucesso! Nossa equipe entrará em contato em até 1 hora.</p>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <label>
              Assunto:
              <input
                type="text"
                name="assunto"
                value={ticket.assunto}
                onChange={handleChange}
                style={styles.input}
                placeholder="Descreva o assunto"
              />
            </label>

            <label>
              Descrição:
              <textarea
                name="descricao"
                value={ticket.descricao}
                onChange={handleChange}
                style={styles.textarea}
                placeholder="Descreva seu problema ou dúvida"
              />
            </label>

            <button type="submit" style={styles.button}>Enviar Ticket</button>
          </form>
        )}
      </div>

      <div style={styles.section}>
        <h3>Tempo estimado de resposta</h3>
        <p>Garantimos resposta em até <strong>1 hora útil</strong> para tickets enviados.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "30px auto",
    backgroundColor: "#f0f8ff",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 0 15px rgba(0, 123, 255, 0.2)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    color: "#007bff",
    marginBottom: 20,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
  },
  chatBox: {
    backgroundColor: "#e9f0ff",
    borderRadius: 8,
    padding: 15,
    minHeight: 100,
    fontStyle: "italic",
    color: "#333",
    boxShadow: "inset 0 0 8px #cce0ff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: 8,
    marginTop: 6,
    marginBottom: 15,
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  textarea: {
    padding: 8,
    marginTop: 6,
    marginBottom: 15,
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 16,
    resize: "vertical",
    minHeight: 80,
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: 5,
    fontSize: 16,
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  sucesso: {
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
  },
};
