import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { recursosPorPlano } from '../config/planos';

function PrivateRoute({ plano }) {
  const location = useLocation();
  const recursos = recursosPorPlano[plano] || [];

 console.log("Plano:", plano);
  console.log("Rota atual:", location.pathname);
  console.log("Recursos permitidos:", recursos);

  const acessoLiberado = recursos.some((recurso) => recurso.rota === location.pathname);

  return acessoLiberado ? <Outlet /> : <Navigate to="/acesso-negado" replace />;
}

export default PrivateRoute;
