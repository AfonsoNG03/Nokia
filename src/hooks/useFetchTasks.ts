import { useState, useEffect, useRef } from 'react';
import { fetchTasks } from '../services/taskService';
import { Task } from '../types';

export const useFetchTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchNewTasks = async () => {
        // Prevent race conditions
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        setIsLoading(true);

        try {
            const fetchedTasks: Task[] = await fetchTasks(abortControllerRef.current?.signal);
            setTasks(fetchedTasks);
            
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Request was aborted');
            } else {
                setError(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNewTasks();
        return () => abortControllerRef.current?.abort();
    }, []);

    return { tasks, error, isLoading, refetch: fetchNewTasks };
};
