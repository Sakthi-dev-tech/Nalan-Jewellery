import Link from 'next/link';
import Image from 'next/image';
import { NunitoSans } from '@/public/fonts/fonts';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInSignUpLogic } from '../functions/SignUpSignInLogic';
import { supabase } from '@/libs/supabase-client';
import { AuthModal } from './AuthModal';

export default function Navbar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);

  const iconClass = () => 'flex flex-col items-center select-none text-[#34758f] hover:scale-110 transition-all hover:text-[#116c96]';


  useEffect(() => {
    // Check initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event, 'Session:', session);
      setIsLoggedIn(!!session);

      if (!!session) {
        // if logged in, close all auth modals
        setShowAgentModal(false);
        setShowSignInModal(false);
        setShowSignUpModal(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Authentication Modal
  

  return (
    <nav className="fixed top-0 w-full h-[8vh] bg-gradient-to-r from-[#A2DCF3] from-40% to-[#a5a9aa] to-100% select-none z-50">
      <div className="container mx-auto flex h-full items-center">
        <Link href="/">
          <Image
            src="/images/Logo.svg"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>

        <div className="flex w-full items-center justify-between ml-20">
          {/* Input with search icon */}
          <div className="relative w-[30vw]">
            <input
              type="text"
              className="w-full h-12 rounded-[2vw] pl-2 pr-10 focus:outline-none bg-white" // Add right padding
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
      </div>

      <AnimatePresence mode="wait">
        {showSignUpModal && (
          <AuthModal key="signup" isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)} type="signup" setShowSignInModal={setShowSignInModal} setShowSignUpModal={setShowSignUpModal} />
        )}
        {showSignInModal && (
          <AuthModal key="signin" isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} type="signin" setShowSignInModal={setShowSignInModal} setShowSignUpModal={setShowSignUpModal}/>
        )}
        {showAgentModal && (
          <AuthModal key="agent" isOpen={showAgentModal} onClose={() => setShowAgentModal(false)} type="agent" setShowSignInModal={setShowSignInModal} setShowSignUpModal={setShowSignUpModal}/>
        )}
      </AnimatePresence>

    </nav>
  );
}