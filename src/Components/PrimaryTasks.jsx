import { useState } from 'react';
import Edit from '../images/edit.png';
import Task from './Task';


const taskList = [
    {
        id: 1,
        title: '10,000 steps',
        completed: true
    },
    {
        id: 2,
        title: 'Grocery shopping',
        completed: false
    },
    {
        id: 3,
        title: 'Clean litter box',
        completed: false
    }
]

const PrimaryTasks = () => {
    const [tasks, setTasks] = useState(taskList);
    const [editMode, setEditMode] = useState(false);

    const editTask = (id) => {
        setTasks(
            tasks.map((task) => task.id === id ? { ...task, title: 'New title' } : task)
        );
    }

    const toggleTask = (id) => {
        setTasks(
            tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task)
        );
    }

    return (
        <div className="task-list component">
            <header className="task-list-header">
                <h2>Primary Tasks</h2>
                <img src={Edit} alt="edit" onClick={() => setEditMode(!editMode)} />
            </header>
            {editMode && (
                <div className="edit-mode">
                    {tasks.map((task) => (
                        <div key={task.id} className="edit-task">
                            <input type="text" value={task.title} onChange={(e) => editTask(task.id, e.target.value)} />
                            <button onClick={() => editTask(task.id)}>Edit</button>
                        </div>
                    ))}
                    <button onClick={() => setEditMode(false)}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            )}
            {!editMode && (
                <div className="task-list-body">
                    {tasks.map((task) => (
                        <Task key={task.id} task={task} onTaskClick={toggleTask} />
                    ))}
                </div>
            )}

        </div>
    )
}

export default PrimaryTasks;