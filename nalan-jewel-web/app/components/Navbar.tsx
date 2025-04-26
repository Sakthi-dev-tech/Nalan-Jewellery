import Link from 'next/link';
import Image from 'next/image';
import { NunitoSans } from '@/public/fonts/fonts';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SignInSignUpLogic } from '../functions/SignUpSignInLogic';
import { supabase } from '@/libs/supabase-client';
import { AuthModal } from './AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { jewelleryCatergories, Category } from '../interfaces/TypeOfJewelleryCollectionForHomepage';

export default function Navbar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<Category | null>(null);
  const { isLoggedIn, user } = useAuth();

  // First add this after your existing useState declarations
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  // Add these functions before the return statement
  const handleMouseEnter = () => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100); // 300ms delay before closing
    setDropdownTimeout(timeout);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveMobileCategory(null);
  };

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);

  const iconClass = () => 'flex flex-col items-center select-none text-[#34758f] hover:scale-110 transition-all hover:text-[#116c96]';


  useEffect(() => {
    // Check if the user is logged in when the component mounts
    if (!!isLoggedIn) {
      setShowAgentModal(false);
      setShowSignInModal(false);
      setShowSignUpModal(false);
    }

  }, [isLoggedIn]);

  return (
    <nav className="fixed top-0 w-full h-[8vh] bg-gradient-to-r from-[#A2DCF3] from-40% to-[#a5a9aa] to-100% select-none z-50">
      <div className="container mx-auto flex h-full items-center">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/Logo.svg"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className="material-icons">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </i>
        </button>

        <div className="hidden md:flex w-full items-center justify-between ml-20">
          {/* Input with search icon */}
          <div className="relative w-[30vw]">
            <input
              type="text"
              className="w-full h-12 rounded-[2vw] pl-2 pr-10 focus:outline-none bg-white"
              placeholder="Search for your favourite jewellery..."
            />
            {/* Search icon */}
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <i className="material-icons text-gray-500">search</i>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className='flex items-center gap-10'>
            <Link href="/wishlist">
              <div className={iconClass()}>
                <i className="material-icons">favorite</i>
                <text style={NunitoSans.style}>Wishlist</text>
              </div>
            </Link>

            <Link href="/cart">
              <div className={iconClass()}>
                <i className="material-icons">shopping_cart</i>
                <text style={NunitoSans.style}>Cart</text>
              </div>
            </Link>

            <div className="relative">
              <div
                className={iconClass()}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <i className="material-icons">person</i>
                <text style={NunitoSans.style}>Account</text>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-3 z-50"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {!isLoggedIn ? (
                      <>
                        <div className="px-4 pb-3 mb-2 border-b border-gray-100">

                          <button
                            className="w-full mb-2 px-4 py-2 border-2 border-[#34758f] text-[#34758f] rounded-full hover:bg-gray-50 transition-colors"
                            onClick={() => {
                              setIsDropdownOpen(false);
                              setShowSignUpModal(true);
                            }}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <i className="material-icons text-sm">person_add</i>
                              <span className="text-sm font-medium">Sign Up</span>
                            </div>
                          </button>


                          <button
                            className="w-full px-4 py-2 bg-[#34758f] text-white rounded-full hover:bg-[#116c96] transition-colors"
                            onClick={() => {
                              setIsDropdownOpen(false);
                              setShowSignInModal(true);
                            }}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <i className="material-icons text-sm">login</i>
                              <span className="text-sm font-medium">Sign In</span>
                            </div>
                          </button>

                        </div>
                        <div className="px-4">
                          <button
                            className="w-full text-left text-sm text-gray-600 hover:text-[#34758f] flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 transition-colors rounded-md"
                            onClick={() => {
                              setIsDropdownOpen(false);
                              setShowAgentModal(true);
                            }}
                          >
                            <i className="material-icons text-sm">badge</i>
                            Sign in as Agent
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-4 pb-2 mb-2">
                          <Link href="/my-orders">
                            <div className="px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                              <i className="material-icons text-sm text-gray-600">shopping_bag</i>
                              <span className="text-sm text-gray-600">My Orders</span>
                            </div>
                          </Link>
                        </div>
                        <div className="px-4 pt-2 border-t border-gray-100">
                          <button
                            className="w-full text-left text-sm text-red-500 hover:text-red-600 flex items-center gap-2 px-2 py-1.5 rounded hover:bg-red-50 transition-colors"
                            onClick={() => new SignInSignUpLogic().SignOutUser()}
                          >
                            <i className="material-icons text-sm">logout</i>
                            Sign Out
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-[8vh] left-0 w-full bg-white shadow-lg md:hidden max-h-[92vh] overflow-y-auto">
            {/* Mobile Search */}
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full h-12 rounded-[2vw] pl-2 pr-10 focus:outline-none bg-gray-100"
                  placeholder="Search..."
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <i className="material-icons text-gray-500">search</i>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100">
              {jewelleryCatergories.map((category) => (
                <div key={category.id.toString()} className="border-b border-gray-100">
                  <button
                    className="w-full px-4 py-3 flex items-center justify-between"
                    onClick={() => setActiveMobileCategory(activeMobileCategory?.id === category.id ? null : category)}
                  >
                    <span className="text-gray-700 font-medium">
                      {category.name.toString().toUpperCase()}
                    </span>
                    <i className="material-icons">
                      {activeMobileCategory?.id === category.id ? 'expand_less' : 'expand_more'}
                    </i>
                  </button>

                  {/* Subcategories */}
                  {activeMobileCategory?.id === category.id && (
                    <div className="bg-gray-50 px-4 py-2">
                      {Object.entries(category.subCategories).map(([section, items]) => (
                        <div key={section} className="mb-4">
                          <h3 className="text-sm font-semibold text-gray-800 mb-2 px-2">
                            {section.toUpperCase()}
                          </h3>
                          <div className="space-y-1">
                            {items.map((item) => (
                              <Link
                                href={item.path.toString()}
                                key={item.id.toString()}
                                onClick={closeMobileMenu}
                                className="block px-2 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded"
                              >
                                {item.name.toString()}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Navigation Items */}
            <div className="px-4 py-2 space-y-2 border-t border-gray-100">
              <Link href="/wishlist">
                <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg">
                  <i className="material-icons">favorite</i>
                  <span style={NunitoSans.style}>Wishlist</span>
                </div>
              </Link>

              <Link href="/cart">
                <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg">
                  <i className="material-icons">shopping_cart</i>
                  <span style={NunitoSans.style}>Cart</span>
                </div>
              </Link>

              {!isLoggedIn ? (
                <>
                  <button
                    className="w-full p-3 mb-2 border-2 border-[#34758f] text-[#34758f] rounded-lg"
                    onClick={() => setShowSignUpModal(true)}
                  >
                    <div className="flex items-center gap-2">
                      <i className="material-icons">person_add</i>
                      <span>Sign Up</span>
                    </div>
                  </button>

                  <button
                    className="w-full p-3 bg-[#34758f] text-white rounded-lg"
                    onClick={() => setShowSignInModal(true)}
                  >
                    <div className="flex items-center gap-2">
                      <i className="material-icons">login</i>
                      <span>Sign In</span>
                    </div>
                  </button>

                  <button
                    className="w-full p-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                    onClick={() => setShowAgentModal(true)}
                  >
                    <div className="flex items-center gap-2">
                      <i className="material-icons">badge</i>
                      <span>Sign in as Agent</span>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/my-orders">
                    <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg">
                      <i className="material-icons">shopping_bag</i>
                      <span>My Orders</span>
                    </div>
                  </Link>

                  <button
                    className="w-full p-3 text-red-500 hover:bg-red-50 rounded-lg"
                    onClick={() => new SignInSignUpLogic().SignOutUser()}
                  >
                    <div className="flex items-center gap-2">
                      <i className="material-icons">logout</i>
                      <span>Sign Out</span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {showSignUpModal && (
          <AuthModal key="signup" isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)} type="signup" setShowSignInModal={setShowSignInModal} setShowSignUpModal={setShowSignUpModal} />
        )}
        {showSignInModal && (
          <AuthModal key="signin" isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} type="signin" setShowSignInModal={setShowSignInModal} setShowSignUpModal={setShowSignUpModal} />
        )}
        {showAgentModal && (
          <AuthModal key="agent" isOpen={showAgentModal} onClose={() => setShowAgentModal(false)} type="agent" setShowSignInModal={setShowSignInModal} setShowSignUpModal={setShowSignUpModal} />
        )}
      </AnimatePresence>

    </nav>
  );
}