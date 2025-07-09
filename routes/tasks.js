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

/**
 * PUT route to update a task.
 * This route receives a task ID as URL parameter and a new task object in the request body.
 * It updates the corresponding task in the tasks.json file.
 */
router.put('/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler tarefas.' });
    }

    const tasks = JSON.parse(data);
    const taskIndex = tasks.findIndex(task => task.id == taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };

    fs.writeFile(filePath, JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
      }

      res.json({ message: 'Tarefa atualizada com sucesso!' });
    });
  });
});

/**
 * DELETE route to remove a task.
 * This route receives a task ID as URL parameter
 * and removes the corresponding task from the tasks.json file.
 * Useful for managing dynamic user input and maintaining up-to-date records.
 */
router.delete('/:id', (req, res) => {
  const taskId = req.params.id;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler tarefas.' });
    }

    let tasks = JSON.parse(data);
    const newTasks = tasks.filter(task => task.id !== taskId);

    if (tasks.length === newTasks.length) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    fs.writeFile(filePath, JSON.stringify(newTasks, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao excluir tarefa.' });
      }

      res.json({ message: 'Tarefa removida com sucesso!' });
    });
  });
});