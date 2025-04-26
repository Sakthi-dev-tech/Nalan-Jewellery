import { useState } from "react";
// Make sure the import path for JewelleryDetailsType and BaseDetails is correct relative to this file
import { JewelleryDetailsType, BaseDetails } from "../(web-screens)/product/page"; // Ensure this import is correct
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetailsTableInterface {
    jewelleryDetails: JewelleryDetailsType;
}

export default function ProductDetailsTable({ jewelleryDetails }: ProductDetailsTableInterface) {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    return (
        <div className="w-[100%]">
            {Object.entries(jewelleryDetails || {}).map(([sectionTitle, details]) => (
                // Each section also takes full width
                <div key={sectionTitle} className="w-full">
                    {/* Section Header - remains the same, takes full width */}
                    <motion.div
                        onClick={() => setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-200 cursor-pointer"
                    >
                        {/* Left section with icon and title */}
                        <div className="flex items-center gap-4">
                            {/* Safely access icon */}
                            {(details as BaseDetails)?.icon && (
                                <img src={(details as BaseDetails).icon} alt="" className="w-6 h-6 flex-shrink-0" />
                            )}
                            <span className="text-lg font-semibold">{sectionTitle}</span>
                        </div>
                        {/* Icon container */}
                        <div className="w-8 flex justify-center">
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
                        </div>
                    </motion.div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                        {expandedSection === sectionTitle && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                // Keep w-full and overflow-hidden here. min-w-0 removed as it didn't fix it here.
                                className="w-[100%] overflow-hidden bg-gray-100"
                            >
                                <div className="p-4"> {/* Inner padding */}
                                    {/* Type assertion for 'details' might be needed */}
                                    {sectionTitle === 'Description' ? (
                                        // Assuming Description details has a 'description' property
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                            {(details as BaseDetails)?.['description']}
                                        </p>
                                    ) : (
                                        <>
                                            <div className="md:hidden space-y-3">
                                                {Object.entries(details || {}).map(([key, value]) => (
                                                    key !== 'icon' && (
                                                        <div
                                                            key={key}
                                                            className="flex text-center items-center justify-between p-3 bg-gray-50 rounded-lg min-w-0"
                                                        >
                                                            <span className="text-sm text-gray-500 min-w-[120px]">
                                                                {key}
                                                            </span>
                                                            <span className="text-sm text-gray-800 text-center flex-1 pl-4">
                                                                {value as any} {/* Cast value if needed */}
                                                            </span>
                                                        </div>
                                                    )
                                                ))}
                                            </div>

                                            {/* Desktop Layout */}
                                            {/* This div is hidden on mobile, visible on md+ */}
                                            <div className="hidden md:grid grid-cols-3 gap-6">
                                                {Object.entries(details || {}).map(([key, value]) => (
                                                    key !== 'icon' && (
                                                        <div
                                                            key={key}
                                                            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
                                                        >
                                                            <span className="text-lg font-bold w-full text-center whitespace-pre-line">
                                                                {value as any} {/* Cast value if needed */}
                                                            </span>
                                                            <span className="text-sm text-gray-500 mt-1 text-center w-full">
                                                                {key}
                                                            </span>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}