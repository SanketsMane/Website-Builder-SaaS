import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Zap, Layout, BarChart, Star, Globe, Shield, Smartphone, Menu, X, Moon, Sun } from 'lucide-react';
import Footer from '../../components/Footer';
import { HeroDemo } from '../../components/HeroDemo';

const LandingPage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('darkMode') === 'true' || 
                   (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    return (
        <div className="gradient-bg min-h-screen transition-colors duration-300">
            {/* Navbar */}
            <header className="absolute inset-x-0 top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-700/50 transition-colors duration-300">
                <nav className="flex items-center justify-between py-3 px-4 lg:px-6" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5 group">
                            <span className="sr-only">Sellpoint.io</span>
                            <span className="text-2xl font-bold gradient-text dark:text-white group-hover:scale-105 transition-transform duration-200">Sellpoint.io</span>
                        </Link>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-8">
                        <a href="#features" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">Features</a>
                        <Link to="/pricing" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">Pricing</Link>
                        <Link to="/about" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">About</Link>
                    </div>
                    <div className="flex lg:flex-1 lg:justify-end gap-x-3">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="btn-secondary p-2 hidden sm:inline-flex"
                            title="Toggle theme"
                        >
                            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>
                        <Link to="/login" className="btn-secondary hidden sm:inline-flex">Log in</Link>
                        <Link to="/signup" className="btn-primary">
                            <span className="hidden sm:inline">Get Started</span>
                            <span className="sm:hidden">Sign Up</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden btn-secondary p-2"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </nav>
                
                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
                        <div className="px-4 py-3 space-y-3">
                            <a href="#features" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">Features</a>
                            <Link to="/pricing" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">Pricing</Link>
                            <Link to="/about" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">About</Link>
                            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                                <Link to="/login" className="btn-secondary w-full">Log in</Link>
                                <Link to="/signup" className="btn-primary w-full">
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Modern Hero Section with Mockup */}
            <HeroDemo />

            {/* Features Section */}
            <div id="features" className="bg-white dark:bg-gray-900 py-24 sm:py-32 relative overflow-hidden transition-colors duration-300">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center mb-20">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">Everything Included</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                            Everything you need to <span className="gradient-text">sell online</span>
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                            From inventory management to payment processing, we've got you covered with enterprise-grade features.
                        </p>
                    </div>
                    
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
                            <div className="bg-white dark:bg-gray-800 p-8 text-center group hover:scale-105 transition-all duration-300 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:shadow-lg group-hover:shadow-indigo-200 dark:group-hover:shadow-indigo-900/50 transition-all duration-300">
                                    <Zap className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">Google Sheets Sync</h3>
                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                                    Manage inventory directly from Google Sheets. Real-time sync keeps everything updated instantly.
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-8 text-center group hover:scale-105 transition-all duration-300 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:shadow-lg group-hover:shadow-cyan-200 dark:group-hover:shadow-cyan-900/50 transition-all duration-300">
                                    <Layout className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">Custom Design</h3>
                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                                    Drag-and-drop design builder with professional templates. No coding required.
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-8 text-center group hover:scale-105 transition-all duration-300 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 group-hover:shadow-lg group-hover:shadow-green-200 dark:group-hover:shadow-green-900/50 transition-all duration-300">
                                    <BarChart className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">Real-time Analytics</h3>
                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                                    Track sales, visitors, and performance with detailed insights and beautiful charts.
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-8 text-center group hover:scale-105 transition-all duration-300 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 group-hover:shadow-lg group-hover:shadow-orange-200 dark:group-hover:shadow-orange-900/50 transition-all duration-300">
                                    <Check className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">Order Management</h3>
                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                                    Streamlined order processing with automated notifications and status tracking.
                                </p>
                            </div>
                        </dl>
                    </div>

                    {/* Additional Features Grid */}
                    <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Secure Payments</h4>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">PCI-compliant payment processing with Stripe integration</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <Smartphone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Mobile Optimized</h4>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Responsive design that looks perfect on all devices</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <Globe className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Custom Domain</h4>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Use your own domain name for professional branding</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* CTA Section */}
            <div className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors duration-300">
                <div className="mx-auto max-w-4xl text-center px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        Ready to start selling?
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Join thousands of entrepreneurs who have built successful online stores with Sellpoint.io
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup" className="btn-primary text-base px-6 py-3">
                            Start Your Free Store
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <Link to="/pricing" className="btn-outline text-base px-6 py-3">
                            View Pricing Plans
                        </Link>
                    </div>
                    <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                        No credit card required • 14-day free trial • Cancel anytime
                    </p>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default LandingPage;
