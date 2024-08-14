// src/components/PaymentForm.jsx
import React, { useState } from 'react';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [returnUrl, setReturnUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/initTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, returnUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url; // Redirige al usuario para completar la transacción
      } else {
        setError(data.error || 'Failed to initiate transaction');
      }
    } catch (err) {
      setError('An error occurred while initiating the transaction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Pay with Webpay Plus</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Return URL:
            <input
              type="text"
              value={returnUrl}
              onChange={(e) => setReturnUrl(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay with Webpay Plus'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
