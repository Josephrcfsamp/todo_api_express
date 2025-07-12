const fs = require('fs');
const path = require('path');

// Caminho do banco de dados local (arquivo JSON)
// Local path to the local "database"
const dbPath = path.join(__dirname, '../../db.json');

// Função utilitária para ler o banco de dados
// Utility function to read the database
function readDB() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

// Função utilitária para escrever no banco de dados
// Utility function to write to the database
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

// GET /tasks
exports.getTasks = (req, res) => {
  const data = readDB();
  res.json(data.tasks);
};

// POST /tasks
exports.createTask = (req, res) => {
  const data = readDB();
  const newTask = {
    id: Date.now().toString(),
    title: req.body.title || 'Untitled Task',
    done: false,
  };
  data.tasks.push(newTask);
  writeDB(data);
  res.status(201).json(newTask);
};

// PUT /tasks/:id
exports.updateTask = (req, res) => {
  const data = readDB();
  const task = data.tasks.find(t => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.title = req.body.title ?? task.title;
  task.done = req.body.done ?? task.done;

  writeDB(data);
  res.json(task);
};

// DELETE /tasks/:id
exports.deleteTask = (req, res) => {
  const data = readDB();
  const index = data.tasks.findIndex(t => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const removed = data.tasks.splice(index, 1)[0];
  writeDB(data);
  res.json(removed);
};
