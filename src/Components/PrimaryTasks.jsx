import Task from './Task';

const tasks = [
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
        title: 'Clean gecko tank',
        completed: false
    }
]

const PrimaryTasks = () => {
    return (
        <div className="task-list component">
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    )
}

export default PrimaryTasks;