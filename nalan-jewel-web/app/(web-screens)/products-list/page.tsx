"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";
import Navbar from "../../components/Navbar";
import CategoryNavigation from "../../components/CategoryNavigationForHome";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "../../components/Footer";
import { JewelleryAttributes } from "@/app/interfaces/JewelleryAttributes";
import { supabase } from "@/libs/supabase-client";

type FilterCategory = keyof FilterState;
type FilterOptions = Record<FilterCategory, string[]>;

interface FilterState {
    gender: string[];
    jewelleryType: string[];
    product: string[];
    purity: string[];
    occassion: string[];
    metal: string[];
    priceCategory: string[];
    type: string[];
    community: string[];
}

const filterCategories: FilterOptions = {
    gender: ['Kids', 'Men', 'Women', 'Unisex'],
    jewelleryType: ['Diamond Jewellery', 'Gold Jewellery', 'Jewellery With Gemstones', 'Plain Jewellery With Stones', 'Platinum Jewellery'],
    product: ['Bangle', 'Bracelet', 'Chain', 'Earrings', 'Finger Ring', 'Haram', 'Jewellery Set', 'Kada', 'Maang Tikka', 'Mangalsutra', 'Mangalsutra Set', 'Necklace', 'Necklace Set', 'Nose Pin', 'Others', 'Pendant', 'Pendant And Earrings Set', 'Pendant With Chain'],
    purity: ['14', '18', '22', '95'],
    occassion: ['Bridal Wear', 'Casual Wear', 'Engagement', 'Modern Wear', 'Traditional and Ethnice Wear', 'Office Wear'],
    metal: ['Gold', 'Platinum', 'Diamond'],
    priceCategory: ['< $5000', '$5000-$9999', '$10,000-$15,000', '> $15,000'],
    type: ['Drops', 'Hoops', 'Jhumka', 'Studs', 'Others'],
    community: ['Bengali', 'Bihari', 'Classic Must Haves', 'South Indian', 'Tamil', 'Telugu']
};

type ScrollDirection = "up" | "down";

interface JewelleryImage {
    imageUrl: string;
    imageId: string;
}

