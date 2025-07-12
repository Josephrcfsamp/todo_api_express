// 🇺🇸 Import express module
const express = require('express');

// 🇺🇸 Create express application
const app = express();

// 🇺🇸 Define server port
const PORT = 3000;

/** 
 * Middleware for task routes
 * All requests to /tasks will be redirected to the corresponding route file
*/
const tasksRoutes = require('./src/routes/tasks');
app.use('/tasks', tasksRoutes);


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