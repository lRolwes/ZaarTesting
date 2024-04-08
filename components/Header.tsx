
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import React from "react";
import { useBalance } from 'wagmi'
import { type UseAccountParameters } from 'wagmi'
import { CustomButton } from './CustomButton';

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
            <a href="index.html">
                <Image 
                src="/images/logo-3d.png" 
                alt="logo" 
                className="rounded-sm h-8 ml-4 md:ml-0"
                width={30}
                height={30}
                />
            </a>
            

            {/* Spacer div to push navigation to the edge */}
            <div className="flex-grow md:hidden"></div>
        </div>

      
        {/* Connect Button */}
        
        <div className="ml-auto">
            <div className="flex items-center text-gray -mr-5">
                {/*<button type="button" className="flex items-center justify-center rounded cursor-pointer px-2 py-3 text-sm font-medium text-gray border border-dark-gray-all h-10 hidden md:flex ml-6 gap-1 divide-x-1 divide-gray-300">
                    <div className="pl-0.5 inline-flex items-center max-w-full">
                        <div className="truncate">4.20</div>
                        <span className="ml-0.5 relative mb-[1px]">
                                <i className="fab fa-ethereum ml-0.5"></i>                           
                        </span>
                    </div>
                </button>
                  } Trigger button 
                    <button type="button" className="flex items-center justify-center rounded cursor-pointer px-2 py-2 text-sm font-medium text-gray-700 border border-gray-700 h-10 md:flex mx-3 max-w-xs gap-2">
                        <div className="flex-shrink-0 rounded relative overflow-hidden w-7 h-7 bg-gray">
                            
                        </div>
                        <div className="truncate text-yellow-400">0x1234...34C</div>
                    </button>
    */}
                <div className="group relative  z-20 flex flex-row">

                    <CustomButton/>
                </div>
            </div>
        </div>
        </div>
    );
}