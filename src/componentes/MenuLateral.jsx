import React from 'react';
import { recursosPorPlano } from '../config/planos';
import { Link } from 'react-router-dom';

function MenuLateral({ plano }) {
  const recursos = recursosPorPlano[plano] || [];

  return (
    <nav style={{ minWidth: '250px', padding: '20px', borderRight: '1px solid #ccc' }}>
      <h3>{plano ? `Plano ${plano}` : 'Plano desconhecido'}</h3>
      <p>Recursos disponíveis:</p>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {recursos.map(({ nome, rota }) => (
          <li key={rota} style={{ marginBottom: '10px' }}>
            <Link to={rota} style={{ textDecoration: 'none', color: '#007bff' }}>
              {nome}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MenuLateral;

