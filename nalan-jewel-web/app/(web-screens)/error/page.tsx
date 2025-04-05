"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code') || '404';
    const message = searchParams.get('message') || 'Page not found';

    return (
        <>
            <Navbar />
            <main className="mt-[8vh] min-h-[92vh] flex flex-col items-center justify-center bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 p-8"
                >
                    <motion.h1
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        className="text-8xl font-bold text-[#34758f]"
                    >
                        {code}
                    </motion.h1>
                    
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {message}
                    </h2>
                    
                    <p className="text-gray-600 max-w-md mx-auto">
                        We apologize for the inconvenience. Please try again or return to our homepage.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/"
                            className="inline-block px-6 py-3 bg-[#34758f] text-white rounded-full hover:bg-[#116c96] transition-colors"
                        >
                            Return Home
                        </Link>
                    </motion.div>
                </motion.div>
            </main>
        </>
    );
}