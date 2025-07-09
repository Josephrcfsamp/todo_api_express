const fs = require("fs");

const path = require("path");

// Get the absolute path to the JSON file
const filePath = path.join(__dirname, "..", "data", "tasks.json");

//Read tasks from the JSON file
function readTasks() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading tasks:", err);
    return [];
  }
}

//Write tasks to the JSON files
function writeTasks(tasks) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing tasks:", err);
  }
}

// Export the functions so they can be used in other files
module.exports = {
  readTasks,
  writeTasks,
};
