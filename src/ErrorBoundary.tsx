import { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
        const errorDetails = {
            message: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            timestamp: new Date().toISOString()
        };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                    <div className="max-w-md w-full mx-6 p-8 bg-slate-900 border border-white/10 rounded-3xl text-center">
                        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto mb-6 rounded-2xl">
                            <span className="text-3xl">⚠</span>
                        </div>
                        <h1 className="text-2xl font-black mb-4 uppercase tracking-tight">System Error</h1>
                        <p className="text-slate-400 mb-8 font-medium">An unexpected error occurred in the AI Chain. Please reload the application.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl transition-all uppercase text-xs tracking-widest shadow-lg shadow-emerald-500/20"
                        >
                            Reload System
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
