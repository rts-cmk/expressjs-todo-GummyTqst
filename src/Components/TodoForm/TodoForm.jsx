import { useState } from "react";
import "../TodoForm/TodoForm.sass"

export default function TodoForm({ onAdd }) {
    const [task, setTask] = useState('');
    const [status, setStatus] = useState('not completed');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!task.trim()) return

        await fetch ('http://localhost:3000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task, status}),
        });

        setTask('')
        setStatus('not completed')
        onAdd();
    }

    return (
        <form onSubmit={handleSubmit} className="todo-form" >
            <input
                className="todo-form__input"
                type="text"
                placeholder="Task name"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
    
            <select
                className="todo-form__select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="not completed">Not Completed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
    
            <button type="submit" className="todo-form__button">
                Add Todo
            </button>
        </form>
      );
}