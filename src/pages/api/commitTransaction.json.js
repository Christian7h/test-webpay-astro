import { WebpayPlus } from 'transbank-sdk';
import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk';

export async function get({ url }) {
  const token_ws = url.searchParams.get('token_ws');

  const tx = new WebpayPlus.Transaction(new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  ));

  try {
    const response = await tx.commit(token_ws);

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
