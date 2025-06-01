import React, { useState } from "react";
import { supabase } from "../supabase";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Autenticar usuário com Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha, // Corrigido: usar a variável correta
    });

    if (error) {
      setErro("Email ou senha inválidos.");
      return;
    }

    const user = data.user;

    // Buscar perfil do usuário na tabela "perfis"  
    const { data: perfil, error: perfilError } = await supabase
      .from("perfis")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (perfilError || !perfil) {
      setErro("Plano não encontrado. Por favor, verifique com o suporte.");
      return;
    }

    // Se deu tudo certo, chama o callback com os dados do usuário + plano
    onLogin({ ...user, plano: perfil.plano });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Login de Cliente</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        /><br />
        <button type="submit">Entrar</button>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </form>
    </div>
  );
};

export default Login;

