import { Task } from '../types';
import { useState, useEffect, useRef } from 'react';

const baseUrl: string = 'http://localhost:3008/api/tasks/';


export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const lastTaskIdRef = useRef<number>(-1); 

    
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

            const newTasks = fetchedTasks.filter(task => task.id > lastTaskIdRef.current);

            if (newTasks.length > 0) {
                lastTaskIdRef.current = newTasks[newTasks.length - 1].id; // Update last seen task ID
                setTasks(prevTasks => [...prevTasks, ...newTasks]);
            }

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
        const intervalId = setInterval(() => {
            fetchNewTasks();
        }, 60000);

        return () => {
            clearInterval(intervalId);
        }
    },[]);
    
    if (isLoading) {
        return <>Loading...</>;
    }

    if (error) {
        return <>Something went wrong! Please try again.</>;
    }
  
    return (
      <>
        <div className="row mb-3 mt-5">
            <h1>Task List</h1>
        </div>
        <div className="row ms-3">
            <ul>
                {tasks.map((task: Task) => (
                    <li key={task.id}>{task.text} - {task.completed ? 'Completed!' : 'To be done.'}</li>
                ))}
            </ul>
            </div>
      </>
    );
  }
  