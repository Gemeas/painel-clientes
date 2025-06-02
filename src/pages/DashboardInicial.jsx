import React from "react";

function DashboardInicial({ plano }) {
  return (
    <div>
      <h1>Bem-vindo ao Painel ({plano})</h1>
      <p>Escolha uma funcionalidade no menu lateral para começar.</p>
    </div>
  );
}

export default DashboardInicial;
