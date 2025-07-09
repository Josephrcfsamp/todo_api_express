const express = require('express');
const router = express.Router();

// Rota de teste
router.get('/', (req, res) => {
  res.send('API de tarefas funcionando!');
});

module.exports = router;