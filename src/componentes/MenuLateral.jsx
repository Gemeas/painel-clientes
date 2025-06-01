import React from 'react';
import { recursosPorPlano } from '../config/planos';
import { Link } from 'react-router-dom';

function MenuLateral({ plano }) {
  const recursos = recursosPorPlano[plano] || [];

  return (
    <nav>
      <ul>
        {recursos.map(({ nome, rota }) => (
          <li key={rota}>
            <Link to={rota}>{nome}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MenuLateral;
