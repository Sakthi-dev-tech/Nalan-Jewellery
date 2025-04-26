import { MetalRates, PriceBreakdown } from "@/app/interfaces/JewelleryAttributes";

interface PriceBreakdownTableProps {
    priceRows: PriceBreakdown[];
    metalRates: MetalRates;
}

export default function PriceBreakdownTable({ priceRows, metalRates }: PriceBreakdownTableProps) {
    return (
        <div className="w-full rounded-t-xl outline outline-2 outline-gray-200">
            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-5 w-full text-center">
                {/* Headers */}
                <div className="contents">
                    {['PRODUCT DETAILS', 'RATE', 'WEIGHT', 'DISCOUNT', 'VALUE'].map((header) => (
                        <div key={header} className="py-3 px-4 border-b border-gray-200">
                            <span className="text-xs lg:text-sm font-bold text-gray-500">
                                {header}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Desktop Table Rows */}
                {priceRows.map((row, index) => (
                    <div key={index} className="contents">
                        <div className={`py-3 px-4 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                            <div className="flex items-center justify-start gap-2">
                                {row.productIcon && !row.isTotal && (
                                    <img src={row.productIcon} alt="" className="w-4 h-4 flex-shrink-0" />
                                )}
                                <div className="flex flex-col items-start min-w-0">
                                    <span className={`text-xs lg:text-sm truncate w-full ${row.isTotal ? 'text-gray-800' : 'text-gray-600'}`}>
                                        {row.productDetail}
                                    </span>
                                    {row.productSubtitle && !row.isTotal && (
                                        <span className="text-[10px] lg:text-xs text-gray-400 truncate w-full">
                                            {row.productSubtitle}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={`py-3 px-4 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                            <span className={`text-xs lg:text-sm ${row.isTotal ? 'text-gray-800' : 'text-gray-600'}`}>
                                {metalRates[row.productDetail]
                                    ? `$${metalRates[row.productDetail].rate}/${metalRates[row.productDetail].unit}`
                                    : row.isTotal ? '' : '-'
                                }
                            </span>
                        </div>
                        <div className={`py-3 px-4 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                            <span className={`text-xs lg:text-sm ${row.isTotal ? 'text-gray-800' : 'text-gray-600'}`}>
                                {row.weight
                                    ? (row.weight.carat
                                        ? `${row.weight.carat}ct/${row.weight.gram}g`
                                        : row.weight.gram > 0
                                            ? `${row.weight.gram}g`
                                            : '')
                                    : '-'}
                            </span>
                        </div>
                        <div className={`py-3 px-4 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                            <span className="text-xs lg:text-sm text-green-500">
                                {row.discount !== 0 ? `$${row.discount.toLocaleString()}` : ''}
                            </span>
                        </div>
                        <div className={`py-3 px-4 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                            <span className={`text-xs lg:text-sm font-medium ${row.isTotal ? 'text-gray-800' : 'text-gray-900'}`}>
                                ${row.value.toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile View - Updated */}
            <div className="md:hidden">
                {priceRows.map((row, index) => (
                    <div key={index} className={`p-4 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                        {/* Product Details Section */}
                        <div className="flex items-center gap-2 mb-3">
                            {row.productIcon && !row.isTotal && (
                                <img src={row.productIcon} alt="" className="w-5 h-5 flex-shrink-0" />
                            )}
                            <div className="flex flex-col min-w-0">
                                <span className={`text-sm truncate w-full ${row.isTotal ? 'text-gray-800 font-semibold' : 'text-gray-600'}`}>
                                    {row.productDetail}
                                </span>
                                {row.productSubtitle && !row.isTotal && (
                                    <span className="text-xs text-gray-400">
                                        {row.productSubtitle}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                            {[
                                {
                                    label: 'RATE',
                                    value: metalRates[row.productDetail]
                                        ? `$${metalRates[row.productDetail].rate}/${metalRates[row.productDetail].unit}`
                                        : row.isTotal ? '-' : '-'
                                },
                                {
                                    label: 'WEIGHT',
                                    value: row.weight
                                        ? (row.weight.carat
                                            ? `${row.weight.carat}ct/${row.weight.gram}g`
                                            : row.weight.gram > 0
                                                ? `${row.weight.gram}g`
                                                : '-')
                                        : '-'
                                },
                                {
                                    label: 'DISCOUNT',
                                    value: row.discount !== 0 ? `$${row.discount.toLocaleString()}` : '-',
                                    isDiscount: true
                                },
                                {
                                    label: 'VALUE',
                                    value: `$${row.value.toLocaleString()}`,
                                    isValue: true
                                }
                            ].map((item) => (
                                <div key={item.label} className="flex flex-col">
                                    <span className="text-xs text-gray-400 mb-1">
                                        {item.label}
                                    </span>
                                    <span className={`text-sm ${item.isDiscount
                                            ? 'text-green-500 font-medium'
                                            : item.isValue
                                                ? 'text-gray-900 font-medium'
                                                : 'text-gray-600'
                                        }`}>
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}