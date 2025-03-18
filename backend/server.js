const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importar cors

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200', // Permitir solicitudes desde este origen
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
})); // Usar cors para permitir solicitudes desde cualquier origen

app.post('/generate-pdf', async (req, res) => {
  const invoiceData = req.body;

  try {
    const response = await axios.post(
      'https://api.pdfmonkey.io/api/v1/documents',
      {
        document: {
          document_template_id: '943E4342-96CD-4492-AFD1-7709D450A7DC',
          status: 'pending',
          payload: invoiceData,
          meta: {
            _filename: `${invoiceData.orderDate} ${invoiceData.clientName} ${invoiceData.invoiceNumber}.pdf`,
            clientRef: 'cliente-123',
            webhook_url: 'https://ilmondo.herokuapp.com/pdf-webhook' // URL de tu webhook
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer bRzrMx1xbAqQQvnvxWMy`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ message: 'Solicitud de generación de PDF enviada con éxito' });
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    res.status(500).json({ error: 'Error al generar el PDF' });
  }
});

app.post('/pdf-webhook', async (req, res) => {
  const { document } = req.body;

  if (document.status === 'success') {
    const pdfUrl = document.download_url;
    const invoiceNumber = document.payload.invoiceNumber;

    try {
      // Descargar el PDF y guardarlo en el servidor
      const pdfResponse = await axios.get(pdfUrl, { responseType: 'stream' });
      const pdfPath = path.join(__dirname, 'pdfs', `${invoiceNumber}.pdf`);
      pdfResponse.data.pipe(fs.createWriteStream(pdfPath));

      console.log('PDF generado y almacenado con éxito:', pdfPath);
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
    }
  } else if (document.status === 'failure') {
    console.error('Error en la generación del PDF:', document.failure_cause);
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
