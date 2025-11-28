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

  // Update
  const editTodo = async (id, updatedTask, updatedStatus) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: updatedTask, status: updatedStatus }),
    })
    fetchTodos()
  }

  // Delete
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
    })
    fetchTodos()
  }

  return (
    <div>
      <h1>Todo App</h1>

      <TodoForm onAdd={fetchTodos} />

      <h2>Todo List</h2>
      <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} />
    </div>
  )
}

export default App
