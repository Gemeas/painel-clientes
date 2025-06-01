import React from "react";
import { Link } from "react-router-dom";

export default function AcessoNegado() {
  return (
    <div>
      <h1>Acesso Negado</h1>
      <p>Você não tem permissão para acessar este recurso.</p>
      <Link to="/">Voltar ao painel</Link>
    </div>
  );
}

