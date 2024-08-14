// src/pages/api/commitTransaction.json.js

import { transaction } from '../../utils/transbankConfig';

export async function get({ url }) {
  const token_ws = url.searchParams.get('token_ws');

  try {
    const response = await transaction.commit(token_ws);

    if (response.response_code === 0) {
      return new Response(
        JSON.stringify({
          message: 'Transacción exitosa',
          details: response,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: 'Transacción fallida',
          details: response,
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Error al confirmar la transacción',
        error: error.message,
      }),
      { status: 500 }
    );
  }
}