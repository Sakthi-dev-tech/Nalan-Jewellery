'use client';

import Link from "next/link";
import CategoryNavigation from "../../components/CategoryNavigationForHome";
import Navbar from "../../components/Navbar";
import { motion } from 'framer-motion';

interface WishlistItems {
    name: string;
    price: string;
    inStock: boolean;
    addedDate: Date;
    coverImage: string
}

const wishlistItems: WishlistItems[] = [
    {
        name: 'Sample Jewel 1',
        price: '1250',
        inStock: false,
        addedDate: new Date(),
        coverImage: '/images/Sample_Jewel_1.svg'
    },

    {
        name: 'Sample Jewel 2',
        price: '1500',
        inStock: true,
        addedDate: new Date(),
        coverImage: '/images/Sample_Jewel_2.svg'
    },

    {
        name: 'Sample Jewel 3',
        price: '2254',
        inStock: false,
        addedDate: new Date(),
        coverImage: '/images/Sample_Jewel_3.svg'
    },
]

export default function Wishlist() {

    return (
        <>
            <Navbar />
            <main className="mt-[8vh] pb-36 flex flex-col items-center select-none">
                <div className="h-[8vh] w-full flex flex-col items-center justify-evenly">
                    <CategoryNavigation />
                </div>

                <div className="w-full min-h-[60vh] flex flex-col items-center gap-8 mt-10">
                    <h1 className="text-5xl font-[family-name:var(--font-donegal-one)]">
                        Your Wishlist
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mt-8">
                        {wishlistItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <Link href='/product'>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                        className="relative h-96 overflow-hidden"
                                    >
                                        <img
                                            src={item.coverImage}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                </Link>

                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-semibold">{item.name}</h3>
                                        <span className="text-lg font-bold">${item.price}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">Status:</span>
                                        <span className={`text-sm font-medium ${item.inStock ? 'text-green-500' : 'text-red-500'
                                            }`}>
                                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        Added on: {item.addedDate.toLocaleDateString()}
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            disabled={!item.inStock}
                                            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${item.inStock
                                                    ? 'bg-[#927B0E] text-white hover:bg-[#7d690c]'
                                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            Add to Cart
                                        </button>
                                        <motion.button
                                            whileTap={{ scale: 0.90 }}
                                            className="p-2 rounded-full hover:bg-red-50"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}