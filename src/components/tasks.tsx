import { useFetchTasks } from '../hooks/useFetchTasks';

export default function Tasks() {
    
    const { tasks, error, isLoading } = useFetchTasks();

    if (isLoading) 
        return <>Loading...</>;

    if (error) 
        return <>Something went wrong! Please try again.</>;

    return (
        <>
            {/* Header */}
            <div className="row mb-3 mt-5 ms-3">
                <h1>Task List</h1>
            </div>
            {/* Header */}
            {/* Task List */}
            <div className="row ms-3">
                <ul className="list-group list-group-flush">
                    {tasks.map((task) => (
                        <li className="list-group-item" key={task.id}>
                            {task.text} -{' '}
                            {task.completed ? (
                                <span className="badge text-bg-success">Completed</span>
                            ) : (
                                <span className="badge text-bg-danger">To do</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Task List */}
        </>
    );
}
