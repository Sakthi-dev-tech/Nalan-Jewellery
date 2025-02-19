'use client';

import Link from "next/link";
import CategoryNavigation from "../components/CategoryNavigationForHome";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

interface OrderItem {
    id: string;
    productName: string;
    price: number;
    quantity: number;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    orderDate: string;
    estimatedDelivery?: string;
    trackingNumber?: string;
    image: string;
}

const sampleOrders: OrderItem[] = [
    {
        id: "ORD001",
        productName: "Gold Chain Necklace",
        price: 45000,
        quantity: 1,
        status: "Delivered",
        orderDate: "2024-02-15",
        estimatedDelivery: "2024-02-25",
        image: "/images/sample_jewel_1.svg"
    },
    {
        id: "ORD002",
        productName: "Diamond Stud Earrings",
        price: 25000,
        quantity: 2,
        status: "Shipped",
        orderDate: "2024-02-10",
        estimatedDelivery: "2024-02-20",
        trackingNumber: "TRK123456789",
        image: "/images/sample_jewel_2.svg"
    },
    {
        id: "ORD003",
        productName: "Diamond Stud Earrings",
        price: 25000,
        quantity: 2,
        status: "Cancelled",
        orderDate: "2024-02-10",
        estimatedDelivery: "2024-02-20",
        trackingNumber: "TRK123456789",
        image: "/images/sample_jewel_3.svg"
    }
];

const statusColors = {
    Processing: 'bg-yellow-100 text-yellow-800',
    Shipped: 'bg-blue-100 text-blue-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800'
};

export default function MyOrder() {
    return (
        <>
            <Navbar />
            <main className="mt-[8vh] pb-36 flex flex-col items-center select-none">
                <div className="h-[8vh] w-full flex flex-col items-center justify-evenly">
                    <CategoryNavigation />
                </div>

                <div className="w-full max-w-4xl px-4 mt-8">
                    <h1 className="text-3xl font-semibold mb-8">My Orders</h1>

                    <div className="space-y-6">
                        {sampleOrders.map((order, index) => (
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
                                                src={order.image}
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
                                                {order.trackingNumber && (
                                                    <p className="text-sm text-gray-600">
                                                        Tracking: {order.trackingNumber}
                                                    </p>
                                                )}
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
            </main>
        </>
    );
}