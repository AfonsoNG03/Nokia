import { Task } from '../types';
import { useState, useEffect, useRef } from 'react';

const baseUrl: string = 'http://localhost:3008/api/tasks/';


export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchNewTasks = async () => {

        // To prevent race conditions
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        setIsLoading(true);

        try {
            const response: Response = await fetch(baseUrl, { signal: abortControllerRef.current?.signal });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const fetchedTasks: Task[] = await response.json();
            setTasks(fetchedTasks);

        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Request was aborted');
                return;
            }

            setError(error);

        } finally {
            setIsLoading(false);
        }

    };

    useEffect(() => {
        fetchNewTasks();
    }, []);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (error) {
        return <>Something went wrong! Please try again.</>;
    }

    return (
        <>
            <div className="row mb-3 mt-5 ms-3">
                <h1>Task List</h1>
            </div>

            <div className="row ms-3">
                <ul className="list-group list-group-flush">
                    {tasks.map((task: Task) => (
                        <li className="list-group-item" key={task.id}>{task.text} - {task.completed ? 
                            <span className="badge text-bg-success">Completed</span> :
                            <span className="badge text-bg-danger">To do</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
