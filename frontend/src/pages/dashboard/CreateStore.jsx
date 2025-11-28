import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStoreStore from '../../store/storeStore';
import { Store, Globe, Check, X } from 'lucide-react';

const CreateStore = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isAvailable, setIsAvailable] = useState(null);
    const [checking, setChecking] = useState(false);

    const { createStore, checkAvailability, loading, error } = useStoreStore();
    const navigate = useNavigate();

    const handleUsernameChange = async (e) => {
        const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
        setUsername(value);
        setIsAvailable(null);

        if (value.length > 2) {
            setChecking(true);
            const available = await checkAvailability(value);
            setIsAvailable(available);
            setChecking(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAvailable) return;

        try {
            await createStore({ name, username });
            navigate('/dashboard');
        } catch (err) {
            // Error handled by store
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow rounded-lg p-8">
                <div className="text-center mb-8">
                    <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Store className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                        Create your store
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Let's get started by naming your store and choosing a unique URL.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Store Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="My Awesome Store"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Store URL
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Globe className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="username"
                                required
                                className={`block w-full pl-10 pr-12 border rounded-md py-2 focus:outline-none sm:text-sm ${isAvailable === true
                                        ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                                        : isAvailable === false
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                    }`}
                                placeholder="my-store"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">.yourdomain.com</span>
                            </div>
                        </div>
                        {username.length > 2 && (
                            <p className={`mt-2 text-sm ${isAvailable ? 'text-green-600' : isAvailable === false ? 'text-red-600' : 'text-gray-500'
                                }`}>
                                {checking ? 'Checking availability...' : isAvailable ? (
                                    <span className="flex items-center"><Check className="w-4 h-4 mr-1" /> Available</span>
                                ) : isAvailable === false ? (
                                    <span className="flex items-center"><X className="w-4 h-4 mr-1" /> Taken</span>
                                ) : null}
                            </p>
                        )}
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !isAvailable}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Store'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateStore;
