'use client';

import { motion } from 'framer-motion';

export default function LoadingBuffer() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#927B0E]" />
            <p className="mt-4 text-gray-600">Loading...</p>
        </div>
    );
}