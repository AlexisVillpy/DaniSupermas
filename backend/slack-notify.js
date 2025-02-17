const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/slack-notify', async (req, res) => {
  const { message } = req.body;
  console.log('Mensaje recibido para enviar a Slack:', message);

  try {
    const response = await axios.post('https://slack.com/api/chat.postMessage', {
      channel: 'C08DK63EYNP',
      text: message,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Respuesta de Slack:', response.data);
    res.status(200).json({ message: 'Notificación enviada a Slack' });
  } catch (error) {
    console.error('Error al enviar notificación a Slack:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error al enviar notificación a Slack' });
  }
});

module.exports = router;