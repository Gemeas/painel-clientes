import React, { useState } from "react";

export default function SuporteBasico() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nome || !form.email || !form.assunto || !form.mensagem) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    if (!validarEmail(form.email)) {
      setErro("Por favor, insira um email válido.");
      return;
    }

    // Aqui você pode integrar com API, supabase, etc.
    // Por enquanto só simula o envio
    setErro("");
    setEnviado(true);
    setForm({ nome: "", email: "", assunto: "", mensagem: "" });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Suporte Básico</h2>
      <p style={styles.descricao}>
        Envie sua dúvida ou problema e nossa equipe entrará em contato.
      </p>

      {enviado && (
        <div style={styles.sucesso}>
          Sua mensagem foi enviada com sucesso! Em breve responderemos.
        </div>
      )}

      {erro && <div style={styles.erro}>{erro}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nome:
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            style={styles.input}
            placeholder="Seu nome"
          />
        </label>

        <label style={styles.label}>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="seu@email.com"
          />
        </label>

        <label style={styles.label}>
          Assunto:
          <input
            type="text"
            name="assunto"
            value={form.assunto}
            onChange={handleChange}
            style={styles.input}
            placeholder="Assunto da mensagem"
          />
        </label>

        <label style={styles.label}>
          Mensagem:
          <textarea
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            style={styles.textarea}
            placeholder="Escreva sua dúvida ou problema aqui"
          />
        </label>

        <button type="submit" style={styles.botao}>
          Enviar
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "30px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  titulo: {
    color: "#1976d2",
    marginBottom: "10px",
    textAlign: "center",
  },
  descricao: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#555",
  },
  sucesso: {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    textAlign: "center",
  },
  erro: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "15px",
    fontWeight: "600",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "vertical",
  },
  botao: {
    backgroundColor: "#1976d2",
    color: "#fff",
    padding: "12px",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

