const Task = ({ task = { title: 'Sample task', completed: false }, onTaskClick }) => {
    return (
        <div
            className="task"
            style={{ backgroundColor: task.completed ? "green" : "red" }}
            onClick={() => onTaskClick(task.id)}
        >
            <input type="checkbox" checked={task.completed} />
            {task.title}
        </div>
    );
};

export default Task;