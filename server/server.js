const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { transaction } = require('../src/utils/transbankConfig'); // Importa la configuración existente

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Ruta para iniciar una transacción de Webpay
app.post('/api/initTransaction', async (req, res) => {
  try {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;
    const response = await transaction.create(buyOrder, sessionId, amount, returnUrl);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para finalizar una transacción de Webpay
app.post('/api/commitTransaction', async (req, res) => {
  try {
    const { token } = req.body;
    const response = await transaction.commit(token);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
