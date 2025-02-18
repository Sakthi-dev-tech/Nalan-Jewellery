"use client";

import { useState } from "react";
import CategoryNavigation from "../components/CategoryNavigationForHome";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

interface BaseDetails {
    icon: string;
    [key: string]: string | number;
}

interface JewelryDetailsType {
    'Product Details': {
        [key: string]: BaseDetails;
    };
}

const jewelryDetails: JewelryDetailsType = {
    'Product Details': {
        'Metal Details': {
            icon: '/file.svg',
            'Karratage': '22K',
            'Material Colour': 'Yellow Gold',
            'Gross Weight': '5.902g',
            'Metal': 'Gold',
            'Height': '16mm',
            'Width': '18mm'
        },

        'General Details': {
            icon: '/globe.svg',
            'Jewelry Type': 'Gold Jewelry',
            'Product Type': 'Studs',
            'Brand': "Nalan Jewel",
            'Collection': 'Nalan Jewel Collection',
            'Gender': 'Women',
            'Occassion': 'Traditional and Ethnic Wear'
        },

        'Description': {
            icon: '/window.svg',
            'description': 'These gorgeous 22 Karat gold studs feature a round base accented with artistic cutout and bead detailing.\n\nThe ornate artistry of these stud earrings is enough to elevate the beauty of your traditional festive ensembles. Save this pair for grand festivities and auspicious celebrations.'
        }
    }
}

interface PriceBreakdown {
    productDetail: string;
    productIcon?: string;  // Optional icon path
    productSubtitle?: string; // Optional subtitle
    rate: string | number;
    weight: string;
    discount: string;
    value: string;
    isTotal?: boolean;
}

const priceRows: PriceBreakdown[] = [
    {
        productDetail: 'YELLOW GOLD',
        productIcon: '/next.svg', // Optional
        productSubtitle: '18KT', // Optional
        rate: '₹ 6570/g',
        weight: '0.212 ct/ 0.042 g',
        discount: '-₹ 1,717.43',
        value: '₹ 66,979.67'
    },
    {
        productDetail: 'MAKING CHARGES',
        productIcon: '', // Optional
        productSubtitle: '', // Optional
        rate: '₹ 6570/g',
        weight: '0.212 ct/ 0.042 g',
        discount: '-₹ 1,717.43',
        value: '₹ 66,979.67'
    },

    {
        productDetail: 'GRAND TOTAL',
        rate: '',
        weight: '',
        discount: '',
        value: '₹ 133,959.34',
        isTotal: true // Mark this as total row
    }
];

