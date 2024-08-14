// src/components/PaymentForm.jsx
import { useState } from 'react';

export default function PaymentForm() {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const buyOrder = `order_${Date.now()}`;
    const sessionId = `session_${Date.now()}`;
    const returnUrl = `${window.location.origin}/payment/success`;

    const res = await fetch('/api/createTransaction.json.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ buyOrder, sessionId, amount, returnUrl }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = `${data.url}?token_ws=${data.token}`;
    } else {
      setResponse(data);
    }
  };
  return (
    <div>
      <h1>Pago con Webpay Plus</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Monto"
          required
        />
        <button type="submit">Pagar</button>
      </form>
      <a href="/"> volver </a>
    </div>
    
  );
}
