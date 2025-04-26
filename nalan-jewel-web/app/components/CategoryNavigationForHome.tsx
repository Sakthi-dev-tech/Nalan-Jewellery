'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jewelleryCatergories, Category } from '../interfaces/TypeOfJewelleryCollectionForHomepage';
import Link from 'next/link';

export default function CategoryNavigation() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  return (
    <div className="relative w-[60%] hidden md:block h-[8vh] flex-row justify-center items-center bg-white shadow-md rounded-lg m-4">
      {/* Parent Categories */}
      <div className="flex w-[100%] h-[100%] justify-center items-center gap-4 md:gap-5 lg:gap-6">
        {jewelleryCatergories.map((category) => (
          <div
            key={category.id.toString()}
            className="relative"
            onMouseEnter={() => setActiveCategory(category)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <span className="text-xs md:text-sm lg:text-base font-medium cursor-pointer text-gray-700 hover:text-blue-600 transition-colors">
              {category.name.toString().toUpperCase()}
            </span>
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 left-1/2 h-[1px] md:h-[1.5px] lg:h-0.5 bg-blue-600"
              initial={{ width: 0 }}
              animate={{
                width: activeCategory?.id === category.id ? '100%' : 0,
                left: activeCategory?.id === category.id ? 0 : '50%',
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      {/* Subcategories Dropdown */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg z-50 p-4 md:p-5 lg:p-6"
            onMouseEnter={() => setActiveCategory(activeCategory)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {Object.entries(activeCategory.subCategories).map(([section, items]) => (
                <div key={section} className="space-y-2 md:space-y-3 lg:space-y-4">
                  <h3 className="text-xs md:text-sm lg:text-base font-semibold text-gray-800">
                    {section.toUpperCase()}
                  </h3>
                  <div className="space-y-1 md:space-y-1.5 lg:space-y-2">
                    {items.map((item) => (
                      <Link
                        href={item.path.toString()}
                        key={item.id.toString()}
                        className="block text-[10px] md:text-xs lg:text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {item.name.toString().toUpperCase()}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}