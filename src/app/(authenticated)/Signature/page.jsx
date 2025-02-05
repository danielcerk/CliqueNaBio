'use client'

import React, { useEffect } from 'react';

const PricingTable = () => {
  useEffect(() => {
    // Carregar o script Stripe.js quando o componente for montado
    const script = document.createElement('script');
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    script.onload = () => console.log('Stripe Pricing Table script carregado');
    document.body.appendChild(script);

    return () => {
      // Limpeza do script ao desmontar o componente
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>Escolha seu plano</h1>

      <stripe-pricing-table
        pricing-table-id="prctbl_1QjUuDRtCzJ3GhkZGdANyUQd"
        publishable-key="pk_test_51Pk3r3RtCzJ3GhkZLAt3ExMMW58j7x7GGZcBFftxpwjBjPk7oUW7PY8IhVjHd4xzfdcoSke8vCchWjrMJj7gJB3200594SyOXM"  // Substitua com sua chave pública do Stripe
      ></stripe-pricing-table>
    </div>
  );
};

export default PricingTable;
