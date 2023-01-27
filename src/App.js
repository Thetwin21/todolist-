import { useEffect, useRef, useState } from "react";
import "./App.css";
import TodoList from "./component/TodoList";

const { v4: uuidv4 } = require("uuid");
const LOCAL_STORAGE_KEY = 'detwins';
function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])
  

  useEffect(() => {
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  

const toggleTodo = (id) =>{
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}

  const handleAddTodo = (event) => {
    let name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevValues) => [
      ...prevValues,
      { id: uuidv4(), name: name, complete: false },
    ]);
    todoNameRef.current.value = null;
  };
  // delete completed todos
  const handleClearTodos = (e) => {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }


  return (
    <div className="todoListContainer">
      <h1>TODO LIST</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <div className="btn">
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleClearTodos}>Clear Complete</button>
      </div>
      <div>
        <h4>{todos.filter(todo => !todo.complete).length} Todo left</h4>
      </div>
    </div>
  );
}

export default App;
