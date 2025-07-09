// 🇺🇸 Import express module
const express = require('express');

// 🇺🇸 Create express application
const app = express();

// 🇺🇸 Define server port
const PORT = 3000;

// 🇺🇸 Middleware to parse JSON request body
app.use(express.json());

// 🇺🇸 Initial test route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// 🇺🇸 Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});