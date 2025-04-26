import { useState } from "react";
import { JewelleryDetailsType, BaseDetails } from "../(web-screens)/product/page"
import { motion, AnimatePresence } from "framer-motion"

interface ProductDetailsTableInterface {
    jewelleryDetails: JewelleryDetailsType
}

export default function ProductDetailsTable({ jewelleryDetails }: ProductDetailsTableInterface) {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    return (<div className=" w-[100%]">
        {Object.entries(jewelleryDetails).map(([sectionTitle, details]) => (
            <div key={sectionTitle} className="w-full">
                {/* Section Header - remains the same */}
                <motion.div
                    onClick={() => setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle)}
                    className="w-full flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        {details["icon"] && (
                            <img src={details["icon"]} alt="" className="w-6 h-6" />
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
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {(details as BaseDetails)['description']}
                                    </p>
                                ) : (
                                    <>
                                        {/* Mobile Layout */}
                                        <div className="md:hidden space-y-3">
                                            {Object.entries(details).map(([key, value]) => (
                                                key !== 'icon' && (
                                                    <div
                                                        key={key}
                                                        className="flex text-center items-center justify-between p-3 bg-gray-50 rounded-lg"
                                                    >
                                                        <span className="text-sm text-gray-500 min-w-[120px]">
                                                            {key}
                                                        </span>
                                                        <span className="text-sm text-gray-800 text-center flex-1 pl-4">
                                                            {value}
                                                        </span>
                                                    </div>
                                                )
                                            ))}
                                        </div>

                                        {/* Desktop Layout */}
                                        <div className="hidden md:grid grid-cols-3 gap-6">
                                            {Object.entries(details).map(([key, value]) => (
                                                key !== 'icon' && (
                                                    <div
                                                        key={key}
                                                        className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
                                                    >
                                                        <span className="text-lg font-bold w-full text-center whitespace-pre-line">
                                                            {value}
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
    </div>)
}