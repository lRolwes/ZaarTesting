
import Image from 'next/image';
import Link from 'next/link';
import React from "react";
import { ConnectWallet } from './ConnectWallet';

export const Header = () => {
    return (
    
        <div className="flex justify-between items-center p-4 px-8 pl-2 border-dark-gray">
        {/* Logo and Navigation */}
        <div className="flex items-center justify-between md:space-x-4 text-sm">
            
            {/* Hamburger Icon */}
            <button id="menu-btn" className="p-2 ml-4 focus:outline-none md:hidden text-light-green border border-dark-gray-all hover:border-light-green-all rounded-sm transition-colors duration-150">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
            {/* Logo */}
            <Link href="index.html">
                <Image 
                src="/images/logo-3d.png" 
                alt="logo" 
                className="rounded-sm h-8 ml-4 md:ml-0"
                width={30}
                height={30}
                />
            </Link>
        </div>

      
        {/* Connect Button */}
        <div className="ml-auto">
            <div className="flex items-center text-gray -mr-5">
                <div className="group relative  z-20 flex flex-row">
                    <ConnectWallet/>
                </div>
            </div>
        </div>
        </div>
    );
}