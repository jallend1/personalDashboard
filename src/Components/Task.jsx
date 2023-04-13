const Task = ({ task = { title: 'Sample task', completed: false }, onTaskClick }) => {
    return (
        <div
            className="task"
            style={{ backgroundColor: task.completed ? "rgb(13, 142, 68, 0.3)" : "rgb(231, 64, 50, 0.3)" }}
            onClick={() => onTaskClick(task.id)}
        >
            <input type="checkbox" checked={task.completed} onChange={() => onTaskClick(task.id)} />
            {task.title}
        </div>
    );
};

export default Task;