import { Link } from 'react-router-dom';
import { 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin, 
    Mail, 
    Phone, 
    MapPin,
    ArrowRight,
    Heart
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: 'Features', href: '#features' },
            { name: 'Templates', href: '#templates' },
            { name: 'Integrations', href: '#integrations' },
            { name: 'Pricing', href: '/pricing' },
            { name: 'API', href: '#api' }
        ],
        company: [
            { name: 'About Us', href: '#about' },
            { name: 'Careers', href: '#careers' },
            { name: 'Press', href: '#press' },
            { name: 'Contact', href: '#contact' },
            { name: 'Blog', href: '#blog' }
        ],
        resources: [
            { name: 'Documentation', href: '#docs' },
            { name: 'Help Center', href: '#help' },
            { name: 'Community', href: '#community' },
            { name: 'Tutorials', href: '#tutorials' },
            { name: 'Webinars', href: '#webinars' }
        ],
        legal: [
            { name: 'Privacy Policy', href: '#privacy' },
            { name: 'Terms of Service', href: '#terms' },
            { name: 'Cookie Policy', href: '#cookies' },
            { name: 'GDPR', href: '#gdpr' }
        ]
    };

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, href: '#' },
        { name: 'Twitter', icon: Twitter, href: '#' },
        { name: 'Instagram', icon: Instagram, href: '#' },
        { name: 'LinkedIn', icon: Linkedin, href: '#' }
    ];

    return (
        <footer className="bg-gray-900 text-white">
            {/* Newsletter Section */}
            <div className="bg-gray-800 py-12 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-3 text-gray-100">
                            Stay updated with our latest features
                        </h3>
                        <p className="text-base text-gray-400 mb-6 max-w-xl mx-auto">
                            Get notified about new templates, integrations, and tips to grow your online business.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2.5 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-0"
                            />
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                        {/* Brand Section */}
                        <div className="lg:col-span-2">
                            <Link to="/" className="inline-block">
                                <span className="text-2xl font-bold gradient-text">Sellpoint.io</span>
                            </Link>
                            <p className="mt-4 text-gray-300 text-sm leading-6 max-w-xs">
                                The easiest way to build and manage your online store. 
                                Trusted by thousands of entrepreneurs worldwide.
                            </p>
                            
                            {/* Contact Info */}
                            <div className="mt-6 space-y-3">
                                <div className="flex items-center text-sm text-gray-300">
                                    <Mail className="h-4 w-4 mr-3 text-indigo-400" />
                                    hello@sellpoint.io
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <Phone className="h-4 w-4 mr-3 text-indigo-400" />
                                    +1 (555) 123-4567
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <MapPin className="h-4 w-4 mr-3 text-indigo-400" />
                                    San Francisco, CA
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-6 flex space-x-4">
                                {socialLinks.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <span className="sr-only">{item.name}</span>
                                        <item.icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Product Links */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Product</h3>
                            <ul className="space-y-3">
                                {footerLinks.product.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources Links */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
                            <ul className="space-y-3">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal Links */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h3>
                            <ul className="space-y-3">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Sellpoint.io. All rights reserved.
                        </p>
                        <p className="text-gray-400 text-sm mt-4 md:mt-0 flex items-center">
                            Made with <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" /> for entrepreneurs
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;