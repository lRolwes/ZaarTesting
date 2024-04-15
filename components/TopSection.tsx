
import Image from 'next/image';
import React from "react";
import useBalance from "../hooks/Balance";
import { formatEther } from 'viem';

export const TopSection = () => {
    const { prtcBalance, zaarBalance, xPrtcBalance } = useBalance();

    return(
        <div className="w-full z-50 h-[250px] md:h-[240px] mt-[50px]">
            {/* top section */}
            <div className="bg-dark-gray h-full w-full bg-gradient-to-b from-yellow/15 to-transparent border-dark-gray ">
            <div className="container-fluid mx-auto flex flex-col sm:flex-row justify-center items-center ml-4 sm:ml-0 pl-0 sm:pl-4 py-6 pt-4 pb-0">
                {/* User Info Section */}
                <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-0 p-2 ">
    
                {/* Left-Side Stats for Mobile */}
                <div className="flex flex-col justify-center items-center ml-0 sm:m-0">
                    <div className="text-sm font-bold text-gray uppercase mr-6 mb-2">Your Wallet Balance</div> {/* Title added here */}
                    <div className="flex flex-col text-xs items-center justify-center">
                        <div className="flex flex-row items-center justify-center w-1/3 max-w-20 sm:w-auto mb-2 sm:mb-0 mr-4 sm:mr-6 space-x-1">
                            <div className="bg-dark-gray border border-dark-gray-all text-yellow font-bold text-2xl px-3 py-1 rounded">{xPrtcBalance? Number(formatEther(xPrtcBalance)).toFixed(0) : '0'}</div>
                            <div className="text-light-green mt-2 text-sm uppercase flex  flex-row ml-1">
                                <Image 
                                src="/images/xprtc-token-icon.png" 
                                alt="logo" 
                                className="rounded-sm h-5 w-5 inline-block mr-1 md:ml-0"
                                width={20}
                                height={100}/>
                                <div>
                                    <span className="lowercase">x</span>
                                    PRTC
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-center w-1/3 max-w-20 sm:w-auto mb-2 sm:mb-0 mr-4 sm:mr-6 space-x-1 mt-2">
                            <div className="bg-dark-gray border border-dark-gray-all text-yellow font-bold text-2xl px-3 py-1 rounded">{prtcBalance? Number(formatEther(prtcBalance)).toFixed(0) : '0'}</div>
                            <div className="text-light-green mt-2 text-sm uppercase flex flex-row ml-1">
                                <Image 
                                src="/images/prtc-token-icon.png" 
                                alt="logo" 
                                className="rounded-sm h-5 w-5 inline-block mr-1 md:ml-0"
                                width={30}
                                height={100}
                                /> 
                                <div>PRTC</div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-center w-1/3 max-w-20 sm:w-auto mb-2 sm:mb-0 mr-0 sm:mr-6 space-x-1 mt-2">
                            <div className="bg-dark-gray border border-dark-gray-all text-yellow font-bold text-2xl px-3 py-1 rounded">{zaarBalance ? Number(formatEther(zaarBalance)).toFixed(0) : '0'}</div>
                            <div className="text-light-green mt-2 text-sm uppercase flex flex-row ml-1">
                                <Image 
                                src="/images/zaar-token-icon.png" 
                                alt="logo" 
                                className="rounded-sm h-5 w-5 inline-block mr-1 md:ml-0"
                                width={100}
                                height={100}
                                />
                                <div>Zaar</div>
                            </div>
                        </div>
                        <div className={`text-center justify-between w-full  sm:w-auto mb-2 sm:mb-0 mr-0 sm:mr-6 mt-2 text-white ${xPrtcBalance ? (xPrtcBalance>0 ? " ":"hidden") : "hidden"}`}>
                            In order to migrate your xPRTC you must first unstake it. 
                        </div>
                    </div>
                    </div>       
                </div>
            </div>
            </div>
        </div>
    );
}
