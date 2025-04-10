import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  const addTask = () => {
    if (taskName.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          name: taskName,
          isCompleted: false,
          time: 0,
          isRunning: false,
        },
      ]);
      setTaskName("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const toggleTimer = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isRunning: !task.isRunning } : task
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.isRunning ? { ...task, time: task.time + 1 } : task
        )
      );
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="app">
      <h1>📝 Task Tracker with Timer</h1>
      <div className="add-task">
        <input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Add new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {tasks.map((task) => (
        <div key={task.id} className={`task ${task.isCompleted ? "done" : ""}`}>
          <span className="task-name">{task.name}</span>
          <span className="task-time">{formatTime(task.time)}</span>

          <button onClick={() => toggleTimer(task.id)}>
            {task.isRunning ? "Stop" : "Start"}
          </button>
          <button onClick={() => toggleComplete(task.id)}>
            {task.isCompleted ? "Undo" : "Done"}
          </button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
