'use client';

import { motion } from 'framer-motion';

export default function LoadingBuffer() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <motion.div
                className="w-16 h-16 border-4 border-[#34758f] border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-4 text-gray-600">Loading...</p>
        </div>
    );
}