export default function ProductsList() {
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState<FilterState>({
        gender: [],
        jewelleryType: [],
        product: [],
        purity: [],
        occassion: [],
        metal: [],
        priceCategory: [],
        type: [],
        community: []
    });
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const activeFiltersCount = Object.values(filters).reduce(
        (count, filterArray) => count + filterArray.length,
        0
    );

    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("up");

    // Add scroll handler
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            setScrollDirection("down");
        } else {
            setScrollDirection("up");
        }

        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    // Add scroll effect
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Fetch Jewellery List from Supabase
    const [JewelleryList, setJewelleryList] = useState<JewelleryAttributes[]>([]);

    // Fetch Jewellery Images from Supabase
    const [JewelleryImages, setJewelleryImages] = useState<JewelleryImage[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: jewelleryData, error: jewelleryError } = await supabase
                    .from("Jewellery Data")
                    .select("*");

                if (jewelleryError) throw jewelleryError;

                if (jewelleryData) {
                    setJewelleryList(jewelleryData as JewelleryAttributes[]);

                    // Modified image fetching to include image_id
                    const imageData = await Promise.all(
                        jewelleryData.map(async (jewellery) => {
                            const { data } = supabase
                                .storage
                                .from('jewellery-images')
                                .getPublicUrl(`low-res/${jewellery.image_id}`);
                            return {
                                imageUrl: data.publicUrl,
                                imageId: jewellery.image_id
                            };
                        })
                    );

                    setJewelleryImages(imageData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const imageUrlMap = Object.fromEntries(
        JewelleryImages.map(img => [img.imageId, `${img.imageUrl}.svg`])
    );

    console.log("imageUrlMap: ", imageUrlMap);

    return (
        <>
            <Navbar />
            <main className="mt-[8vh] pb-36 flex flex-col items-center select-none">
                <div className="h-[8vh] w-full flex flex-col items-center justify-evenly">
                    <CategoryNavigation />
                </div>

                <div className="w-full max-w-7xl px-4 mt-8 flex gap-8">
                    {activeFiltersCount > 0 && (
                        <motion.div
                            initial={{ y: 0, opacity: 1 }}
                            animate={{
                                y: scrollDirection === "down" ? -100 : 0,
                                opacity: scrollDirection === "down" ? 0 : 1
                            }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-[14vh] left-0 right-0 z-50 bg-white shadow-md py-3 px-4 md:px-8"
                        >
                            <div className="max-w-7xl mx-auto">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm text-gray-600">Active Filters:</span>
                                    {Object.entries(filters).map(([category, selectedOptions]) =>
                                        selectedOptions.map((option: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined) => (
                                            <motion.span
                                                key={`${category}-${option}`}
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.8, opacity: 0 }}
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-[#34758f] text-white rounded-full text-sm"
                                            >
                                                <span>{option}</span>
                                                <button
                                                    onClick={() => {
                                                        setFilters((prev) => ({
                                                            ...prev,
                                                            [category]: prev[category as FilterCategory].filter(
                                                                (item) => item !== option
                                                            ),
                                                        }));
                                                    }}
                                                    className="hover:text-red-200 transition-colors"
                                                >
                                                    <i className="material-icons text-sm">close</i>
                                                </button>
                                            </motion.span>
                                        ))
                                    )}
                                    <button
                                        onClick={() => setFilters({
                                            gender: [],
                                            jewelleryType: [],
                                            product: [],
                                            purity: [],
                                            occassion: [],
                                            metal: [],
                                            priceCategory: [],
                                            type: [],
                                            community: []
                                        })}
                                        className="text-sm text-[#34758f] hover:text-[#116c96] transition-colors"
                                    >
                                        Clear all
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="md:hidden fixed bottom-4 right-4 z-50 bg-[#34758f] text-white p-4 rounded-full shadow-lg"
                    >
                        <i className="material-icons">{isFilterOpen ? 'filter_list_off' : 'filter_list'}</i>
                    </button>

                    {/* Filter Sidebar */}
                    <motion.aside
                        initial={false}
                        animate={{
                            width: isFilterOpen ? 'auto' : 0,
                            opacity: isFilterOpen ? 1 : 0
                        }}
                        className={`${isFilterOpen ? 'w-full md:w-72' : 'w-0'
                            } flex-shrink-0 fixed md:sticky left-0 top-[16vh] h-[calc(100vh-16vh)] md:h-[calc(100vh-16vh)] bg-white z-40 md:z-0 overflow-hidden`}
                    >
                        <div className="p-6 h-full overflow-y-auto scrollbar-hide">
                            {Object.entries(filterCategories).map(([category, options]) => (
                                <motion.div
                                    key={category}
                                    className="mb-6 border-b border-gray-100 pb-4 last:border-none"
                                    initial={false}
                                >
                                    <button
                                        onClick={() => setExpandedSection(expandedSection === category ? null : category)}
                                        className="w-full flex items-center justify-between text-left font-medium text-gray-700 hover:text-[#34758f] transition-colors"
                                    >
                                        <span className="capitalize">
                                            {category.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {filters[category as FilterCategory].length > 0 && (
                                                <span className="text-sm text-[#34758f] font-normal">
                                                    {filters[category as FilterCategory].length}
                                                </span>
                                            )}
                                            <motion.i
                                                className="material-icons text-xl"
                                                animate={{ rotate: expandedSection === category ? 180 : 0 }}
                                            >
                                                expand_more
                                            </motion.i>
                                        </div>
                                    </button>

                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: expandedSection === category ? 'auto' : 0,
                                            opacity: expandedSection === category ? 1 : 0
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-3 space-y-2">
                                            {options.map((option: string) => (
                                                <label
                                                    key={option}
                                                    className="flex items-center group cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={filters[category as FilterCategory].includes(option)}
                                                        onChange={() => {
                                                            setFilters((prev: FilterState) => ({
                                                                ...prev,
                                                                [category]: prev[category as FilterCategory].includes(option)
                                                                    ? prev[category as FilterCategory].filter((item: string) => item !== option)
                                                                    : [...prev[category as FilterCategory], option]
                                                            }));
                                                        }}
                                                        className="w-4 h-4 rounded border-gray-300 text-[#34758f] focus:ring-[#34758f] bg-white"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600 group-hover:text-[#34758f] transition-colors">
                                                        {option}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.aside>

                    {/* Products List */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {JewelleryList.map((jewellery) => (
                                <motion.div
                                    key={jewellery.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
                                >
                                    <Link href={`/product?=${jewellery.id}`}>
                                        <div className="relative">
                                            <img
                                                src={imageUrlMap[jewellery.image_id]}
                                                alt={jewellery.name}
                                                className="w-full h-64 object-cover"
                                            />
                                            {jewellery.numInStock < 5 && (
                                                <div className="absolute bottom-0 left-0 right-0 p-0">
                                                    <div className="bg-gradient-to-r from-red-500/80 to-white/80 text-white px-4 py-2 text-sm rounded-t-lg backdrop-blur-sm">
                                                        <div className="flex items-center gap-2">
                                                            <i className="material-icons text-sm animate-pulse">
                                                                local_fire_department
                                                            </i>
                                                            <span>
                                                                Selling Fast! Only {jewellery.numInStock} left in stock
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 space-y-2">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {jewellery.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-2 py-1 bg-gray-100 text-sm rounded-full text-gray-600">
                                                    {jewellery.attributes.jewelleryType}
                                                </span>
                                                <span className="px-2 py-1 bg-gray-100 text-sm rounded-full text-gray-600">
                                                    {jewellery.attributes.metal}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-xl font-bold text-[#34758f]">
                                                    ${jewellery.price.toLocaleString()}
                                                </p>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="px-4 py-2 bg-[#34758f] text-white rounded-lg text-sm hover:bg-[#116c96] transition-colors"
                                                >
                                                    View Details
                                                </motion.button>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {JewelleryList.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12"
                            >
                                <i className="material-icons text-6xl text-gray-300 mb-4">
                                    inventory_2
                                </i>
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                    No Products Found
                                </h3>
                                <p className="text-gray-500">
                                    Try adjusting your filters or search criteria
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    );
}