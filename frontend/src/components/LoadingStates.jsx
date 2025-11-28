import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...', className = '' }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
    };

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <Loader2 className={`animate-spin text-indigo-600 ${sizeClasses[size]}`} />
            {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
        </div>
    );
};

const PageLoader = ({ text = 'Loading...' }) => {
    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center">
            <div className="text-center">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin mx-auto"></div>
                    <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-purple-400 animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{text}</h3>
                <p className="mt-2 text-sm text-gray-600">Please wait a moment...</p>
            </div>
        </div>
    );
};

const CardLoader = ({ className = '' }) => {
    return (
        <div className={`card p-6 ${className}`}>
            <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
        </div>
    );
};

const TableLoader = ({ rows = 5, columns = 4 }) => {
    return (
        <div className="card overflow-hidden">
            <div className="animate-pulse">
                {/* Header */}
                <div className="border-b border-gray-200 bg-gray-50 p-4">
                    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                        {Array.from({ length: columns }).map((_, i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded w-20"></div>
                        ))}
                    </div>
                </div>
                
                {/* Rows */}
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="border-b border-gray-100 p-4 last:border-0">
                        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <div key={colIndex} className="h-3 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { LoadingSpinner, PageLoader, CardLoader, TableLoader };