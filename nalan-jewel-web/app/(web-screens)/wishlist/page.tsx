'use client';

import Link from "next/link";
import CategoryNavigation from "../../components/CategoryNavigationForHome";
import Navbar from "../../components/Navbar";
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from "@/libs/supabase-client";
import { useAuth } from "@/app/contexts/AuthContext";

interface WishlistItems {
    id: number;
    name: string;
    price?: string;
    inStock?: boolean;
    coverImage: string;
}

const jewelleryImagesURL = process.env.NEXT_PUBLIC_SUPABASE_JEWELLERY_IMAGES_URL as string;

export default function Wishlist() {
    const { isLoggedIn, user } = useAuth();
    const [wishlistItems, setWishlistItems] = useState<WishlistItems[]>([]);
    const [IDArray, setIDArray] = useState<number[]>([]);


    const removeWishlistItem = async (itemID: number, index: number) => {
        // Remove from visual list
        setWishlistItems(current => current.filter((_, i) => i !== index));
        
        // Remove from ID array
        setIDArray(current => current.filter(id => id !== itemID));
    
        // Update database
        const { error } = await supabase
                .rpc('remove_jewel_from_wishlist', { product_id: Number(itemID), uid: user?.id });
    
        if (error) {
            window.location.href = `/error?code=500&message=${encodeURIComponent('Error Updating Wishlist')}`;
            return;
        }
    };

    const fetchJewelleriesWithIDs = async (id_array: number[]) => {
        const { data, error } = await supabase
            .from('Jewellery Data')
            .select('*')
            .in('id', id_array);

        if (error) {
            console.error('Error fetching jewellery data:', error);
            window.location.href = `/error?code=500&message=${encodeURIComponent('Error Fetching Jewellery Data')}`;
            return;
        }

        if (data) {
            setWishlistItems(prev => {
                const newItems = data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    inStock: item.numInStock > 0,
                    coverImage: `${jewelleryImagesURL}/med-res/${item.id}/1.svg`
                }));
                return [...newItems];
            });
        }
    }

    const fetchUserWishlist = async () => {
        if (!user) return;

        const { data, error } = await supabase
            .from('Wishlist')
            .select('id_of_jewels')
            .eq('user_id', user.id);

        if (error) {
            console.error('Error fetching wishlist items:', error);
            window.location.href = `/error?code=500&message=${encodeURIComponent('Error Fetching Jewellery Data')}`;
            return;
        }

        if (data) {
            fetchJewelleriesWithIDs(data[0].id_of_jewels);
            setIDArray(data[0].id_of_jewels);
        }
    };

    const handleAddToCart = async (id: number) => {
        const { data, error } = await supabase
            .from('Cart')
            .insert({ 
                user_id: user?.id, 
                jewel_id: id,
                quantity: 1,
                modifications: ''
            });
    }

    useEffect(() => {
        fetchUserWishlist();
    }, [isLoggedIn])

    return (
        <>
            <Navbar />
            <main className="mt-[8vh] pb-36 flex flex-col items-center select-none">
                <div className="h-[8vh] w-full flex flex-col items-center justify-evenly">
                    <CategoryNavigation />
                </div>

                <LayoutGroup>
                    <div className="w-full min-h-[60vh] flex flex-col items-center gap-8 mt-10">
                        <motion.h1
                            layout
                            className="text-5xl font-[family-name:var(--font-donegal-one)]"
                        >
                            Your Wishlist
                        </motion.h1>

                        {!isLoggedIn ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center space-y-6 p-8"
                            >
                                <i className="material-icons text-6xl text-gray-300">lock</i>
                                <h2 className="text-2xl font-semibold text-gray-800">Please Log In</h2>
                                <p className="text-gray-600">Log in to view and manage your wishlist</p>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <button
                                        onClick={() => window.location.href = "/"}
                                        className="inline-block px-6 py-3 bg-[#34758f] text-white rounded-full hover:bg-[#116c96] transition-colors"
                                    >
                                        Return Home
                                    </button>
                                </motion.div>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mt-8">
                                <AnimatePresence mode="sync">
                                    {wishlistItems.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                transition: {
                                                    duration: 0.3,
                                                    delay: index * 0.1
                                                }
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.8,
                                                transition: { duration: 0.2 }
                                            }}
                                            layout
                                            layoutId={item.name}
                                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                        >
                                            <Link href={`/product?product_id=${item.id}`}>
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
                                                <motion.div
                                                    layout
                                                    className="flex justify-between items-start"
                                                >
                                                    <h3 className="text-xl font-semibold">{item.name}</h3>
                                                    <span className="text-lg font-bold">${item.price}</span>
                                                </motion.div>

                                                <motion.div
                                                    layout
                                                    className="flex items-center gap-2"
                                                >
                                                    <span className="text-sm">Status:</span>
                                                    <span className={`text-sm font-medium ${item.inStock ? 'text-green-500' : 'text-red-500'
                                                        }`}>
                                                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                                                    </span>
                                                </motion.div>

                                                <motion.div
                                                    layout
                                                    className="flex gap-3"
                                                >
                                                    <button
                                                        disabled={!item.inStock}
                                                        className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${item.inStock
                                                            ? 'bg-[#927B0E] text-white hover:bg-[#7d690c]'
                                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                            }`}
                                                        onClick={() => {
                                                            // Add to card and remove it from wishlist
                                                            handleAddToCart(item.id)
                                                            removeWishlistItem(item.id, index)
                                                        }}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                    <motion.button
                                                        whileTap={{ scale: 0.90 }}
                                                        className="p-2 rounded-full hover:bg-red-50"
                                                        onClick={async () => await removeWishlistItem(item.id, index)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </motion.button>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </LayoutGroup>
            </main>
        </>
    );
}