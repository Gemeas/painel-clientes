import express from "express";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

// Supabase credentials
const supabase = createClient(
  "https://vqrkwqvsammtwpysnpis.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxcmt3cXZzYW1tdHdweXNucGlzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzA1MzIzNSwiZXhwIjoyMDYyNjI5MjM1fQ.FUErAAL0KKv8-cizhS4KUG11PWYd02J_sehINXmgmRA"
);

// Configuração do e-mail (use App Password do Gmail ou outro serviço)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "suporte.checkai@gmail.com",
    pass: "stjr ctbh plkd noly" // Troque pela sua App Password
  },
});

app.post("/liberar-acesso", async (req, res) => {
  const { email, plano } = req.body;

  let acessos = [];
  let mensagem = "";

  if (plano === "básico") {
    acessos = ["analisador", "checklist", "suporte_básico"];
    mensagem = "Você agora tem acesso ao Analisador de Produtos, Checklist Interativo e Suporte Básico.";
  } else if (plano === "profissional") {
    acessos = ["analisador", "perfil", "metricas", "suporte_prioritario"];
    mensagem = "Você agora tem acesso ao Analisador de Produtos, Perfil, Painel de Métricas Unificadas e Suporte Prioritário.";
  } else if (plano === "empresarial") {
    acessos = ["todos_os_recursos", "gerador_prompts", "consultoria"];
    mensagem = "Você agora tem acesso completo ao sistema, incluindo Gerador Avançado de Prompts e Consultoria Personalizada.";
  } else {
    return res.status(400).send("Plano inválido.");
  }

  const { error } = await supabase.from("perfis").insert([
    {
      email: email,
      plano: plano,
      acessos: acessos,
      data_ativacao: new Date(),
    },
  ]);

 if (error) {
  console.error("Erro ao inserir usuário:", error);  // <-- adicione este log
  return res.status(500).send("Erro ao salvar no Supabase.");
}

  try {
    await transporter.sendMail({
      from: "suporte.checkai@gmail.com",
      to: email,
      subject: `Bem-vindo ao seu plano ${plano}`,
      text: `Olá! ${mensagem}\n\nObrigado por confiar no nosso serviço!`,
    });
  } catch (err) {
    return res.status(500).send("Erro ao enviar o e-mail.");
  }

  return res.status(200).send("Acessos liberados com sucesso!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
