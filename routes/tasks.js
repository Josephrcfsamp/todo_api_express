/** Task API test route
 * This route responds to GET requests with a simple message 
 * indicating that the API is working properly. 
*/
const express = require('express');
const router = express.Router();

// Rota de teste
router.get('/', (req, res) => {
  res.send('API de tarefas funcionando!');
});

module.exports = router;