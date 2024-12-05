import { Task } from "../types";

const baseUrl: string = 'http://localhost:3008/api/tasks/';

export const fetchTasks = async (signal: AbortSignal): Promise<Task[]> => {
    const response: Response = await fetch(baseUrl, { signal });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return response.json();
};
