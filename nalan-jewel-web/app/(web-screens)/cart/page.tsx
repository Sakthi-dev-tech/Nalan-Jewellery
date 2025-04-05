'use client';

import { useEffect, useState } from "react";
import CategoryNavigation from "../../components/CategoryNavigationForHome";
import Navbar from "../../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/libs/supabase-client";
import { useAuth } from "@/app/contexts/AuthContext";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    maxQuantity: number;
    coverImage: string;
    modifications?: string;
}

const jewelleryImagesURL = process.env.NEXT_PUBLIC_SUPABASE_JEWELLERY_IMAGES_URL
export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);
    const [IDArray, setIDArray] = useState<number[]>([]);

    const { isLoggedIn, user } = useAuth()

    const handleQuantityChange = (id: number, newQuantity: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.min(Math.max(1, newQuantity), item.maxQuantity) }
                    : item
            )
        );
    };

    const handleDelete = (item: CartItem) => {
        setItemToDelete(item);
    };

    const confirmDelete = async () => {
        if (itemToDelete) {
            setCartItems(items => items.filter(item => item.id !== itemToDelete.id));

            const { error } = await supabase
                .from('Cart')
                .update({
                    id_of_jewels: IDArray.filter(id => id !== itemToDelete.id)
                })
                .eq('user_id', user?.id);

            if (error) {
                window.location.href = `/error?code=500&message=${encodeURIComponent('Error Deleting Item from Cart')}`;
                return;
            }

            setItemToDelete(null);
        }
    };

    const cartItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 }
    };

    const bottomBarVariants = {
        hidden: { y: 100 },
        visible: { y: 0 }
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
            setCartItems(prev => {
                const newItems = data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1,
                    maxQuantity: item.numInStock,
                    inStock: item.numInStock > 0,
                    coverImage: `${jewelleryImagesURL}/med-res/${item.id}/1.svg`,
                    modifications: ''
                }));
                return [...newItems];
            });
        }
    }

    const fetchUserCartItems = async () => {
        if (!user) return;

        const { data, error } = await supabase
            .from('Cart')
            .select('id_of_jewels')
            .eq('user_id', user.id);

        if (error) {
            console.error('Error fetching cart items:', error);
            window.location.href = `/error?code=500&message=${encodeURIComponent('Error Fetching Your Cart Items')}`;
            return;
        }

        if (data) {
            fetchJewelleriesWithIDs(data[0].id_of_jewels);
            setIDArray(data[0].id_of_jewels);
        }
    };

    useEffect(() => {
        fetchUserCartItems();
    }, [isLoggedIn])

    return (
        <>
            <Navbar />
            <main className="mt-[8vh] pb-36 flex flex-col items-center select-none">
                <div className="h-[8vh] w-full flex flex-col items-center justify-evenly">
                    <CategoryNavigation />
                </div>

                <div className="w-full max-w-4xl px-4 mt-8">
                    <h1 className="text-4xl font-[family-name:var(--font-donegal-one)] mb-8">
                        Shopping Cart
                    </h1>

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {cartItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    variants={cartItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="flex gap-4 bg-[#F5F9FA] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <Link href='/product'>
                                        <motion.img
                                            whileHover={{ scale: 1.05 }}
                                            src={item.coverImage}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-md"
                                        />
                                    </Link>
                                    <div className="flex-1 flex justify-between items-start">
                                        {/* Left side - Name */}
                                        <div className="flex flex-col gap-2 max-w-[60%]">
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <textarea
                                                placeholder="Add any modifications (optional)"
                                                value={item.modifications || ''}
                                                onChange={(e) => {
                                                    setCartItems(items =>
                                                        items.map(cartItem =>
                                                            cartItem.id === item.id
                                                                ? { ...cartItem, modifications: e.target.value }
                                                                : cartItem
                                                        )
                                                    );
                                                }}
                                                className="w-full h-20 px-3 py-2 text-sm text-gray-700 border rounded-md 
                      resize-none bg-white focus:outline-none focus:ring-1 
                      focus:ring-[#927B0E] focus:border-[#927B0E]"
                                            />
                                        </div>

                                        {/* Right side - Price and Controls */}
                                        <div className="flex flex-col items-end gap-4">
                                            <p className="text-lg font-bold text-[#927B0E]">${item.price.toLocaleString()}</p>

                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center border rounded-lg overflow-hidden bg-white">
                                                    <motion.button
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        className="px-3 py-1 border-r hover:bg-gray-100 transition-colors"
                                                    >
                                                        -
                                                    </motion.button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                                        className="w-14 text-center py-1 outline-none text-gray-800 bg-transparent [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    />
                                                    <motion.button
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        className="px-3 py-1 border-l hover:bg-gray-100 transition-colors"
                                                    >
                                                        +
                                                    </motion.button>
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDelete(item)}
                                                    className="text-red-500 hover:text-red-600 transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                <AnimatePresence>
                    {itemToDelete && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        >
                            <motion.div
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.95 }}
                                className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
                            >
                                <h3 className="text-lg font-semibold mb-4">Remove Item</h3>
                                <p className="text-gray-600 mb-6">
                                    Are you sure you want to remove "{itemToDelete.name}" from your cart?
                                </p>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => setItemToDelete(null)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Fixed Bottom Bar */}
                <motion.div
                    variants={bottomBarVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, type: "spring" }}
                    className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40"
                >
                    <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <p className="text-sm text-gray-600">Total Amount</p>
                            <p className="text-2xl font-bold">${totalPrice.toLocaleString()}</p>
                        </motion.div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#927B0E] text-white px-8 py-3 rounded-full hover:bg-[#7d690c] transition-colors"
                        >
                            Proceed to Buy
                        </motion.button>
                    </div>
                </motion.div>
            </main>
        </>
    );
}