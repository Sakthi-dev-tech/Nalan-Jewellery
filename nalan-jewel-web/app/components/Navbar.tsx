import Link from 'next/link';
import Image from 'next/image';
import { NunitoSans } from '@/public/fonts/fonts';

export default function Navbar() {

  const iconClass = () => 'flex flex-col items-center select-none';

  return (
    <nav className="w-full h-[8vh] bg-gradient-to-r from-[#A2DCF3] from-70% to-[#818E94] to-100% select-none">
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
                <i className="material-icons text-black">favorite</i>
                <text style={NunitoSans.style}>Wishlist</text>
              </div>
            </Link>

            <Link href="/cart">
              <div className={iconClass()}>
                <i className="material-icons text-black">shopping_cart</i>
                <text style={NunitoSans.style}>Cart</text>
              </div>
            </Link>

            <div className={iconClass()}>
              <i className="material-icons text-black">person</i>
              <text style={NunitoSans.style}>Account</text>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}