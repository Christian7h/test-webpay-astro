import React, { useState } from 'react';

function PaymentForm() {
  const [amount, setAmount] = useState(423);
  const [returnUrl, setReturnUrl] = useState('/');

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/createTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyOrder: 'order1234',
          sessionId: 'session1234',
          amount,
          returnUrl,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = `${data.url}?token_ws=${data.token}`;
      } else {
        console.error('Error initiating transaction:', response.statusText);
        alert('An error occurred while initiating the transaction.');
      }
    } catch (error) {
      console.error('Error initiating transaction:', error);
      alert('An error occurred while initiating the transaction.');
    }
  };

  return (
    <div>
      <h1>Pay with Webpay Plus</h1>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
          />
        </label>
      </div>
      <button onClick={handlePayment}>Pay with Webpay Plus</button>
    </div>
  );
}

export default PaymentForm;
