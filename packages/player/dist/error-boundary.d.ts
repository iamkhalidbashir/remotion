import React from 'react';
export declare class ErrorBoundary extends React.Component<{
    onError: (error: Error) => void;
}, {
    hasError: boolean;
}> {
    state: {
        hasError: boolean;
    };
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error): void;
    render(): React.ReactNode;
}
//# sourceMappingURL=error-boundary.d.ts.map