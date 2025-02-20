import Link from 'next/link';
import { motion } from 'framer-motion';
import { NunitoSans } from '@/public/fonts/fonts';

export default function Footer() {
    return (
        <footer className="bg-[#34758f] text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold mb-4">Nalan Jewelery</h3>
                        <p className="text-sm text-gray-200">
                            Crafting timeless elegance since 1990. Your trusted destination for fine jewelry and exceptional craftsmanship.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://facebook.com" className="hover:text-gray-300 transition-colors">
                                <i className="material-icons">facebook</i>
                            </Link>
                            <Link href="https://instagram.com" className="hover:text-gray-300 transition-colors">
                                <img src='/instagram-icon.svg' className='w-6 h-6 filter invert'/>
                            </Link>
                            <Link href="https://twitter.com" className="hover:text-gray-300 transition-colors">
                                <img src='/x-icon.svg' className='w-6 h-6 filter invert'/>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-sm hover:text-gray-300 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/products-list" className="text-sm hover:text-gray-300 transition-colors">
                                    Our Collections
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-sm hover:text-gray-300 transition-colors">
                                    Blog & News
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-sm hover:text-gray-300 transition-colors">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/faq" className="text-sm hover:text-gray-300 transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="text-sm hover:text-gray-300 transition-colors">
                                    Shipping Information
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-sm hover:text-gray-300 transition-colors">
                                    Returns & Exchanges
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2 text-sm">
                                <i className="material-icons text-sm">location_on</i>
                                <span>123 Jewelry Lane, Chennai, TN 600001</span>
                            </li>
                            <li className="flex items-center space-x-2 text-sm">
                                <i className="material-icons text-sm">phone</i>
                                <span>+91 123 456 7890</span>
                            </li>
                            <li className="flex items-center space-x-2 text-sm">
                                <i className="material-icons text-sm">email</i>
                                <span>info@nalanjewelery.com</span>
                            </li>
                            <li className="flex items-center space-x-2 text-sm">
                                <i className="material-icons text-sm">access_time</i>
                                <span>Mon - Sat: 10:00 AM - 8:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-600">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-300">
                            © 2024 Nalan Jewelery. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/privacy" className="text-sm text-gray-300 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-sm text-gray-300 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}