export default function Product() {

    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<'details' | 'price'>('details');
    return (
        <>
            <Navbar />
            <main className="mt-[8vh] flex flex-col items-center select-none">
                <div className="h-[8vh] w-full flex flex-col items-center justify-evenly">
                    <CategoryNavigation />
                </div>

                <div className="mt-[5vh] w-full flex flex-row items-start justify-center gap-12 h-full">
                    <img
                        src="/images/sample_jewel_1.svg"
                        alt={'Jewel Image'}
                        className="w-[500px] aspect-auto object-contain rounded-lg"
                    />

                    <div className="w-[40%] flex flex-col justify-start items-start gap-10 h-[auto]">
                        <span className="font-[family-name:var(--font-donegal-one)] font-bold text-4xl">Jewel Name</span>
                        <span className="font-[family-name:var(--font-donegal-one)] font-thin text-sm opacity-50">Sample Description...</span>
                    </div>
                </div>

                <span className="mt-10 font-bold text-4xl font-[family-name:var(--font-nunito-sans)]">Jewellery Details</span>

                <div className="mt-10 rounded-full bg-[#D9D9D9] w-[40%] h-20 overflow-hidden flex flex-row relative">
                    {/* Animated background */}
                    <motion.div
                        className="absolute h-full w-[50%] bg-[#927B0E] rounded-full"
                        animate={{
                            x: activeSection === 'details' ? '0%' : '100%'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />

                    {/* Product Details Button */}
                    <div
                        onClick={() => setActiveSection('details')}
                        className={`w-[50%] h-full rounded-full flex justify-center items-center text-black z-10`}
                    >
                        <span className="text-2xl font-[family-name:var(--font-geist-sans)]">
                            Product Details
                        </span>
                    </div>

                    {/* Price Breakdown Button */}
                    <div
                        onClick={() => setActiveSection('price')}
                        className={`w-[50%] h-full rounded-full flex justify-center items-center text-black z-10`}
                    >
                        <span className="text-2xl font-[family-name:var(--font-geist-sans)]">
                            Price Breakdown
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <motion.div
                    className="mt-8 w-[50%]"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeSection === 'details' && (
                        <div className="space-y-0 w-full">
                            {Object.entries(jewelryDetails['Product Details']).map(([sectionTitle, details]) => (
                                <div key={sectionTitle} className="w-full">
                                    {/* Section Header */}
                                    <motion.div
                                        onClick={() => setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle)}
                                        className="w-full flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-100 rounded-md cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            {details.icon && (
                                                <img src={details.icon} alt="" className="w-6 h-6" />
                                            )}
                                            <span className="text-lg font-semibold">{sectionTitle}</span>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: expandedSection === sectionTitle ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </motion.div>
                                    </motion.div>

                                    {/* Expandable Content */}
                                    <AnimatePresence>
                                        {expandedSection === sectionTitle && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden bg-gray-100"
                                            >
                                                <div className="p-4">
                                                    {sectionTitle === 'Description' ? (
                                                        // Description layout
                                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                            {(details as BaseDetails)['description']}
                                                        </p>
                                                    ) : (
                                                        // Regular details layout
                                                        <div className="grid grid-cols-3 gap-6">
                                                            {Object.entries(details).map(([key, value]) => (
                                                                key !== 'icon' && (
                                                                    <div
                                                                        key={key}
                                                                        className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg"
                                                                    >
                                                                        <span className="text-lg font-bold text-center">{value}</span>
                                                                        <span className="text-sm text-gray-500 mt-1">{key}</span>
                                                                    </div>
                                                                )
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeSection === 'price' && (
                        <div className="w-full rounded-t-xl outline outline-2 outline-gray-200">
                            <div className="grid grid-cols-5 w-full text-center">
                                {/* Headers */}
                                <div className="contents">
                                    {['PRODUCT DETAILS', 'RATE', 'WEIGHT', 'DISCOUNT', 'VALUE'].map((header) => (
                                        <div key={header} className="py-4 px-2 border-b border-gray-200">
                                            <span className="text-sm font-medium text-gray-500">
                                                {header}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Table Rows */}
                                {priceRows.map((row, index) => (
                                    <div key={index} className="contents">
                                        <div className={`py-4 px-2 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                                            <div className="flex items-center justify-center gap-2">
                                                {row.productIcon && !row.isTotal && (
                                                    <img
                                                        src={row.productIcon}
                                                        alt=""
                                                        className="w-5 h-5"
                                                    />
                                                )}
                                                <div className="flex flex-col items-center">
                                                    <span className={`text-sm ${row.isTotal ? 'text-gray-800' : 'text-gray-600'}`}>
                                                        {row.productDetail}
                                                    </span>
                                                    {row.productSubtitle && !row.isTotal && (
                                                        <span className="text-xs text-gray-400">
                                                            {row.productSubtitle}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`py-4 px-2 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                                            <span className={`text-sm ${row.isTotal ? 'text-gray-800' : 'text-gray-600'}`}>
                                                {row.rate}
                                            </span>
                                        </div>
                                        <div className={`py-4 px-2 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                                            <span className={`text-sm ${row.isTotal ? 'text-gray-800' : 'text-gray-600'}`}>
                                                {row.weight}
                                            </span>
                                        </div>
                                        <div className={`py-4 px-2 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                                            <span className={`text-sm ${row.isTotal ? 'text-gray-800' : 'text-green-500'}`}>
                                                {row.discount}
                                            </span>
                                        </div>
                                        <div className={`py-4 px-2 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                                            <span className={`text-sm font-medium ${row.isTotal ? 'text-gray-800' : 'text-gray-900'}`}>
                                                {row.value}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                <div className="h-32" /> {/* Spacer */}
            </main>
        </>
    )
}