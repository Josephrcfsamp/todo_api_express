// Import the file system utility functions
const { readTasks, writeTasks } = require("../utils/fileManager");

//Get all tasks from the JSON file.
const getAllTasks = (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
};

//Create a new task and save it to the JSON file.
const createTask = (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: Date.now().toString(),
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
};

 //Update an existing task by ID.
const updateTask = (req, res) => {
  const tasks = readTasks();
  const taskId = req.params.id;
  const updatedTask = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  writeTasks(tasks);
  res.json(tasks[taskIndex]);
};

//Delete a task by ID.
const deleteTask = (req, res) => {
  let tasks = readTasks();
  const taskId = req.params.id;

  const filteredTasks = tasks.filter((task) => task.id !== taskId);

  if (filteredTasks.length === tasks.length) {
    return res.status(404).json({ message: "Task not found" });
  }

  writeTasks(filteredTasks);
  res.json({ message: "Task deleted successfully" });
};

// Export all controller functions
module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};