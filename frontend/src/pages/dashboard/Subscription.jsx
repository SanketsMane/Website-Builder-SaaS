import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useSubscriptionStore from '../../store/subscriptionStore';
import { Check, CreditCard } from 'lucide-react';

const Subscription = () => {
    const { user } = useAuthStore();
    const { createCheckoutSession, createPortalSession, loading, error } = useSubscriptionStore();
    const [searchParams] = useSearchParams();

    const isPro = user?.plan === 'PRO';

    useEffect(() => {
        if (searchParams.get('success')) {
            alert('Subscription successful! Your account has been upgraded.');
        }
        if (searchParams.get('canceled')) {
            alert('Subscription canceled.');
        }
    }, [searchParams]);

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Subscription Plan</h1>

            {error && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Current Plan: <span className={`font-bold ${isPro ? 'text-indigo-600' : 'text-gray-600'}`}>{user?.plan || 'FREE'}</span>
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Manage your subscription and billing details.
                    </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isPro ? 'Active' : 'Free Tier'}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Features</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div className="w-0 flex-1 flex items-center">
                                            <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                                            <span className="ml-2 flex-1 w-0 truncate">Unlimited Products</span>
                                        </div>
                                    </li>
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div className="w-0 flex-1 flex items-center">
                                            <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                                            <span className="ml-2 flex-1 w-0 truncate">Custom Domain (Coming Soon)</span>
                                        </div>
                                    </li>
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div className="w-0 flex-1 flex items-center">
                                            <Check className={`flex-shrink-0 h-5 w-5 ${isPro ? 'text-green-500' : 'text-gray-300'}`} />
                                            <span className={`ml-2 flex-1 w-0 truncate ${!isPro && 'text-gray-400'}`}>Priority Support (Pro only)</span>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end">
                    {isPro ? (
                        <button
                            onClick={createPortalSession}
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Manage Subscription
                        </button>
                    ) : (
                        <button
                            onClick={createCheckoutSession}
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <CreditCard className="-ml-1 mr-2 h-5 w-5" />
                            Upgrade to Pro
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Subscription;
