import '@testing-library/jest-dom/vitest';
import { it, expect, describe, vi, afterEach} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Tasks from '../../src/components/tasks';
import React from 'react';
import * as hooks from '../../src/hooks/useFetchTasks';

vi.mock("../../src/hooks/useFetchTasks", () => ({
    useFetchTasks: vi.fn()
}));

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });
  

describe('Tasks', () => {

    it('should display loading state', () => {

        vi.spyOn(hooks, "useFetchTasks").mockReturnValue({
            tasks: [],
            error: null,
            isLoading: true,
            refetch: vi.fn()
        });

        render(<Tasks />);
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    it('should display message when there is a error', () => {
        vi.spyOn(hooks, "useFetchTasks").mockReturnValue({
            tasks: [],
            error: new Error('An error occurred'),
            isLoading: false,
            refetch: vi.fn()
        });

        render(<Tasks />);
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    })

    it('should display the fetched tasks', () => {
        vi.spyOn(hooks, "useFetchTasks").mockReturnValue({
            tasks: [
                { id: 1, text: 'Task 1', completed: false },
                { id: 2, text: 'Task 2', completed: true }
            ],
            error: null,
            isLoading: false,
            refetch: vi.fn()
        });

        render(<Tasks />);

        const heading = screen.getByRole('heading');

        expect(heading).toHaveTextContent(/Task List/i);

        screen.getByRole('list');

        const items = screen.getAllByRole('listitem');
        expect(items).toHaveLength(2);
        items.forEach((item, index) => {
            expect(item).toHaveTextContent(`Task ${index + 1} -`);

            if (item.textContent?.includes('Completed')) {
                expect(item).toHaveTextContent('Completed');
            } else {
                expect(item).toHaveTextContent('To do');
            }
        });
    })
})