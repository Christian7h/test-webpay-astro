// src/pages/api/createTransaction.json.ts
import { transaction } from '../../utils/transbankConfig';

export async function POST({ request }) {
  const { buyOrder, sessionId, amount, returnUrl } = await request.json();

  try {
    const response = await transaction.create(buyOrder, sessionId, amount, returnUrl);
    return new Response(
      JSON.stringify({
        token: response.token,
        url: response.url,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating transaction' }), { status: 500 });
  }
}