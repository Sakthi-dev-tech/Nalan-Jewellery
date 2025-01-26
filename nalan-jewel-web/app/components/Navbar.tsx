import Link from 'next/link';
import Image from 'next/image';
import { NunitoSans } from '@/public/fonts/fonts';

export default function Navbar() {

  const iconClass = () => 'flex flex-col items-center select-none text-[#34758f] hover:scale-110 transition-all hover:text-[#116c96]';

  return (
    <nav className="fixed top-0 w-full h-[8vh] bg-gradient-to-r from-[#A2DCF3] from-60% to-[#a5a9aa] to-100% select-none z-50">
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
              className="w-full h-12 rounded-[2vw] pl-2 pr-10 focus:outline-none" // Add right padding
              placeholder="Search for your favourite jewelry..."
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

            <div className={iconClass()}>
              <i className="material-icons">person</i>
              <text style={NunitoSans.style}>Account</text>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}