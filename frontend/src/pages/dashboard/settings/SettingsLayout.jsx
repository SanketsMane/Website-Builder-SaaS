import { Link, Outlet, useLocation } from 'react-router-dom';
import { Settings, CreditCard, User } from 'lucide-react';

const SettingsLayout = () => {
    const location = useLocation();

    const tabs = [
        { name: 'General', href: '/dashboard/settings/general', icon: Settings },
        { name: 'Payments', href: '/dashboard/settings/payments', icon: CreditCard },
        // { name: 'Account', href: '/dashboard/settings/account', icon: User },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

            <div className="bg-white shadow rounded-lg">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                        {tabs.map((tab) => {
                            const isActive = location.pathname === tab.href;
                            return (
                                <Link
                                    key={tab.name}
                                    to={tab.href}
                                    className={`
                    group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                    ${isActive
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                                >
                                    <tab.icon
                                        className={`
                      -ml-0.5 mr-2 h-5 w-5
                      ${isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'}
                    `}
                                        aria-hidden="true"
                                    />
                                    {tab.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;
