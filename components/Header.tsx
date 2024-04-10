
import Image from 'next/image';
import Link from 'next/link';
import React from "react";
import { ConnectWallet } from './ConnectWallet';

export const Header = () => {
    return (
    
        <div className="flex justify-between items-center p-4 px-8 pl-2 border-dark-gray">
        {/* Logo and Navigation */}
        <div className="flex items-center justify-between md:space-x-4 text-sm">
            
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