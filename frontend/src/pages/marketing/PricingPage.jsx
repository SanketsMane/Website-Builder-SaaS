import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, ArrowRight, Moon, Sun, Menu, X, Zap, Shield, Users } from 'lucide-react';
import { Glow } from '../../components/ui/glow';
import Footer from '../../components/Footer';

const PricingPage = () => {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('darkMode') === 'true' || 
                   (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    const tiers = [
        {
            name: 'Starter',
            id: 'tier-starter',
            href: '/signup',
            priceMonthly: '$0',
            description: 'Perfect for getting started with your first online store.',
            features: [
                '1 Store',
                'Up to 50 Products',
                'Basic Analytics Dashboard',
                'Google Sheets Sync',
                'Standard Support',
                'SSL Security',
            ],
            featured: false,
            icon: <Users className="w-6 h-6" />,
        },
        {
            name: 'Professional',
            id: 'tier-pro',
            href: '/signup',
            priceMonthly: '$29',
            description: 'Everything you need to scale and grow your business.',
            features: [
                'Unlimited Stores',
                'Unlimited Products', 
                'Advanced Analytics & Reports',
                'Real-time Google Sheets Sync',
                'Priority Support (24/7)',
                'Custom Domain',
                'Remove Sellpoint Branding',
                'Advanced SEO Tools',
                'Abandoned Cart Recovery',
                'Inventory Management',
            ],
            featured: true,
            icon: <Zap className="w-6 h-6" />,
        },
        {
            name: 'Enterprise',
            id: 'tier-enterprise',
            href: '/contact',
            priceMonthly: 'Custom',
            description: 'Advanced features and dedicated support for large teams.',
            features: [
                'Everything in Professional',
                'Multi-location Support',
                'Advanced API Access',
                'White-label Solution',
                'Dedicated Account Manager',
                'Custom Integrations',
                'SLA Guarantee',
                'Training & Onboarding',
            ],
            featured: false,
            icon: <Shield className="w-6 h-6" />,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
            {/* Header */}
            <header className="absolute inset-x-0 top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-700/50 transition-colors duration-300">
                <nav className="flex items-center justify-between py-3 px-4 lg:px-6" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5 group">
                            <span className="sr-only">Sellpoint.io</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">Sellpoint.io</span>
                        </Link>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-8">
                        <Link to="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">Features</Link>
                        <Link to="/pricing" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 font-semibold transition-colors duration-200">Pricing</Link>
                        <Link to="/about" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">About</Link>
                    </div>
                    <div className="flex lg:flex-1 lg:justify-end gap-x-3">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hidden sm:inline-flex"
                            title="Toggle theme"
                        >
                            {darkMode ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-gray-600" />}
                        </button>
                        <Link to="/login" className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Log in</Link>
                        <Link to="/signup" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-500 dark:to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                            <span className="hidden sm:inline">Get Started</span>
                            <span className="sm:hidden">Sign Up</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </nav>
                
                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
                        <div className="px-4 py-3 space-y-3">
                            <Link to="/" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">Features</Link>
                            <Link to="/pricing" className="block text-indigo-600 dark:text-indigo-400 font-semibold">Pricing</Link>
                            <Link to="/about" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">About</Link>
                            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                                <Link to="/login" className="block w-full text-center py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Log in</Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Glow color="indigo" className="absolute -top-20 -right-20 animate-appear-zoom opacity-0 [animation-delay:1000ms]" />
                <Glow color="cyan" className="absolute -bottom-20 -left-20 animate-appear-zoom opacity-0 [animation-delay:1200ms]" />
            </div>

            <div className="relative pt-24 pb-16 sm:pt-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mx-auto max-w-4xl text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6 animate-appear">
                            <Star className="w-4 h-4 mr-2" />
                            Simple, Transparent Pricing
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl animate-appear">
                            Choose the perfect plan for your
                            <span className="block bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                online business
                            </span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-appear opacity-0 [animation-delay:150ms]">
                            Start free, scale as you grow. No hidden fees, no long-term contracts. 
                            Upgrade or downgrade anytime.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6 xl:gap-8 max-w-6xl mx-auto">
                        {tiers.map((tier, tierIdx) => (
                            <div
                                key={tier.id}
                                className={`relative rounded-2xl p-8 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] animate-appear opacity-0 ${
                                    tier.featured
                                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 ring-2 ring-indigo-500'
                                        : 'bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50'
                                }`}
                                style={{animationDelay: `${300 + (tierIdx * 150)}ms`}}
                            >
                                {tier.featured && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-sm font-semibold rounded-full shadow-lg">
                                            <Star className="w-4 h-4 mr-2" />
                                            Most Popular
                                        </div>
                                    </div>
                                )}
                                
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg ${
                                        tier.featured 
                                            ? 'bg-white/10 dark:bg-gray-900/10' 
                                            : 'bg-indigo-50 dark:bg-indigo-900/30'
                                    }`}>
                                        <div className={tier.featured ? 'text-white dark:text-gray-900' : 'text-indigo-600 dark:text-indigo-400'}>
                                            {tier.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold">{tier.name}</h3>
                                </div>
                                
                                <p className={`text-sm leading-6 mb-6 ${
                                    tier.featured ? 'text-gray-300 dark:text-gray-600' : 'text-gray-600 dark:text-gray-300'
                                }`}>
                                    {tier.description}
                                </p>
                                
                                <div className="flex items-baseline gap-x-2 mb-8">
                                    <span className="text-4xl font-bold tracking-tight">
                                        {tier.priceMonthly}
                                    </span>
                                    {tier.priceMonthly !== 'Custom' && (
                                        <span className={`text-sm font-semibold ${
                                            tier.featured ? 'text-gray-300 dark:text-gray-600' : 'text-gray-600 dark:text-gray-400'
                                        }`}>
                                            /month
                                        </span>
                                    )}
                                </div>
                                
                                <Link
                                    to={tier.href}
                                    className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 mb-8 ${
                                        tier.featured
                                            ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 shadow-lg'
                                            : 'bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-500 dark:to-cyan-500 text-white hover:shadow-xl hover:scale-[1.02]'
                                    }`}
                                >
                                    {tier.priceMonthly === 'Custom' ? 'Contact Sales' : 'Get Started'}
                                </Link>
                                
                                <ul className="space-y-3">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className={`h-5 w-5 flex-none mt-0.5 ${
                                                tier.featured ? 'text-white dark:text-gray-900' : 'text-indigo-600 dark:text-indigo-400'
                                            }`} />
                                            <span className={`text-sm leading-6 ${
                                                tier.featured ? 'text-gray-300 dark:text-gray-600' : 'text-gray-600 dark:text-gray-300'
                                            }`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-24 max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Frequently asked questions
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Can't find the answer you're looking for? Contact our support team.
                            </p>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I change my plan later?</h3>
                                <p className="text-gray-600 dark:text-gray-300">Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
                            </div>
                            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What payment methods do you accept?</h3>
                                <p className="text-gray-600 dark:text-gray-300">We accept all major credit cards, PayPal, and bank transfers for enterprise customers.</p>
                            </div>
                            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Is there a free trial?</h3>
                                <p className="text-gray-600 dark:text-gray-300">Yes! Our Starter plan is completely free forever. No credit card required to get started.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default PricingPage;
