const fs = require('fs');

const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'tasks.json');

/**
 * Controller to get all tasks.
 * Reads the tasks.json file and returns the parsed list.
 */
function getAllTasks(req, res) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler as tarefas.' });
    }
    const tasks = JSON.parse(data);
    res.json(tasks);
  });
}

/**
 * Controller to add a new task.
 * Receives JSON object and appends to tasks.json.
 */
function addTask(req, res) {
  const newTask = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler tarefas.' });
    }

    const tasks = JSON.parse(data);
    tasks.push(newTask);

    fs.writeFile(filePath, JSON.stringify(tasks, null, 2), err => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao salvar tarefa.' });
      }
      res.status(201).json({ message: 'Tarefa adicionada com sucesso!' });
    });
  });
}

/**
 * Controller to update a task.
 * Finds task by ID and updates the content.
 */
function updateTask(req, res) {
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

    fs.writeFile(filePath, JSON.stringify(tasks, null, 2), err => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
      }
      res.json({ message: 'Tarefa atualizada com sucesso!' });
    });
  });
}

/**
 * Controller to delete a task by ID.
 * Removes the task from the JSON file.
 */
function deleteTask(req, res) {
  const taskId = req.params.id;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler tarefas.' });
    }

    let tasks = JSON.parse(data);
    const filteredTasks = tasks.filter(task => task.id != taskId);

    fs.writeFile(filePath, JSON.stringify(filteredTasks, null, 2), err => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao deletar tarefa.' });
      }
      res.json({ message: 'Tarefa deletada com sucesso!' });
    });
  });
}

module.exports = { getAllTasks, addTask, updateTask, deleteTask };