import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Moon, Sun, Menu, X, Zap, Users, Globe, Shield, Heart, Target, Award, CheckCircle } from 'lucide-react';
import { Glow } from '../../components/ui/glow';
import Footer from '../../components/Footer';

const AboutPage = () => {
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

    const stats = [
        { name: 'Active Stores', value: '10,000+', icon: <Globe className="w-6 h-6" /> },
        { name: 'Products Sold', value: '1M+', icon: <Award className="w-6 h-6" /> },
        { name: 'Countries', value: '50+', icon: <Users className="w-6 h-6" /> },
        { name: 'Uptime', value: '99.9%', icon: <Shield className="w-6 h-6" /> },
    ];

    const team = [
        {
            name: 'Alex Johnson',
            role: 'Co-Founder & CEO',
            description: 'Former e-commerce executive with 10+ years building online businesses.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
        },
        {
            name: 'Sarah Chen',
            role: 'Co-Founder & CTO',
            description: 'Full-stack engineer passionate about making technology accessible to everyone.',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
        },
        {
            name: 'Mike Rodriguez',
            role: 'Head of Product',
            description: 'Product designer focused on creating intuitive user experiences.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
        },
    ];

    const values = [
        {
            icon: <Heart className="w-6 h-6" />,
            title: 'Customer First',
            description: 'Every decision we make is centered around helping our customers succeed and grow their businesses.'
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: 'Innovation',
            description: 'We constantly push the boundaries of what\'s possible in e-commerce technology.'
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: 'Reliability',
            description: 'Our platform is built to be dependable, secure, and always available when you need it.'
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: 'Simplicity',
            description: 'We believe powerful tools should be simple to use. No complexity, just results.'
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
                        <Link to="/pricing" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">Pricing</Link>
                        <Link to="/about" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 font-semibold transition-colors duration-200">About</Link>
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
                            <Link to="/pricing" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">Pricing</Link>
                            <Link to="/about" className="block text-indigo-600 dark:text-indigo-400 font-semibold">About</Link>
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

            <div className="relative">
                {/* Hero Section */}
                <div className="pt-24 pb-16 sm:pt-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-4xl text-center">
                            <div className="inline-flex items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6 animate-appear">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Building the Future of E-commerce
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl animate-appear">
                                We're on a mission to make 
                                <span className="block bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                    e-commerce accessible
                                </span>
                                to everyone
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-appear opacity-0 [animation-delay:150ms]">
                                Sellpoint.io was born from the belief that creating an online store shouldn't require 
                                technical expertise or a huge budget. We're democratizing e-commerce, one store at a time.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="py-16 border-y border-gray-200/50 dark:border-gray-700/50">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                            {stats.map((stat, index) => (
                                <div key={stat.name} className="flex flex-col items-center text-center animate-appear opacity-0" style={{animationDelay: `${300 + (index * 100)}ms`}}>
                                    <div className="flex items-center justify-center w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl mb-4">
                                        <div className="text-indigo-600 dark:text-indigo-400">
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.name}</dt>
                                    <dd className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</dd>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Story Section */}
                <div className="py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
                            </div>
                            
                            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
                                <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
                                    <p>
                                        In 2024, our founders noticed a problem: while e-commerce was booming, the tools to 
                                        create online stores were either too expensive, too complex, or both. Small business 
                                        owners were struggling to get online, missing out on the digital revolution.
                                    </p>
                                    <p>
                                        That's when we decided to build Sellpoint.io - a platform that would remove all 
                                        barriers to e-commerce. No coding required, no hefty monthly fees, no complicated 
                                        setup processes. Just a simple, powerful tool that lets anyone create a 
                                        professional online store in minutes.
                                    </p>
                                    <p>
                                        Today, we're proud to power thousands of online stores across the globe, helping 
                                        entrepreneurs turn their ideas into successful businesses. But we're just getting started.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="py-16 bg-gray-50/50 dark:bg-gray-900/50">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                These principles guide everything we do and shape how we build products for our customers.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {values.map((value) => (
                                <div key={value.title} className="text-center">
                                    <div className="flex items-center justify-center w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl mx-auto mb-4">
                                        <div className="text-indigo-600 dark:text-indigo-400">
                                            {value.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                We're a passionate group of builders, dreamers, and problem-solvers working to 
                                democratize e-commerce for everyone.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {team.map((member) => (
                                <div key={member.name} className="text-center group">
                                    <div className="relative mb-6 mx-auto w-48 h-48 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-300">
                                        <img 
                                            src={member.image} 
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-2">{member.role}</p>
                                    <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="relative bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl px-8 py-16 text-center shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold text-white mb-4">Ready to join our mission?</h2>
                                <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                                    Whether you're starting your first online store or scaling your existing business, 
                                    we're here to help you succeed.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link 
                                        to="/signup" 
                                        className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        Start Building Today
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                    <Link 
                                        to="/pricing" 
                                        className="inline-flex items-center px-8 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                                    >
                                        View Pricing
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default AboutPage;