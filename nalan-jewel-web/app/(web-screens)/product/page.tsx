"use client";

import { useEffect, useState } from "react";
import CategoryNavigation from "../../components/CategoryNavigationForHome";
import Navbar from "../../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { MetalRates, PriceBreakdown } from "@/app/interfaces/JewelleryAttributes";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/libs/supabase-client";

interface JewelleryImage {
    id: number;
    thumbnail: string;   // Small image for catalog
    fullSize: string;    // High-resolution image for modal
    alt: string;
}

interface BaseDetails {
    icon: string;
    [key: string]: string | number;
}

interface JewelleryDetailsType {
    'Product Details': {
        [key: string]: BaseDetails;
    };
}

const jewelleryDetails: JewelleryDetailsType = {
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
            'Jewellery Name': "Sample Jewellery",
            'Jewellery Type': 'Gold Jewellery',
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

export default function Product() {

    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<'details' | 'price'>('details');

    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [jewelleryImages, setJewelleryImages] = useState<JewelleryImage[]>([]);

    const [priceRows, setPriceRows] = useState<PriceBreakdown[]>([]);
    const [metalRates, setMetalRates] = useState<MetalRates>({});

    const searchParams = useSearchParams();
    const product_id = searchParams.get('product_id');

    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
    const [error, setError] = useState<string | null>(null);

    const fetchJewelleryImages = async () => {
        let numImages = 0;
        let continueChecking = true;

        try {
            // Check for images until we don't find one
            while (continueChecking) {
                const { data } = await supabase
                    .storage
                    .from('jewellery-images')
                    .exists(`med-res/${product_id}/${numImages + 1}.svg`);

                if (!data) {
                    continueChecking = false;
                } else {
                    numImages += 1;
                }
            }

            // Create array of image objects
            const images = Array.from({ length: numImages }, (_, i) => ({
                id: i + 1,
                thumbnail: `https://pyrrtmfuhegspmqgbzrk.supabase.co/storage/v1/object/public/jewellery-images/med-res/${product_id}/${i + 1}.svg`,
                fullSize: `https://pyrrtmfuhegspmqgbzrk.supabase.co/storage/v1/object/public/jewellery-images/med-res/${product_id}/${i + 1}.svg`,
                alt: `${product_id}'s ${i + 1} image`
            }));

            setJewelleryImages(images);
        } catch (error) {
            console.error("Error while fetching images: ", error);
            throw error; // Rethrow the error to be caught in the main function
        }
    };

    const fetchPriceRows = async () => {
        try {
            // First, let's log the product_id to verify it exists
            console.log('Fetching price rows for product:', product_id);

            const { data, error } = await supabase
                .from("Price Breakdown")
                .select('price_rows')
                .eq('id', product_id);
            if (error) {
                throw error;
            }

            // Log the raw data to see what we're getting
            console.log('Raw price data:', data);

            if (data && data.length > 0) {
                // Access the JSONB data correctly
                const priceRowsData = data[0].price_rows.data;
                console.log('Price rows data:', priceRowsData);

                if (Array.isArray(priceRowsData)) {
                    setPriceRows(priceRowsData as PriceBreakdown[]);
                } else {
                    console.error('Price rows data is not an array:', priceRowsData);
                    throw Error('Price rows data is not an array');
                }
            } else {
                console.error('No price data found for product:', product_id);
                throw Error('No price data found for product');
            }
        } catch (error) {
            console.error("Error while fetching price rows: ", error);
            throw error; // Rethrow the error to be caught in the main function
        }
    };

    const fetchMetalRates = async () => {
        try {
            const { data, error } = await supabase
                .from("Rates")
                .select("*");
    
            if (error) throw error;
    
            if (data) {
                const ratesObject: MetalRates = data.reduce((acc, item) => ({
                    ...acc,
                    [item.metal_name]: {
                        rate: item.rate,
                        unit: item.unit
                    }
                }), {} as MetalRates);
                
                setMetalRates(ratesObject);
            }
        } catch (error) {
            console.error("Error while fetching metal rates:", error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setStatus("loading");

            try {
                const [imagesResult, priceResult] = await Promise.all([
                    fetchJewelleryImages(),
                    fetchPriceRows(),
                    fetchMetalRates()
                ]);

                setStatus("success");
            } catch (error) {
                setStatus("error");
                setError("Error fetching data. Please try again later.");
                console.error(error);
            }
        }

        if (product_id) {
            fetchData();
        }
    }, [product_id])

    return (
        <>
            <Navbar />
            <main className="mt-[8vh] pb-36 flex flex-col items-center select-none">
                {status === 'loading' && (
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#927B0E]" />
                        <p className="mt-4 text-gray-600">Loading product details...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <div className="text-red-500 mb-4">
                            <i className="material-icons text-5xl">error_outline</i>
                        </div>
                        <p className="text-gray-800 font-medium">Failed to load product</p>
                        <p className="text-gray-600 mt-2">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-6 py-2 bg-[#927B0E] text-white rounded-full hover:bg-[#7d690c]"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {status === 'success' && (
                    // ... your existing content ...
                    <>
                        <div className="h-[8vh] w-full flex flex-col items-center justify-evenly">
                            <CategoryNavigation />
                        </div>

                        <div className="mt-[5vh] w-full flex flex-row items-start justify-center gap-12 h-full">
                            <div className="flex flex-col gap-4">
                                {/* Main Image */}
                                <div
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-[500px] cursor-pointer hover:opacity-90 transition-opacity duration-200"
                                >
                                    <img
                                        src={jewelleryImages[selectedImageIndex].thumbnail}
                                        alt={jewelleryImages[selectedImageIndex].alt}
                                        className="w-full aspect-auto object-contain rounded-lg"
                                    />
                                </div>

                                {/* Thumbnails */}
                                <div className="flex flex-row gap-2">
                                    {jewelleryImages.map((image, index) => (
                                        <div
                                            key={image.id}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${selectedImageIndex === index ? 'border-[#927B0E]' : 'border-transparent'
                                                }`}
                                        >
                                            <img
                                                src={image.thumbnail}
                                                alt={image.alt}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-[40%] flex flex-col justify-start items-start gap-10 h-[auto]">
                                <span className="font-[family-name:var(--font-donegal-one)] font-bold text-4xl">{jewelleryDetails['Product Details']['General Details']['Jewellery Name']}</span>
                                <span className="font-[family-name:var(--font-donegal-one)] font-thin text-sm opacity-60">{jewelleryDetails['Product Details']['Description']['description']}</span>
                            </div>
                        </div>

                        {/* Image Modal */}
                        <AnimatePresence>
                            {isModalOpen && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <div className="relative w-full h-full flex items-center justify-center p-8">
                                        {/* Close button */}
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>

                                        {/* Navigation arrows */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedImageIndex(prev => prev > 0 ? prev - 1 : jewelleryImages.length - 1);
                                            }}
                                            className="absolute left-4 text-white hover:text-gray-300"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedImageIndex(prev => prev < jewelleryImages.length - 1 ? prev + 1 : 0);
                                            }}
                                            className="absolute right-4 text-white hover:text-gray-300"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        {/* Full-size image */}
                                        <motion.img
                                            key={selectedImageIndex}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            src={jewelleryImages[selectedImageIndex].fullSize}
                                            alt={jewelleryImages[selectedImageIndex].alt}
                                            className="max-h-[90vh] max-w-[90vw] object-contain"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

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

                        {/* Table for Product Details */}
                        <motion.div
                            className="mt-8 w-[50%]"
                            initial={false}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeSection === 'details' && (
                                <div className="space-y-0 w-full">
                                    {Object.entries(jewelleryDetails['Product Details']).map(([sectionTitle, details]) => (
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

                            {/* Table For Price Breakdown */}
                            {activeSection === 'price' && (
                                <div className="w-full rounded-t-xl outline outline-2 outline-gray-200">
                                    <div className="grid grid-cols-5 w-full text-center">
                                        {/* Headers */}
                                        <div className="contents">
                                            {['PRODUCT DETAILS', 'RATE', 'WEIGHT', 'DISCOUNT', 'VALUE'].map((header) => (
                                                <div key={header} className="py-4 px-2 border-b border-gray-200">
                                                    <span className="text-sm font-bold text-gray-500">
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
                                                        {metalRates[row.productDetail]
                                                            ? `$ ${metalRates[row.productDetail].rate} / ${metalRates[row.productDetail].unit}`
                                                            : '-'
                                                        }
                                                    </span>
                                                </div>
                                                <div className={`py-4 px-2 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                                                    <span className={`text-sm ${row.isTotal ? 'text-gray-800' : 'text-gray-600'}`}>
                                                        {row.weight
                                                            ? (row.weight.carat
                                                                ? `${row.weight.carat} ct/ ${row.weight.gram}g`
                                                                : row.weight.gram > 0
                                                                    ? `${row.weight.gram}g`
                                                                    : '')
                                                            : '-'}
                                                    </span>
                                                </div>
                                                <div className={`py-4 px-2 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                                                    <span className={`text-sm text-green-500`}>
                                                        {row.discount !== 0 ? `$ ${row.discount.toLocaleString()}` : ''}
                                                    </span>
                                                </div>
                                                <div className={`py-4 px-2 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                                                    <span className={`text-sm font-medium ${row.isTotal ? 'text-gray-800' : 'text-gray-900'}`}>
                                                        $ {row.value.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        <div className="w-[60%] mt-10 flex justify-evenly">
                            <button className="w-[30%] h-14 bg-[#FB4C4C] text-black rounded-full hover:bg-[#791f1f] hover:scale-110 transition-all duration-300 group shadow-[3px_4px_6px_-1px_rgba(0,0,0,0.5)]">
                                <div className="flex items-center justify-center gap-2">
                                    <img
                                        src="/heart.svg"
                                        className="h-5 w-5 transition-transform"
                                        alt=""
                                    />
                                    <span className="text-sm font-medium">Add to Wishlist</span>
                                </div>
                            </button>

                            <button className="w-[30%] h-14 bg-[#7CA6AB] text-black rounded-full hover:bg-[#1a585f] transition-all duration-300 hover:scale-110 group shadow-[3px_4px_6px_-1px_rgba(0,0,0,0.5)]">
                                <div className="flex items-center justify-center gap-2">
                                    <img
                                        src="/book-appt-icon.svg"
                                        className="h-10 w-10 transition-transform"
                                        alt=""
                                    />
                                    <span className="text-sm font-medium">Book Appointment</span>
                                </div>
                            </button>
                        </div>

                        {/* Fixed Bottom Bar for Add to Cart */}
                        {!isModalOpen && <div className="fixed bottom-0 left-0 right-0 h-24 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
                            <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Total Price</span>
                                    <span className="text-2xl font-bold">
                                        $ {priceRows.find(row => row.isTotal)?.value.toLocaleString() ?? '0'}
                                    </span>
                                </div>
                                <button className="bg-[#927B0E] text-white px-8 py-3 rounded-full hover:bg-[#7d690c] transition-all duration-300 hover:scale-110 flex flex-row items-center justify-evenly gap-3">
                                    <img src="/shopping-cart.svg" className="aspect-auto h-5" />
                                    <span>Add to Cart</span>
                                </button>
                            </div>
                        </div>
                        }
                    </>
                )}
            </main>
        </>
    );
}

