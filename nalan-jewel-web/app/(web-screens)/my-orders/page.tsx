'use client';

import Link from "next/link";
import CategoryNavigation from "../../components/CategoryNavigationForHome";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { supabase } from "@/libs/supabase-client";
import LoadingBuffer from "@/app/components/LoadingBuffer";

interface OrderItem {
    id: string;
    productName: string;
    price: number;
    quantity: number;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    orderDate: string;
    estimatedDelivery?: string;
    imageID: string;
}

const statusColors = {
    Processing: 'bg-yellow-100 text-yellow-800',
    Shipped: 'bg-blue-100 text-blue-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800'
};

const jewelleryImagesURL = process.env.NEXT_PUBLIC_SUPABASE_JEWELLERY_IMAGES_URL
export default function MyOrder() {

    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const { isLoggedIn, user } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const fetchUserOrderedItems = async () => {
        try {
            const { data, error } = await supabase
                .from('User Orders')
                .select('orders')
                .eq('user_id', user?.id);

            if (error) {
                throw error;
            }

            setOrderItems(data[0].orders as OrderItem[]);
        } catch (error) {
            console.error('Error fetching user ordered items:', error);
            window.location.href = `/error?code=500&message=${encodeURIComponent('Error Fetching Your Orders')}`;
        }
    }

    useEffect(() => {
        setIsLoading(true);
        try {
            if (isLoggedIn && user) {
                fetchUserOrderedItems();
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [isLoggedIn]);

    return (
        <>
            <Navbar />
            <main className="mt-[8vh] pb-36 flex flex-col items-center select-none">
                <div className="h-[auto] w-full flex flex-col items-center justify-evenly">
                    <CategoryNavigation />
                </div>

                {
                    isLoading ? (
                        <LoadingBuffer />
                    ) : (

                        <div className="w-full max-w-4xl px-4 mt-8">
                            <h1 className="text-3xl font-semibold mb-8">My Orders</h1>

                            <div className="space-y-6">
                                {orderItems.map((order, index) => (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-lg shadow-md overflow-hidden"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start gap-6">
                                                <Link href='/product'>
                                                    <motion.img
                                                        whileHover={{ scale: 1.05 }}
                                                        src={`${jewelleryImagesURL}/med-res/${order.imageID}/1.svg`}
                                                        alt={order.productName}
                                                        className="w-24 h-24 object-cover rounded-md"
                                                    />
                                                </Link>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-lg font-semibold">{order.productName}</h3>
                                                            <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                                                            <p className="text-sm text-gray-600">
                                                                Ordered on {new Date(order.orderDate).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-bold">${order.price.toLocaleString()}</p>
                                                            <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 flex items-center justify-between">
                                                        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>

                                                    {order.estimatedDelivery && (
                                                        <p className="mt-2 text-sm text-gray-600">
                                                            {order.status !== "Delivered" ?
                                                                `Estimated Delivery: ${new Date(order.estimatedDelivery).toLocaleDateString()}` :
                                                                `Delivered on: ${new Date(order.estimatedDelivery).toLocaleDateString()}`
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )
                }
            </main>
        </>
    );
}