import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleTaskInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTask(event);
    }
  };

  const handleAddTask = (event) => {
    event.preventDefault();

    if (task.trim() !== "") {
      setTodoList([...todoList, { task: task, completed: false }]);
      setTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedList = [...todoList];
    updatedList.splice(index, 1);
    setTodoList(updatedList);
  };

  const handleToggleCompleted = (index) => {
    const updatedList = [...todoList];
    updatedList[index].completed = !updatedList[index].completed;
    setTodoList(updatedList);
  };

  const handleClearCompleted = () => {
    setTodoList([]);
  };

  let filteredTodoList = todoList;
  if (filter === "active") {
    filteredTodoList = todoList.filter((todo) => !todo.completed);
  } else if (filter === "completed") {
    filteredTodoList = todoList.filter((todo) => todo.completed);
  }

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={handleAddTask}>
            <input
              className="new-todo"
              name="task"
              placeholder="What needs to be done?"
              autoFocus
              value={task}
              onChange={handleTaskInputChange}
              onKeyDown={handleKeyDown}
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {filteredTodoList.map((todo, index) => (
              <li key={index} className={todo.completed ? "completed" : ""}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleCompleted(index)}
                  />
                  <label>{todo.task}</label>
                  <button
                    className="destroy"
                    onClick={() => handleDeleteTask(index)}
                  ></button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{todoList.filter((todo) => !todo.completed).length}</strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={filter === "all" ? "selected" : ""}
                onClick={() => setFilter("all")}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="#/"
                className={filter === "active" ? "selected" : ""}
                onClick={() => setFilter("active")}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/"
                className={filter === "completed" ? "selected" : ""}
                onClick={() => setFilter("completed")}
              >
                Completed
              </a>
            </li>
          </ul>

          <button className="clear-completed" onClick={handleClearCompleted}>
            Clear completed
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Created by Erdi Salgın</p>
      </footer>
    </>
  );
}

export default App;
