import { useState } from "react";
import { JewelleryDetailsType, BaseDetails } from "../(web-screens)/product/page"
import { motion, AnimatePresence } from "framer-motion"

interface ProductDetailsTableInterface {
    jewelleryDetails: JewelleryDetailsType
}

export default function ProductDetailsTable({jewelleryDetails}: ProductDetailsTableInterface) {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    return (<div className="space-y-0 w-full">
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
    </div>)
}