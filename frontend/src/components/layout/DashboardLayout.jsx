import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useStoreStore from '../../store/storeStore';
import {
    Home,
    Layout,
    ShoppingBag,
    Ticket,
    ClipboardList,
    BarChart2,
    Settings,
    LogOut,
    User,
    Plus,
    ChevronDown,
    ExternalLink,
    Menu,
    X
} from 'lucide-react';

const DashboardLayout = () => {
    const { user, logout } = useAuthStore();
    const { stores, currentStore, fetchStores, setCurrentStore } = useStoreStore();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navigation = [
        { name: 'Home', href: '/dashboard', icon: Home },
        { name: 'Design', href: '/dashboard/design', icon: Layout },
        { name: 'Products', href: '/dashboard/products', icon: ShoppingBag },
        { name: 'Coupons', href: '/dashboard/coupons', icon: Ticket },
        { name: 'Orders', href: '/dashboard/orders', icon: ClipboardList },
        { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-cyan-50">
                        <Link to="/" className="gradient-text text-xl font-bold">Sellpoint.io</Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg group transition-all duration-200 ${isActive
                                            ? 'bg-gradient-to-r from-indigo-50 to-cyan-50 text-indigo-700 shadow-sm border-r-2 border-indigo-500'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1'
                                        }`}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <item.icon className={`mr-3 h-5 w-5 transition-colors duration-200 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Store Switcher */}
                    <div className="border-t border-gray-200 p-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsStoreDropdownOpen(!isStoreDropdownOpen)}
                                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 focus:outline-none"
                            >
                                <span className="truncate">{currentStore ? currentStore.name : 'Select Store'}</span>
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            </button>

                            {isStoreDropdownOpen && (
                                <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                    <div className="py-1">
                                        {stores.map((store) => (
                                            <button
                                                key={store.id}
                                                onClick={() => {
                                                    setCurrentStore(store);
                                                    setIsStoreDropdownOpen(false);
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                {store.name}
                                            </button>
                                        ))}
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <Link
                                            to="/create-store"
                                            className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 font-medium"
                                            onClick={() => setIsStoreDropdownOpen(false)}
                                        >
                                            <div className="flex items-center">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Create New Store
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden btn-secondary p-2"
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        <div className="flex-1 flex justify-end items-center space-x-3">
                            {currentStore && (
                                <a
                                    href={`${window.location.protocol}//${currentStore.username}.${window.location.host.split('.').slice(1).join('.') || 'localhost:5173'}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden sm:flex btn-secondary"
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Open Store
                                </a>
                            )}

                            {user?.plan === 'FREE' && (
                                <Link
                                    to="/dashboard/subscription"
                                    className="btn-primary bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                                >
                                    Upgrade to Pro
                                </Link>
                            )}

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center max-w-xs bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                        {user?.name?.charAt(0).toUpperCase() || <User className="h-5 w-5" />}
                                    </div>
                                </button>

                                {isProfileDropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <div className="flex items-center">
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Sign out
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto gradient-bg p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
