import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const initialTasks = [
    { text: "Practice React Hooks concepts", completed: false },
    { text: "Revise JavaScript ES6 features", completed: false },
    { text: "Solve 5 coding problems", completed: false },
    { text: "Update resume with latest skills", completed: false },
    { text: "Push project to GitHub", completed: false },
    { text: "Apply for frontend developer jobs", completed: false },
    { text: "Prepare for technical interview", completed: false },
    { text: "Learn basic system design concepts", completed: false },
  ];

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.title = "Smart Task Tracker"; // Browser tab title
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const remainingCount = tasks.length - completedCount;

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <div className="todo-box">
        <h1>Smart Task Tracker</h1>
        <p className="subtitle">Manage your daily productivity efficiently</p>

        <button 
          className="mode-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <div className="input-section">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task"
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className="counter">
          Total: {tasks.length} | Completed: {completedCount} | Remaining: {remainingCount}
        </div>

        <ul>
          {tasks.map((t, index) => (
            <li key={index} className={t.completed ? "completed" : ""}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleComplete(index)}
                />
                <div className="task-text">{t.text}</div>
              </div>
              <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
