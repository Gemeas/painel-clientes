import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { recursosPorPlano } from '../config/planos';

function PrivateRoute({ plano }) {
  const location = useLocation();
  const recursos = recursosPorPlano[plano] || [];

  const acessoLiberado = recursos.some((recurso) => recurso.rota === location.pathname);

  if (acessoLiberado) {
    return <Outlet />;
  } else {
    return <Navigate to="/acesso-negado" replace />;
  }
}

export default PrivateRoute;
