import { useState } from "react";

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task name"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
    
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="not completed">Not Completed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
    
            <button type="submit">
                Add Todo
            </button>
        </form>
      );
}