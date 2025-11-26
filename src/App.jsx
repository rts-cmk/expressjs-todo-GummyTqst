import { useEffect, useState } from "react"
import TodoForm from "./Components/TodoForm/TodoForm"
import TodoList from "./Components/TodoList/TodoList"

function App() {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:3000/todos')
    const data = await response.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div>
      <h1>Todo App</h1>

      <TodoForm onAdd={fetchTodos} />

      <h2>Exsting Todo</h2>
      <TodoList todos={todos} />
    </div>
  )
}

export default App
