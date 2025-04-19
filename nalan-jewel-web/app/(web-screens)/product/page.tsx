"use client";

import { useEffect, useState } from "react";
import CategoryNavigation from "../../components/CategoryNavigationForHome";
import Navbar from "../../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { MetalRates, PriceBreakdown } from "@/app/interfaces/JewelleryAttributes";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/libs/supabase-client";
import PriceBreakdownTable from "@/app/components/PriceBreakdownTable";
import ProductDetailsTable from "@/app/components/ProductDetailsBreakdownTable";
import LoadingBuffer from "@/app/components/LoadingBuffer";
import { useAuth } from "@/app/contexts/AuthContext";

interface JewelleryImage {
    id: number;
    thumbnail: string;   // Small image for catalog
    fullSize: string;    // High-resolution image for modal
    alt: string;
}

export interface BaseDetails {
    "icon": string;
    [key: string]: string | number;
}

export interface JewelleryDetailsType {
    [key: string]: BaseDetails;
}

const jewelleryImagesURL = process.env.NEXT_PUBLIC_SUPABASE_JEWELLERY_IMAGES_URL as string;

export default function Product() {
    const { isLoggedIn, user } = useAuth();

    const [activeSection, setActiveSection] = useState<'details' | 'price'>('details');

    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [jewelleryImages, setJewelleryImages] = useState<JewelleryImage[]>([]);

    const [priceRows, setPriceRows] = useState<PriceBreakdown[]>([]);
    const [metalRates, setMetalRates] = useState<MetalRates>({});

    const [productInWishlist, setProductInWishlist] = useState<boolean>(false)

    const [jewelleryDetails, setJewelleryDetails] = useState<JewelleryDetailsType | undefined>(undefined);

    const searchParams = useSearchParams();
    const product_id = searchParams.get('product_id');

    const [isLoading, setIsLoading] = useState<boolean>(true);

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
                thumbnail: `${jewelleryImagesURL}/med-res/${product_id}/${i + 1}.svg`,
                fullSize: `${jewelleryImagesURL}/med-res/${product_id}/${i + 1}.svg`,
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

    const fetchProductDetails = async () => {
        try {
            const { data, error } = await supabase
                .from("Jewellery Data")
                .select("product_details")
                .eq('id', product_id);  // Add this condition to fetch specific product details

            if (error) throw error;

            if (data && data.length > 0) {
                setJewelleryDetails(data[0].product_details);
            } else {
                console.error("No product details found for:", product_id);
                throw Error('No product details found');
            }
        } catch (e) {
            console.error("Error while fetching product details:", e);
            throw e;
        }
    }

    const checkIfProductInWishlist = async () => {
        try {
            const { data, error } = await supabase
                .from('Wishlist')
                .select('id_of_jewels')
                .eq('user_id', user?.id)
                .contains('id_of_jewels', [product_id]);

            setProductInWishlist(data?.length === 1 ? true : false)

        } catch (error) {
            console.error("Error while checking if product is in wishlist:", error);
        }
    }

    const removeItemFromWishlist = async () => {
        try {
            const { error: appendError } = await supabase
                .rpc('remove_jewel_from_wishlist', { product_id: Number(product_id), uid: user?.id });
            if (appendError) throw appendError;
        } catch (error) {
            console.error("Error while removing item from wishlist:", error);
            window.location.href = `/error?code=500&message=${encodeURIComponent('Error Updating Wishlist')}`;
        } finally {
            setProductInWishlist(false)
        }
    }

    const appendItemToWishlist = async () => {
        try {
            const { error: appendError } = await supabase
                .rpc('append_jewel_in_wishlist', { product_id: Number(product_id), uid: user?.id });
            if (appendError) throw appendError;
        } catch (error) {
            console.error("Error while appending item to wishlist:", error);
            window.location.href = `/error?code=500&message=${encodeURIComponent('Error Updating Wishlist')}`;
        } finally {
            setProductInWishlist(true)
        }
    }


    useEffect(() => {
        // don’t run until we know both product_id _and_ user.id
        if (!product_id || !user?.id) return

        const fetchData = async () => {
            setIsLoading(true)
            try {
                await Promise.all([
                    fetchJewelleryImages(),
                    fetchPriceRows(),
                    fetchMetalRates(),
                    fetchProductDetails(),
                    checkIfProductInWishlist(),
                ])
            } catch (err) {
                console.error(err)
                // your error redirect…
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [product_id, user?.id])

    return (
        <>
            <Navbar />
            <main className="mt-[8vh] pb-36 flex flex-col items-center select-none px-4 sm:px-6 lg:px-8">
                {isLoading && (
                    <LoadingBuffer />
                )}

                {!isLoading && (
                    <>
                        <div className="h-[8vh] w-full flex flex-col items-center justify-evenly">
                            <CategoryNavigation />
                        </div>

                        <div className="mt-[5vh] w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12 h-full">
                            <div className="flex flex-col gap-4 w-full lg:w-auto">
                                {/* Main Image */}
                                <div
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full lg:w-[500px] cursor-pointer hover:opacity-90 transition-opacity duration-200"
                                >
                                    {jewelleryImages.length > 0 && (
                                        <img
                                            src={jewelleryImages[selectedImageIndex].thumbnail}
                                            alt={jewelleryImages[selectedImageIndex].alt}
                                            className="w-full aspect-auto object-contain rounded-lg"
                                        />
                                    )}
                                </div>

                                {/* Thumbnails */}
                                <div className="flex flex-row gap-2 justify-center lg:justify-start flex-wrap">
                                    {jewelleryImages.map((image, index) => (
                                        <div
                                            key={image.id}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`w-16 lg:w-20 h-16 lg:h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${selectedImageIndex === index ? 'border-[#927B0E]' : 'border-transparent'}`}
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

                            <div className="w-full lg:w-[40%] flex flex-col justify-start items-start gap-6 lg:gap-10 px-4 lg:px-0">
                                <span className="font-[family-name:var(--font-donegal-one)] font-bold text-2xl lg:text-4xl text-center lg:text-left w-full">
                                    {jewelleryDetails?.['General Details']?.['Jewellery Name'] || 'Product Name Unavailable'}
                                </span>
                                <span className="font-[family-name:var(--font-donegal-one)] font-thin text-sm opacity-60">
                                    {jewelleryDetails?.['Description']?.['description'] || 'Description unavailable'}
                                </span>
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
                                        {jewelleryImages.length > 0 && (
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
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <span className="mt-16 mb-8 font-bold text-3xl lg:text-4xl text-center font-[family-name:var(--font-nunito-sans)] w-full">Jewellery Details</span>

                        <div className="mt-4 rounded-full bg-[#D9D9D9] w-[90%] lg:w-[40%] h-14 lg:h-16 overflow-hidden flex flex-row relative">
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
                                className={`w-[50%] h-full rounded-full flex justify-center items-center text-black z-10 cursor-pointer ${activeSection === 'details' ? 'text-white' : ''}`}
                            >
                                <span className="text-lg lg:text-xl font-medium font-[family-name:var(--font-geist-sans)]">
                                    Product Details
                                </span>
                            </div>

                            {/* Price Breakdown Button */}
                            <div
                                onClick={() => setActiveSection('price')}
                                className={`w-[50%] h-full rounded-full flex justify-center items-center text-black z-10 cursor-pointer ${activeSection === 'price' ? 'text-white' : ''}`}
                            >
                                <span className="text-lg lg:text-xl font-medium font-[family-name:var(--font-geist-sans)]">
                                    Price Breakdown
                                </span>
                            </div>
                        </div>

                        {/* Table Content */}
                        <motion.div
                            className="mt-8 w-[95%] lg:w-[60%] bg-white rounded-lg shadow-lg p-6"
                            initial={false}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeSection === 'details' && jewelleryDetails !== undefined && (
                                <ProductDetailsTable
                                    jewelleryDetails={jewelleryDetails}
                                />
                            )}

                            {activeSection === 'price' && priceRows.length > 0 && Object.keys(metalRates).length > 0 && (
                                <PriceBreakdownTable
                                    metalRates={metalRates}
                                    priceRows={priceRows}
                                />
                            )}
                        </motion.div>

                        <div className="w-[90%] lg:w-[60%] mt-10 flex flex-col lg:flex-row gap-4 lg:gap-0 justify-evenly">
                            <button className="w-full lg:w-[30%] h-14 bg-[#FB4C4C] text-black rounded-full hover:bg-[#791f1f] hover:scale-110 transition-all duration-300 group shadow-[3px_4px_6px_-1px_rgba(0,0,0,0.5)]">
                                {
                                    productInWishlist ? (
                                        <div onClick={async () => { removeItemFromWishlist() }} className="flex items-center justify-center gap-2">
                                            <img
                                                src="/heart_filled.svg"
                                                className="h-5 w-5 transition-transform"
                                                alt=""
                                            />
                                            <span className="text-sm font-medium">Already in Wishlist</span>
                                        </div>
                                    ) : (
                                        <div onClick={async () => { appendItemToWishlist() }} className="flex items-center justify-center gap-2">
                                            <img
                                                src="/heart.svg"
                                                className="h-5 w-5 transition-transform"
                                                alt=""
                                            />
                                            <span className="text-sm font-medium">Add to Wishlist</span>
                                        </div>
                                    )
                                }
                            </button>

                            <button className="w-full lg:w-[30%] h-14 bg-[#7CA6AB] text-black rounded-full hover:bg-[#1a585f] transition-all duration-300 hover:scale-110 group shadow-[3px_4px_6px_-1px_rgba(0,0,0,0.5)]">
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
                        {!isModalOpen && priceRows.length > 0 && priceRows.find(row => row.isTotal) && (
                            <div className="fixed bottom-0 left-0 right-0 h-20 lg:h-24 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
                                <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 lg:px-8">
                                    <div className="flex flex-col">
                                        <span className="text-xs lg:text-sm text-gray-500">Total Price</span>
                                        <span className="text-xl lg:text-2xl font-bold">
                                            $ {priceRows.find(row => row.isTotal)?.value?.toLocaleString() ?? '0'}
                                        </span>
                                    </div>
                                    <button className="bg-[#927B0E] text-white px-4 lg:px-8 py-2 lg:py-3 rounded-full hover:bg-[#7d690c] transition-all duration-300 hover:scale-110 flex flex-row items-center justify-evenly gap-2 lg:gap-3">
                                        <img src="/shopping-cart.svg" className="aspect-auto h-4 lg:h-5" />
                                        <span className="text-sm lg:text-base">Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </>
    );
}