import { useState } from "react"

export default function TodoList({ todos, onDelete, onEdit }) {
    const [editingId, setEditingId] = useState(null)
    const [editingTask, setEditingTask] = useState('')
    const [editingStatus, setEditingStatus] = useState('')

    const handleEditClick = (todo) => {
        setEditingId(todo.id)
        setEditingTask(todo.task)
        setEditingStatus(todo.status)
    }

    const handleSaveClick = (id) => {
        onEdit(id, editingTask, editingStatus)
        setEditingId(null)
        setEditingTask('')
        setEditingStatus('')
    }

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <li key={todo.id} className="todo-list__item">
                    {editingId === todo.id ? (
                        <>
                            <input
                                className="todo-list__edit-input"
                                type="text"
                                value={editingTask}
                                onChange={(e) => setEditingTask(e.target.value)}
                            />
                            <select
                                className="todo-list__edit-select"
                                value={editingStatus}
                                onChange={(e) => setEditingStatus(e.target.value)}
                            >
                                <option value="not completed">Not Completed</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>

                            <button onClick={() => handleSaveClick(todo.id)} className="todo-list__btn todo-list__btn--save" >Save</button>
                            <button onClick={() => setEditingId(null)} className="todo-list__btn todo-list__btn--cancel">Cancel</button>
                        </>
                    ) : (
                        <>
                            {todo.task} - {todo.status}
                            <button onClick={() => handleEditClick(todo)} className="todo-list__btn todo-list__btn--edit">Edit</button>
                            <button onClick={() => onDelete(todo.id)} className="todo-list__btn todo-list__btn--delete">Delete</button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    )
}