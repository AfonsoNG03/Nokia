import '@testing-library/jest-dom/vitest';
import { it, expect, describe, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from '../../src/components/App';
import React from 'react';
import * as hooks from '../../src/hooks/useFetchTasks';

vi.mock("../../src/hooks/useFetchTasks", () => ({
    useFetchTasks: vi.fn()
}));

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

describe('Main App', () => {
    
    it('should have a new app heading and a sidebar', () => {
        render(<App />);
        
        screen.getByRole('heading', { name: /New App/i });

        screen.getByRole('navigation');

        screen.getByRole('list');
        
        const navListItems = screen.getAllByRole('listitem');
        expect(navListItems).toHaveLength(2);
        expect(navListItems[0]).toHaveTextContent(/Home/i);
        expect(navListItems[1]).toHaveTextContent(/Tasks/i);
    });

    it('should initially show the Home component', () => {
        vi.spyOn(hooks, "useFetchTasks").mockReturnValue({
            tasks: [
                { id: 1, text: 'Task 1', completed: false },
                { id: 2, text: 'Task 2', completed: true }
            ],
            error: null,
            isLoading: false,
            refetch: vi.fn()
        });
        render(<App />);

        screen.getByRole('heading', { name: /Home Page/i });

        expect(screen.queryByText(/Task List/i)).not.toBeInTheDocument();
    })

    it('should show the Tasks component after clicking the tasks link', () => {
        vi.spyOn(hooks, "useFetchTasks").mockReturnValue({
            tasks: [
                { id: 1, text: 'Task 1', completed: false },
                { id: 2, text: 'Task 2', completed: true }
            ],
            error: null,
            isLoading: false,
            refetch: vi.fn()
        });
        render(<App />);

        const tasksLink = screen.getByText("Tasks");
        fireEvent.click(tasksLink);

        screen.getByRole('heading', { name: /Task List/i });

        expect(screen.queryByText(/Home Page/i)).not.toBeInTheDocument();
    })

    it('should return to the Home component after clicking the home link', () => {
        vi.spyOn(hooks, "useFetchTasks").mockReturnValue({
            tasks: [
                { id: 1, text: 'Task 1', completed: false },
                { id: 2, text: 'Task 2', completed: true }
            ],
            error: null,
            isLoading: false,
            refetch: vi.fn()
        });
        render(<App />);

        const tasksLink = screen.getByText("Tasks");
        fireEvent.click(tasksLink);

        screen.getByRole('heading', { name: /Task List/i });

        expect(screen.queryByText(/Home Page/i)).not.toBeInTheDocument();

        const homeLink = screen.getByText("Home");
        fireEvent.click(homeLink);

        screen.getByRole('heading', { name: /Home Page/i });

        expect(screen.queryByText(/Task List/i)).not.toBeInTheDocument();
    })
})