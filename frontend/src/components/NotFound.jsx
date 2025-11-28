import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center px-6">
            <div className="text-center max-w-md mx-auto">
                <div className="mb-8">
                    <div className="text-9xl font-bold gradient-text">404</div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Page not found
                </h1>
                
                <p className="text-lg text-gray-600 mb-8">
                    Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/" className="btn-primary">
                        <Home className="h-4 w-4 mr-2" />
                        Go Home
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()} 
                        className="btn-secondary"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Go Back
                    </button>
                </div>
                
                <div className="mt-12 p-6 card">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        <Search className="h-5 w-5 inline-block mr-2" />
                        Looking for something specific?
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                        <Link to="/login" className="block hover:text-indigo-600">Sign in to your account</Link>
                        <Link to="/signup" className="block hover:text-indigo-600">Create a new account</Link>
                        <Link to="/pricing" className="block hover:text-indigo-600">View pricing plans</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;