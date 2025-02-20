import Link from 'next/link';
import Image from 'next/image';
import { NunitoSans } from '@/public/fonts/fonts';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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

  const AuthModal = ({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void; type: 'signup' | 'signin' | 'agent' }) => {
    if (!isOpen) return null;

    const [modalEmail, setModalEmail] = useState('');
    const [modalPassword, setModalPassword] = useState('');

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl p-6 w-[400px] relative"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <i className="material-icons">close</i>
          </button>

          <h2 className="text-2xl font-semibold mb-6">
            {type === 'signup' ? 'Create Account' : type === 'signin' ? 'Welcome Back' : 'Agent Sign In'}
          </h2>

          {type !== 'agent' && (
            <>
              <button className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <img src='/images/google.svg' className="w-5 h-5" />
                <span>Continue with Google</span>
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>
            </>
          )}

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                value={modalEmail}
                onChange={(e) => setModalEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34758f] bg-white"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={modalPassword}
                onChange={(e) => setModalPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34758f] bg-white"
                placeholder="Enter your password"
              />
            </div>

            {type === 'signin' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`remember-${type}`}
                    className="accent-[#34758f] w-4 h-4 rounded border-gray-300 bg-white"
                  />
                  <label htmlFor={`remember-${type}`} className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <button type="button" className="text-sm text-[#34758f] hover:text-[#116c96]">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#34758f] text-white rounded-lg hover:bg-[#116c96] transition-colors"
            >
              {type === 'signup' ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          {type === 'signup' && (
            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => {
                  onClose();
                  setShowSignInModal(true);
                }}
                className="text-[#34758f] hover:text-[#116c96]"
              >
                Sign in
              </button>
            </p>
          )}

          {type === 'signin' && (
            <p className="mt-4 text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  onClose();
                  setShowSignUpModal(true);
                }}
                className="text-[#34758f] hover:text-[#116c96]"
              >
                Sign up
              </button>
            </p>
          )}
        </motion.div>
      </div>
    );
  };

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
                            onClick={() => setIsLoggedIn(false)}
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
          <AuthModal key="signup" isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)} type="signup" />
        )}
        {showSignInModal && (
          <AuthModal key="signin" isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} type="signin" />
        )}
        {showAgentModal && (
          <AuthModal key="agent" isOpen={showAgentModal} onClose={() => setShowAgentModal(false)} type="agent" />
        )}
      </AnimatePresence>

    </nav>
  );
}