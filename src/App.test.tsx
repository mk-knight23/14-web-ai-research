import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => {
            const { initial, animate, whileInView, viewport, transition, ...rest } = props;
            return <div {...rest}>{children}</div>;
        },
        article: ({ children, ...props }: any) => {
            const { initial, whileInView, viewport, transition, ...rest } = props;
            return <article {...rest}>{children}</article>;
        },
    },
}));

describe('AI Chain Blog', () => {
    it('renders without crashing', () => {
        const { container } = render(<App />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('renders navigation with correct links', () => {
        render(<App />);
        expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
        expect(screen.getByText(/Tutorials/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Deep Dives/i)).toBeTruthy();
        expect(screen.getAllByText(/Tools/i)).toBeTruthy();
        expect(screen.getAllByText(/Newsletter/i)).toBeTruthy();
    });

    it('renders hero section', () => {
        render(<App />);
        expect(screen.getAllByText(/MASTER/i)).toBeTruthy();
        expect(screen.getAllByText(/LLM/i)).toBeTruthy();
        expect(screen.getAllByText(/ENGINEERING STACK/i)).toBeTruthy();
        expect(screen.getAllByText(/LangChain/i)).toBeTruthy();
    });

    it('renders tools grid', () => {
        render(<App />);
        expect(screen.getAllByText(/LangChain/i)).toBeTruthy();
        expect(screen.getByText(/Vector DBs/i)).toBeInTheDocument();
        expect(screen.getByText(/LLMs/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Agents/i)).toBeTruthy();
    });

    it('renders blog posts', () => {
        render(<App />);
        expect(screen.getByText(/Building RAG Pipelines/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Prompt Engineering/i)).toBeTruthy();
        expect(screen.getAllByText(/Agents/i)).toBeTruthy();
    });

    it('renders newsletter CTA', () => {
        render(<App />);
        expect(screen.getAllByText(/STAY/i)).toBeTruthy();
        expect(screen.getAllByText(/AHEAD/i)).toBeTruthy();
        expect(screen.getAllByText(/OF THE CURVE/i)).toBeTruthy();
        expect(screen.getByPlaceholderText(/your@email.com/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Subscribe/i })).toBeInTheDocument();
    });

    it('has proper ARIA labels for accessibility', () => {
        render(<App />);

        // Check for application role
        expect(screen.getByRole('application', { name: /AI Chain Blog/i })).toBeInTheDocument();

        // Check for main content
        expect(screen.getByRole('main')).toBeInTheDocument();

        // Check for footer
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders footer with social links', () => {
        render(<App />);
        expect(screen.getByLabelText(/Visit GitHub/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Visit Twitter/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Visit LinkedIn/i)).toBeInTheDocument();
    });
});
