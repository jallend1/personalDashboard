import { useState } from 'react';
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

    const toggleTask = (id) => {
        setTasks(
            tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task)
        );
    }

    return (
        <div className="task-list component">
            {tasks.map((task) => (
                <Task key={task.id} task={task} onTaskClick={toggleTask} />
            ))}
        </div>
    )
}

export default PrimaryTasks;