import '@testing-library/jest-dom/vitest';
import { it, expect, describe} from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../../src/components/home';
import React from 'react';


describe('Home', () => {

    it('should render h1 with text Home Page and p with text Welcome to the Home Page!', () => {
        render(<Home />);

        const heading = screen.getByRole('heading');

        expect(heading).toHaveTextContent(/Home Page/i);

        expect(screen.getByText(/Welcome to the Home Page/i)).toBeInTheDocument();

    });
})