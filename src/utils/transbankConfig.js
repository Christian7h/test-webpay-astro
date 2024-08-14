// src/utils/transbankConfig.js
import { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk';

const webpayOptions = new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS, // Código de comercio para el ambiente de integración
  IntegrationApiKeys.WEBPAY,            // API Key para el ambiente de integración
  Environment.Integration               // Ambiente de integración
);

export const transaction = new WebpayPlus.Transaction(webpayOptions);
