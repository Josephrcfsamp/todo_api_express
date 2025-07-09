const fs = require('fs');

const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'tasks.json');

/**
 * POST route to add a new task.
 * This route receives a JSON object with task data
 * and stores it in the tasks.json file, simulating a database.
 */
router.post('/', (req, res) => {
  const newTask = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler tarefas.' });
    }

    const tasks = JSON.parse(data);
    
    tasks.push(newTask);

    fs.writeFile(filePath, JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao salvar tarefa.' });
      }

      res.status(201).json({ message: 'Tarefa adicionada com sucesso!' });
    });
  });
});

/**
 * GET route to retrieve all tasks.
 * This route reads the tasks.json file
 * and returns the list of tasks in JSON format.
 */
router.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler as tarefas.' });
    }

    const tasks = JSON.parse(data);
    res.json(tasks);
  });
});