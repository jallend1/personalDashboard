const Task = ({ task = { title: 'Sample task', completed: false }, onTaskClick }) => {
    return (
        <div
            className="task"
            style={{ backgroundColor: task.completed ? "green" : "red" }}
            onClick={() => onTaskClick(task.id)}
        >
            {task.title}
        </div>
    );
};

export default Task;