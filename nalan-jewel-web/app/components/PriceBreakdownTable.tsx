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
                        <div key={header} className="py-4 px-2 border-b border-gray-200">
                            <span className="text-sm font-bold text-gray-500">
                                {header}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Desktop Table Rows */}
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
                                    : row.isTotal ? '' : '-'
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
                            <span className={`text-sm text-green-500 whitespace-nowrap`}>
                                {row.discount !== 0 ? `$\u00A0${row.discount.toLocaleString()}` : ''}
                            </span>
                        </div>
                        <div className={`py-4 px-2 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                            <span className={`text-sm font-medium whitespace-nowrap ${row.isTotal ? 'text-gray-800' : 'text-gray-900'}`}>
                                {`$\u00A0${row.value.toLocaleString()}`}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
                {priceRows.map((row, index) => (
                    <div key={index} className={`p-4 border-b border-gray-200 ${row.isTotal ? 'bg-gray-100 font-semibold' : ''}`}>
                        {/* Product Details Row */}
                        <div className="flex items-center gap-2 mb-3">
                            {row.productIcon && !row.isTotal && (
                                <img
                                    src={row.productIcon}
                                    alt=""
                                    className="w-5 h-5"
                                />
                            )}
                            <div className="flex flex-col">
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

                        {/* Values Row */}
                        <div className="grid grid-cols-4 gap-4 sm:gap-2">
                            <div className="flex flex-col min-h-[48px]">
                                <div className="flex-1 px-0.5">
                                    <span className={`text-sm ${row.isTotal ? 'text-gray-800' : 'text-gray-600'}`}>
                                        {metalRates[row.productDetail]
                                            ? `$ ${metalRates[row.productDetail].rate} / ${metalRates[row.productDetail].unit}`
                                            : row.isTotal ? '' : '-'
                                        }
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400 px-0.5">RATE</div>
                            </div>
                            <div className="flex flex-col min-h-[48px]">
                                <div className="flex-1 px-0.5">
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
                                <div className="text-xs text-gray-400 px-0.5">WEIGHT</div>
                            </div>
                            <div className="flex flex-col min-h-[48px]">
                                <div className="flex-1 px-0.5">
                                    <span className="text-sm text-green-500 whitespace-nowrap">
                                        {row.discount !== 0 ? `$\u00A0${row.discount.toLocaleString()}` : ''}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400 px-0.5">DISCOUNT</div>
                            </div>
                            <div className="flex flex-col min-h-[48px]">
                                <div className="flex-1 px-0.5">
                                    <span className={`text-sm font-medium whitespace-nowrap ${row.isTotal ? 'text-gray-800' : 'text-gray-900'}`}>
                                        {`$\u00A0${row.value.toLocaleString()}`}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400 px-0.5">VALUE</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}